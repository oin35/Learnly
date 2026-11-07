/** Read Dutch text aloud using the browser's built-in speech synthesis (no network needed). */
export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

function utterance(text: string): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "nl-NL";
  u.rate = 0.85; // a little slower for learners
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("nl"));
  if (voice) u.voice = voice;
  return u;
}

export function speak(text: string): void {
  speakAll([text]);
}

/** Speak several texts one after another (cancels anything already playing). */
export function speakAll(texts: string[]): void {
  if (!canSpeak()) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    for (const t of texts) synth.speak(utterance(t));
  } catch {
    /* ignore */
  }
}
