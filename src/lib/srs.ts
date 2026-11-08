import type { VocabCard } from "../types";

/** Leitner boxes: days until the next review after answering correctly in box N. */
export const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];
export const MAX_BOX = INTERVAL_DAYS.length - 1;
const RETRY_MS = 10 * 60 * 1000;

/** Start of the local day, `days` days after `now`. */
function startOfDayPlus(now: number, days: number): number {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.getTime();
}

export function newCard(
  base: Pick<VocabCard, "id" | "nl" | "en" | "pos" | "article" | "example" | "storyId">,
  now: number,
): VocabCard {
  return { ...base, addedAt: now, box: 0, due: now, seen: 0, correct: 0 };
}

/** Apply a review result. Correct → next box, wrong → back to box 0. */
export function schedule(card: VocabCard, correct: boolean, now: number): VocabCard {
  if (correct) {
    const box = Math.min(MAX_BOX, card.box + 1);
    return { ...card, box, due: startOfDayPlus(now, INTERVAL_DAYS[box]), seen: card.seen + 1, correct: card.correct + 1 };
  }
  return { ...card, box: 0, due: now + RETRY_MS, seen: card.seen + 1 };
}

export function isDue(card: VocabCard, now: number): boolean {
  return card.due <= now;
}

export function dueCards(vocab: Record<string, VocabCard>, now: number): VocabCard[] {
  return Object.values(vocab)
    .filter((c) => isDue(c, now))
    .sort((a, b) => a.due - b.due || a.addedAt - b.addedAt);
}

/** A word is Known after 3 correct reviews in a row; until then it is Learning. A wrong answer sends it back. */
export const KNOWN_AFTER = 3;

export function level(card: VocabCard): "learning" | "known" {
  return card.box >= KNOWN_AFTER ? "known" : "learning";
}
