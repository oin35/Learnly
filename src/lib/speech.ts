/**
 * Play Dutch audio.
 *
 * 1. Recorded clips (public/audio, made with Piper, see scripts/make-audio.py) are played through a normal
 *    <audio> element. That sounds natural and, unlike speech synthesis, keeps playing in iPhone silent mode.
 *    Clips live in "packs" (many clips back to back in one MP3 file); a pack is downloaded once, then each clip is
 *    sliced out of it and played from memory, so taps are instant.
 * 2. Anything without a recording, or if a pack can't be loaded, falls back to the browser's built-in speech
 *    synthesis (no network needed).
 *
 * The speech-synthesis path is written defensively for iOS/Safari, where it is fragile:
 *  - utterances are kept referenced until they finish (iOS/Chrome can drop garbage-collected ones),
 *  - the queue is only cancelled when something is actually speaking,
 *  - the engine is resumed before speaking, and the page's audio session is set to "playback"
 *    where supported (so the ring/silent switch is less likely to mute it),
 *  - a Dutch voice is chosen explicitly when one is installed,
 *  - if nothing starts within a couple of seconds we flag an issue the UI can show.
 */
import audioIndex from "../data/audio-index.json";
import { audioId } from "./audioId";

interface AudioIndex {
  packs: string[];
  /** clip id → [pack number, byte offset, byte length] */
  clips: Record<string, [number, number, number]>;
}
const index = audioIndex as unknown as AudioIndex;

export const clipCount = Object.keys(index.clips).length;
export const hasClip = (text: string): boolean => audioId(text) in index.clips;
export const clipPackName = (text: string): string | undefined => index.packs[index.clips[audioId(text)]?.[0]];

export const RATE_NORMAL = 0.85; // a little slower than native speed, for learners
export const RATE_SLOW = 0.6;

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

/** True if we can make sound at all: recorded clips or the browser's voice. */
export function canSpeak(): boolean {
  return clipCount > 0 || ttsSupported();
}

/* ── "Sound didn't start" issue flag (observable by the UI) ───────────────── */
let issue = false;
const listeners = new Set<() => void>();
function setIssue(v: boolean) {
  if (issue !== v) {
    issue = v;
    listeners.forEach((l) => l());
  }
}
export const getSpeechIssue = () => issue;
export function subscribeSpeechIssue(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}
export const dismissSpeechIssue = () => setIssue(false);

/* ── Internals ─────────────────────────────────────────────────────────────── */
const alive = new Set<SpeechSynthesisUtterance>();
let generation = 0;
let onInterrupt: (() => void) | undefined;

function pickVoice(): SpeechSynthesisVoice | undefined {
  try {
    const voices = window.speechSynthesis.getVoices();
    const norm = (v: SpeechSynthesisVoice) => v.lang.replace("_", "-").toLowerCase();
    return (
      voices.find((v) => norm(v) === "nl-nl") ?? voices.find((v) => norm(v) === "nl-be") ?? voices.find((v) => norm(v).startsWith("nl"))
    );
  } catch {
    return undefined;
  }
}

function unlockAudioSession() {
  try {
    const s = (navigator as unknown as { audioSession?: { type: string } }).audioSession;
    if (s && s.type !== "playback") s.type = "playback";
  } catch {
    /* not supported */
  }
}

function makeUtterance(text: string, rate: number): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "nl-NL";
  u.rate = rate;
  const voice = pickVoice();
  if (voice) {
    u.voice = voice;
    u.lang = voice.lang.replace("_", "-");
  }
  return u;
}

// Some browsers only fill the voice list asynchronously: ask for it early.
if (ttsSupported()) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", () => void pickVoice());
  } catch {
    /* ignore */
  }
}

export interface QueueOptions {
  rate?: number;
  /** Called when utterance `i` starts */
  onStart?: (i: number) => void;
  /** Called after the last utterance finished */
  onEnd?: () => void;
  /** Called if this queue is cut short by another one or by stopSpeaking() */
  onInterrupt?: () => void;
  /** Called if speech could not start */
  onError?: () => void;
}

/* ── Audio packs: download once, slice clips out of memory ─────────────────── */
const packData = new Map<number, ArrayBuffer>();
const packLoading = new Map<number, Promise<boolean>>();
const clipUrls = new Map<string, string>(); // clip id → blob: URL

