import { useCallback, useEffect, useState } from "react";
import { RATE_NORMAL, RATE_SLOW, canSpeak, pauseSpeaking, resumeSpeaking, speakQueue, stopSpeaking } from "./speech";

export type NarrationStatus = "idle" | "playing" | "paused";

/** Read a list of paragraphs aloud, tracking which one is being spoken. */
export function useNarration(texts: string[]) {
  const [status, setStatus] = useState<NarrationStatus>("idle");
  const [index, setIndex] = useState(-1);
  const [slow, setSlow] = useState(false);
  const supported = canSpeak();

  const reset = useCallback(() => {
    setStatus("idle");
    setIndex(-1);
  }, []);

  /** Play from paragraph `from` to the end, or just that one paragraph when `single` is set. */
  const play = useCallback(
    (from = 0, single = false, isSlow = slow) => {
      const list = single ? [texts[from]] : texts.slice(from);
      setStatus("playing");
      setIndex(from);
      speakQueue(list, {
        rate: isSlow ? RATE_SLOW : RATE_NORMAL,
        onStart: (i) => setIndex(from + i),
        onEnd: reset,
        onInterrupt: reset,
        onError: reset,
      });
    },
    [texts, slow, reset],
  );

  const pause = useCallback(() => {
    pauseSpeaking();
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    resumeSpeaking();
    setStatus("playing");
  }, []);

  const stop = useCallback(() => stopSpeaking(), []);

  const toggleSlow = useCallback(() => {
    const next = !slow;
    setSlow(next);
    // Apply the new speed right away if we are reading: restart from the current paragraph
    if (status !== "idle" && index >= 0) play(index, false, next);
  }, [slow, status, index, play]);

  // Stop reading when the story is left
  useEffect(() => () => stopSpeaking(), []);

  return { supported, status, index, slow, play, pause, resume, stop, toggleSlow };
}
