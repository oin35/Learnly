/**
 * Read Dutch aloud with the browser's built-in speech synthesis (no network needed).
 *
 * Written defensively for iOS/Safari, where speech synthesis is fragile:
 *  - utterances are kept referenced until they finish (iOS/Chrome can drop garbage-collected ones),
 *  - the queue is only cancelled when something is actually speaking,
 *  - the engine is resumed before speaking, and the page's audio session is set to "playback"
 *    where supported (so the ring/silent switch is less likely to mute it),
 *  - a Dutch voice is chosen explicitly when one is installed,
 *  - if nothing starts within a couple of seconds we flag an issue the UI can show.
 */

export const RATE_NORMAL = 0.85; // a little slower than native speed, for learners
export const RATE_SLOW = 0.6;

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
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
if (canSpeak()) {
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

/** Speak several texts one after another. Must be called from a user gesture (click/tap) on iOS. */
export function speakQueue(texts: string[], opts: QueueOptions = {}): void {
  const interrupted = onInterrupt;
  onInterrupt = undefined;
  interrupted?.();

  if (!canSpeak() || texts.length === 0) {
    if (!canSpeak()) setIssue(true);
    opts.onError?.();
    return;
  }
  const synth = window.speechSynthesis;
  const gen = ++generation;
  try {
    unlockAudioSession();
    if (synth.speaking || synth.pending) synth.cancel();
    synth.resume?.();
    let started = false;
    const rate = opts.rate ?? RATE_NORMAL;
    texts.forEach((text, i) => {
      const u = makeUtterance(text, rate);
      alive.add(u);
      u.onstart = () => {
        if (gen !== generation) return;
        started = true;
        setIssue(false);
        opts.onStart?.(i);
      };
      u.onend = () => {
        alive.delete(u);
        if (gen === generation && i === texts.length - 1) {
          onInterrupt = undefined;
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
    window.setTimeout(() => {
      if (gen === generation && !started && !synth.speaking) {
        setIssue(true);
        opts.onError?.();
      }
    }, 2500);
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
  try {
    if (canSpeak()) window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
  alive.clear();
}

export function pauseSpeaking(): void {
  try {
    window.speechSynthesis.pause();
  } catch {
    /* ignore */
  }
}

export function resumeSpeaking(): void {
  try {
    window.speechSynthesis.resume();
  } catch {
    /* ignore */
  }
}
