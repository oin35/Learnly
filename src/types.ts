export type Pos = "noun" | "verb" | "adj" | "adv" | "prep" | "pron" | "conj" | "num" | "det" | "phrase" | "name";

export interface DictEntry {
  /** Dictionary form, e.g. "kijken" or "wortel" */
  nl: string;
  en: string;
  pos: Pos;
  /** "de" | "het" for nouns */
  article?: "de" | "het";
  /** Every written form that should resolve to this entry (lowercase) */
  forms: string[];
}

export interface Pill {
  id: string;
  title: string;
  /** One-line summary shown in the collapsed badge */
  summary: string;
  /** Short explanation paragraphs / bullet points */
  points: string[];
  examples: { nl: string; en: string }[];
  /** A tiny practical tip */
  tip?: string;
}

export interface Paragraph {
  /** Dutch text. Grammar pills are marked with {{phrase|pill-id}} */
  nl: string;
  en: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export interface Story {
  id: string;
  title: string;
  titleEn: string;
  emoji: string;
  topic: string;
  level: "A1";
  /**
   * Difficulty within A1, from 1 (first words) to 10 (top of A1). The first 8 stories sit at 1–2;
   * after that each new story is 0.5 harder than the one before, up to 10 (see docs/CURRICULUM.md).
   */
  difficulty: number;
  /** A short "Dutch insight" about the culture, places or habits behind the story (English, A1 learners read it with help) */
  insight?: { title: string; text: string };
  /** Entry page shown before the story: up to 5 key words (dictionary ids) and 1–2 key grammar pills */
  intro: { words: string[]; pills: string[] };
  paragraphs: Paragraph[];
  quiz: QuizQuestion[];
}

export interface VocabCard {
  /** dictionary lemma id (entry.nl lowercased) */
  id: string;
  nl: string;
  en: string;
  article?: "de" | "het";
  pos: Pos;
  /** Sentence from the story where the word was saved */
  example?: string;
  storyId?: string;
  addedAt: number;
  /** Leitner box 0..5 */
  box: number;
  /** Timestamp (ms) when the card is next due */
  due: number;
  seen: number;
  correct: number;
}