function loadPack(n: number): Promise<boolean> {
  if (packData.has(n)) return Promise.resolve(true);
  let p = packLoading.get(n);
  if (!p) {
    p = fetch(`audio/${index.packs[n]}`)
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
      .then((buf) => {
        packData.set(n, buf);
        return true;
      })
      .catch(() => false)
      .finally(() => packLoading.delete(n));
    packLoading.set(n, p);
  }
  return p;
}

/** The blob: URL of a clip, if its pack has been downloaded. */
function clipBlobUrl(id: string): string | undefined {
  const cached = clipUrls.get(id);
  if (cached) return cached;
  const entry = index.clips[id];
  const buf = entry && packData.get(entry[0]);
  if (!buf) return undefined;
  const url = URL.createObjectURL(new Blob([buf.slice(entry[1], entry[1] + entry[2])], { type: "audio/mpeg" }));
  clipUrls.set(id, url);
  return url;
}

const packsFor = (texts: string[]): number[] => [...new Set(texts.filter(hasClip).map((t) => index.clips[audioId(t)][0]))];

/** Start downloading the packs that contain these texts, so taps play instantly. */
export function warmClips(texts: string[]): void {
  if (typeof fetch === "undefined") return;
  packsFor(texts).forEach((n) => void loadPack(n));
}

/** Download what a clip needs and return its blob: URL (used by the Sound check). */
export async function ensureClip(text: string): Promise<string | undefined> {
  const entry = index.clips[audioId(text)];
  if (!entry || !(await loadPack(entry[0]))) return undefined;
  return clipBlobUrl(audioId(text));
}

/* ── Recorded clips ────────────────────────────────────────────────────────── */
let mode: "audio" | "tts" | null = null;
let audioEl: HTMLAudioElement | null = null;
const SILENT = "data:audio/mpeg;base64,//MgxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVf/zIsQnAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVV//MgxE8AAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVf/zIMR2AAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVX/8yDEnQAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MixMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/8yDE2AAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MgxNgAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zIMTYAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/8yLE1wAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";

/** One shared element, reused for every clip: once iOS has unlocked it with a tap, later clips can chain on their own. */
function getAudio(): HTMLAudioElement {
  if (!audioEl) {
    audioEl = new Audio();
    audioEl.preload = "auto";
    audioEl.setAttribute("playsinline", "");
  }
  return audioEl;
}

/** Silence the shared player. With `full`, also drop its source (frees the connection). */
function detachAudio(full = true) {
  if (!audioEl) return;
  audioEl.onplaying = audioEl.onended = audioEl.onerror = null;
  try {
    audioEl.pause();
    if (full) {
      audioEl.removeAttribute("src");
      audioEl.load();
    }
  } catch {
    /* ignore */
  }
}

function playClips(texts: string[], opts: QueueOptions, gen: number): void {
  const a = getAudio();
  mode = "audio";
  onInterrupt = opts.onInterrupt;
  const ids = texts.map(audioId);
  const playbackRate = (opts.rate ?? RATE_NORMAL) / RATE_NORMAL; // slow mode: ~0.7x
  let i = 0;
  let started = false;
  const played = (globalThis as { __played?: string[] }).__played; // test hook: which clips were played

  // If a clip cannot be played (blocked, missing, undecodable), say the rest with the browser's voice.
  const fallback = () => {
    if (gen !== generation) return;
    detachAudio();
    mode = null;
    if (!ttsSupported()) {
      setIssue(true);
      onInterrupt = undefined;
      opts.onError?.();
      return;
    }
    const from = i;
    speakTts(texts.slice(from), { ...opts, onStart: (j) => opts.onStart?.(from + j) }, gen);
  };

  const load = () => {
    const url = clipBlobUrl(ids[i]);
    if (!url) return fallback();
    played?.push(ids[i]);
    a.src = url;
    a.defaultPlaybackRate = playbackRate;
    a.playbackRate = playbackRate;
    a.play()?.catch(fallback);
  };

  const begin = () => {
    a.onplaying = () => {
      if (gen !== generation) return;
      started = true;
      setIssue(false);
      opts.onStart?.(i);
    };
    a.onended = () => {
      if (gen !== generation) return;
      i++;
      if (i < ids.length) {
        load();
      } else {
        onInterrupt = undefined;
        mode = null;
        opts.onEnd?.();
      }
    };
    a.onerror = fallback;
    window.setTimeout(() => {
      if (gen === generation && mode === "audio" && !started) fallback();
    }, 4000);
    load();
  };

  const needed = packsFor(texts);
  if (needed.every((n) => packData.has(n))) {
    begin();
    return;
  }
  // A pack is still downloading. Hold the audio element with a silent blip while we wait, inside the tap,
  // so iOS keeps allowing playback when the download finishes.
  a.src = SILENT;
  a.play()?.catch(() => undefined);
  const timeout = new Promise<boolean[]>((res) => window.setTimeout(() => res([false]), 8000));
  void Promise.race([Promise.all(needed.map(loadPack)), timeout]).then((oks) => {
    if (gen !== generation) return;
    if (oks.every(Boolean)) begin();
    else fallback();
  });
}

