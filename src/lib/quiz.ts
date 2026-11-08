import type { DictEntry, VocabCard } from "../types";
import { dictionary, displayWord } from "../data/dictionary";

export type Direction = "nl-en" | "en-nl";

export interface WordQuiz {
  /** What is asked: the Dutch word (with article) or its English meaning */
  prompt: string;
  /** Exactly three distinct options, one of them correct */
  options: string[];
  answer: number;
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const label = (e: Pick<DictEntry, "nl" | "article" | "en">, dir: Direction) => (dir === "nl-en" ? e.en : displayWord(e));

/**
 * A 3-choice question for a saved word. Wrong options come from the dictionary,
 * preferring the same kind of word (noun, verb, …) so they are plausible.
 */
export function buildQuiz(card: Pick<VocabCard, "id" | "nl" | "en" | "pos" | "article">, dir: Direction, rng: () => number = Math.random): WordQuiz {
  const correct = label(card, dir);
  const pool = dictionary.filter((d) => d.pos !== "name" && d.nl.toLowerCase() !== card.id && label(d, dir) !== correct);
  const same = shuffle(pool.filter((d) => d.pos === card.pos), rng);
  const other = shuffle(pool.filter((d) => d.pos !== card.pos), rng);
  const wrong: string[] = [];
  for (const d of [...same, ...other]) {
    const l = label(d, dir);
    if (!wrong.includes(l)) wrong.push(l);
    if (wrong.length === 2) break;
  }
  const options = shuffle([correct, ...wrong], rng);
  return { prompt: dir === "nl-en" ? displayWord(card) : card.en, options, answer: options.indexOf(correct) };
}
