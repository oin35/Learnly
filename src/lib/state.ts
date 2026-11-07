import type { VocabCard } from "../types";
import { newCard, schedule } from "./srs";

export interface AppState {
  v: 1;
  /** Liked & saved story ids, newest first */
  saved: string[];
  skipped: string[];
  vocab: Record<string, VocabCard>;
  /** Local dates (YYYY-MM-DD) on which the learner did something */
  days: string[];
  quiz: Record<string, { score: number; total: number }>;
  pillsSeen: string[];
}

export const initialState: AppState = {
  v: 1,
  saved: [],
  skipped: [],
  vocab: {},
  days: [],
  quiz: {},
  pillsSeen: [],
};

export type WordInput = Parameters<typeof newCard>[0];

export type Action =
  | { type: "like"; id: string; now: number }
  | { type: "skip"; id: string; now: number }
  | { type: "unsave"; id: string }
  | { type: "resetSkipped" }
  | { type: "addWord"; word: WordInput; now: number }
  | { type: "removeWord"; id: string }
  | { type: "review"; id: string; correct: boolean; now: number }
  | { type: "quiz"; id: string; score: number; total: number; now: number }
  | { type: "pillSeen"; id: string }
  | { type: "reset" };

export function dayKey(ms: number): string {
  const d = new Date(ms);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function withDay(days: string[], now: number): string[] {
  const k = dayKey(now);
  return days.includes(k) ? days : [...days, k];
}

const without = (list: string[], id: string) => list.filter((x) => x !== id);

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "like":
      return {
        ...state,
        saved: [action.id, ...without(state.saved, action.id)],
        skipped: without(state.skipped, action.id),
        days: withDay(state.days, action.now),
      };
    case "skip":
      return {
        ...state,
        skipped: state.saved.includes(action.id) ? state.skipped : [...without(state.skipped, action.id), action.id],
        days: withDay(state.days, action.now),
      };
    case "unsave":
      return { ...state, saved: without(state.saved, action.id) };
    case "resetSkipped":
      return { ...state, skipped: [] };
    case "addWord": {
      if (state.vocab[action.word.id]) return state;
      return {
        ...state,
        vocab: { ...state.vocab, [action.word.id]: newCard(action.word, action.now) },
        days: withDay(state.days, action.now),
      };
    }
    case "removeWord": {
      const { [action.id]: _removed, ...rest } = state.vocab;
      return { ...state, vocab: rest };
    }
    case "review": {
      const card = state.vocab[action.id];
      if (!card) return state;
      return {
        ...state,
        vocab: { ...state.vocab, [card.id]: schedule(card, action.correct, action.now) },
        days: withDay(state.days, action.now),
      };
    }
    case "quiz": {
      const prev = state.quiz[action.id];
      // Keep the best score
      const best = !prev || action.score >= prev.score ? { score: action.score, total: action.total } : prev;
      return { ...state, quiz: { ...state.quiz, [action.id]: best }, days: withDay(state.days, action.now) };
    }
    case "pillSeen":
      return state.pillsSeen.includes(action.id) ? state : { ...state, pillsSeen: [...state.pillsSeen, action.id] };
    case "reset":
      return initialState;
  }
}

/** Consecutive days of activity ending today (or yesterday, so the streak survives until tonight). */
export function streak(days: string[], now: number): number {
  const set = new Set(days);
  const d = new Date(now);
  d.setHours(12, 0, 0, 0);
  if (!set.has(dayKey(d.getTime()))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(dayKey(d.getTime()))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

const KEY = "learnly:v1";

type KV = Pick<Storage, "getItem" | "setItem">;

function defaultStorage(): KV | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null; // blocked (private mode, sandboxed iframe, …)
  }
}

export function loadState(storage: KV | null = defaultStorage()): AppState {
  try {
    const raw = storage?.getItem(KEY);
    if (!raw) return initialState;
    const p = JSON.parse(raw) as Partial<AppState>;
    if (p.v !== 1) return initialState;
    return {
      ...initialState,
      saved: Array.isArray(p.saved) ? p.saved : [],
      skipped: Array.isArray(p.skipped) ? p.skipped : [],
      vocab: p.vocab && typeof p.vocab === "object" ? p.vocab : {},
      days: Array.isArray(p.days) ? p.days : [],
      quiz: p.quiz && typeof p.quiz === "object" ? p.quiz : {},
      pillsSeen: Array.isArray(p.pillsSeen) ? p.pillsSeen : [],
    };
  } catch {
    return initialState;
  }
}

export function saveState(state: AppState, storage: KV | null = defaultStorage()): void {
  try {
    storage?.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or unavailable: the app still works for this session */
  }
}