/** Speak several texts one after another. Must be called from a user gesture (click/tap) on iOS. */
export function speakQueue(texts: string[], opts: QueueOptions = {}): void {
  const interrupted = onInterrupt;
  onInterrupt = undefined;
  interrupted?.();
  const gen = ++generation;
  detachAudio(false); // a new source replaces the old one: no need to reset the element (saves time)
  mode = null;

  if (texts.length === 0) {
    opts.onError?.();
    return;
  }
  unlockAudioSession();
  if (texts.every(hasClip)) {
    playClips(texts, opts, gen);
  } else {
    speakTts(texts, opts, gen);
  }
}

/** Browser speech synthesis. Everything is queued up front, inside the tap, which iOS needs. */
function speakTts(texts: string[], opts: QueueOptions, gen: number): void {
  if (!ttsSupported()) {
    setIssue(true);
    opts.onError?.();
    return;
  }
  const synth = window.speechSynthesis;
  mode = "tts";
  try {
    if (synth.speaking || synth.pending) synth.cancel();
    synth.resume?.();
    let started = false;
    const rate = opts.rate ?? RATE_NORMAL;
    texts.forEach((text, i) => {
      const u = makeUtterance(text, rate);
      let t0 = 0;
      alive.add(u);
      u.onstart = () => {
        if (gen !== generation) return;
        t0 = performance.now();
        started = true;
        setIssue(false);
        opts.onStart?.(i);
      };
      u.onend = () => {
        alive.delete(u);
        // A real word takes a while to say. Finishing almost instantly means nothing was played.
        if (gen === generation && t0 && text.length >= 4 && performance.now() - t0 < 60) setIssue(true);
        if (gen === generation && i === texts.length - 1) {
          onInterrupt = undefined;
          mode = null;
          opts.onEnd?.();
        }
      };
      u.onerror = (e) => {
        alive.delete(u);
        if (gen !== generation) return;
        const code = (e as SpeechSynthesisErrorEvent).error;
        if (code === "canceled" || code === "interrupted") return;
        setIssue(true);
        opts.onError?.();
      };
      synth.speak(u);
    });
    onInterrupt = opts.onInterrupt;
    // iOS can report speaking=true without ever starting, so only the start event counts.
    window.setTimeout(() => {
      if (gen === generation && !started) {
        setIssue(true);
        opts.onError?.();
      }
    }, 3000);
  } catch {
    setIssue(true);
    opts.onError?.();
  }
}

export function speak(text: string, rate: number = RATE_NORMAL): void {
  speakQueue([text], { rate });
}

/** Speak several texts one after another (cancels anything already playing). */
export function speakAll(texts: string[], rate: number = RATE_NORMAL): void {
  speakQueue(texts, { rate });
}

export function stopSpeaking(): void {
  generation++;
  const interrupted = onInterrupt;
  onInterrupt = undefined;
  interrupted?.();
  detachAudio();
  mode = null;
  try {
    if (ttsSupported()) window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
  alive.clear();
}

export function pauseSpeaking(): void {
  try {
    if (mode === "audio") audioEl?.pause();
    else window.speechSynthesis.pause();
  } catch {
    /* ignore */
  }
}

export function resumeSpeaking(): void {
  try {
    if (mode === "audio") void audioEl?.play()?.catch(() => undefined);
    else window.speechSynthesis.resume();
  } catch {
    /* ignore */
  }
}
