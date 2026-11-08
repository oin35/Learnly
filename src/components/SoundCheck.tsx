import { useMemo, useRef, useState } from "react";
import { clipCount, clipPackName, ensureClip, hasClip, speakQueue } from "../lib/speech";

const TEST_NL = "Hallo, dit is een test.";
const TEST_EN = "Hello, this is a test.";

/** A short sine beep as a WAV data URI (plain <audio>, independent of speech synthesis). */
function beepUri(): string {
  const rate = 22050;
  const n = Math.floor(rate * 0.6);
  const buf = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buf);
  const str = (o: number, t: string) => [...t].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF");
  v.setUint32(4, 36 + n * 2, true);
  str(8, "WAVEfmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, "data");
  v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) {
    const fade = Math.min(1, i / 800, (n - i) / 800);
    v.setInt16(44 + i * 2, Math.round(Math.sin((2 * Math.PI * 660 * i) / rate) * 0.5 * fade * 32767), true);
  }
  let bin = "";
  new Uint8Array(buf).forEach((b) => (bin += String.fromCharCode(b)));
  return "data:audio/wav;base64," + btoa(bin);
}

function dutchVoices(): SpeechSynthesisVoice[] {
  try {
    return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith("nl"));
  } catch {
    return [];
  }
}

function inFrame(): string {
  try {
    return window.self !== window.top ? "yes" : "no";
  } catch {
    return "yes";
  }
}

/** Step-by-step sound diagnostics that print what the browser reports, for debugging devices where audio fails. */
export function SoundCheck() {
  const [log, setLog] = useState<string[]>([]);
  const t00 = useRef(performance.now());
  const keep = useRef<SpeechSynthesisUtterance[]>([]);
  const clipEl = useRef<HTMLAudioElement | null>(null);
  const add = (line: string) => setLog((l) => [...l, `${((performance.now() - t00.current) / 1000).toFixed(1)}s  ${line}`]);

  const supported = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  const info = useMemo(() => {
    const as = (navigator as unknown as { audioSession?: { type: string } }).audioSession;
    return [
      `Recorded clips shipped: ${clipCount}`,
      `Speech synthesis (fallback): ${supported ? "available" : "NOT available"}`,
      `Dutch voices reported: ${supported ? dutchVoices().map((v) => `${v.name} (${v.lang})`).join(", ") || "none" : "n/a"}`,
      `All voices reported: ${supported ? window.speechSynthesis.getVoices().length : "n/a"}`,
      `Inside a frame: ${inFrame()}`,
      `Audio session: ${as ? as.type : "not supported"}`,
      `Browser: ${navigator.userAgent}`,
    ];
  }, [supported]);

  const beep = () => {
    add("Beep: starting");
    const a = new Audio(beepUri());
    a.onplaying = () => add("Beep: playing (you should hear a short tone)");
    a.onended = () => add("Beep: finished");
    a.onerror = () => add(`Beep: error (code ${a.error?.code ?? "?"})`);
    a.play().then(
      () => add("Beep: play() accepted"),
      (e: unknown) => add(`Beep: play() rejected (${e instanceof Error ? e.name : String(e)})`),
    );
  };

  const speech = (label: string, text: string, opts: { lang?: string; voice?: SpeechSynthesisVoice } = {}) => {
    if (!supported) return add(`${label}: speech synthesis not available`);
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    if (opts.lang) u.lang = opts.lang;
    if (opts.voice) u.voice = opts.voice;
    keep.current.push(u);
    const t0 = performance.now();
    let started = false;
    u.onstart = () => {
      started = true;
      add(`${label}: started`);
    };
    u.onboundary = () => add(`${label}: speaking progress event`);
    u.onend = () => add(`${label}: ended after ${Math.round(performance.now() - t0)} ms`);
    u.onerror = (e) => add(`${label}: error "${(e as SpeechSynthesisErrorEvent).error}"`);
    synth.speak(u);
    add(`${label}: speak() called`);
    window.setTimeout(() => add(`${label}: speaking=${synth.speaking} pending=${synth.pending} paused=${synth.paused}`), 400);
    window.setTimeout(() => !started && add(`${label}: no start event after 4 s`), 4000);
  };

  const clip = async () => {
    clipEl.current?.pause(); // never play two on top of each other
    add(`Clip: downloading ${clipPackName("de wortel") ?? "?"}`);
    const url = await ensureClip("de wortel");
    if (!url) return add("Clip: the audio pack could not be downloaded");
    add("Clip: pack loaded, clip cut out");
    const a = new Audio(url);
    clipEl.current = a;
    a.onloadeddata = () => add(`Clip: loaded (${a.duration.toFixed(2)} s)`);
    a.onplaying = () => add("Clip: playing (you should hear “de wortel”)");
    a.onended = () => add("Clip: finished");
    a.onerror = () => add(`Clip: error (code ${a.error?.code ?? "?"} ${a.error?.message ?? ""})`);
    a.play().then(
      () => add("Clip: play() accepted"),
      (e: unknown) => add(`Clip: play() rejected (${e instanceof Error ? e.name : String(e)})`),
    );
  };

  const appWay = () => {
    add(`App: speak() called, using ${hasClip(TEST_NL) ? "the recorded clip" : "the phone voice"}`);
    speakQueue([TEST_NL], {
      onStart: () => add("App: started"),
      onEnd: () => add("App: ended"),
      onError: () => add("App: could not start"),
    });
  };

  const nl = dutchVoices()[0];

  return (
    <div className="sc">
      <h2 className="pill-title">Sound check</h2>
      <p className="muted">Tap each button and listen. Then send me a screenshot of this panel, and say which ones you heard.</p>
      <ul className="sc-info">
        {info.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <div className="sc-buttons">
        <button className="btn btn-ghost" onClick={beep}>
          1. Play a beep
        </button>
        <button className="btn btn-ghost" onClick={() => speech("Dutch basic", TEST_NL, { lang: "nl-NL" })}>
          2. Say Dutch (basic)
        </button>
        <button
          className="btn btn-ghost"
          disabled={!nl}
          onClick={() => nl && speech("Dutch chosen voice", TEST_NL, { lang: nl.lang, voice: nl })}
        >
          3. Say Dutch (chosen voice)
        </button>
        <button className="btn btn-ghost" onClick={() => speech("English default", TEST_EN)}>
          4. Say English (default voice)
        </button>
        <button className="btn btn-ghost" onClick={appWay}>
          5. Say a sentence (the app’s way)
        </button>
        <button className="btn btn-ghost" onClick={clip}>
          6. Play a recorded word
        </button>
      </div>
      <pre className="sc-log" aria-live="polite">{log.length ? log.join("\n") : "Results appear here."}</pre>
    </div>
  );
}
