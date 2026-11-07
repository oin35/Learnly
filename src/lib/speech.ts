/** Read Dutch text aloud using the browser's built-in speech synthesis (no network needed). */
export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

export function speak(text: string): void {
  if (!canSpeak()) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "nl-NL";
    u.rate = 0.85; // a little slower for learners
    const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("nl"));
    if (voice) u.voice = voice;
    synth.speak(u);
  } catch {
    /* ignore */
  }
}
