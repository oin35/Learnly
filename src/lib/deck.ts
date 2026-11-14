import type { Level, Story } from "../types";
import type { AppState } from "./state";
import { formatDifficulty } from "./text";

type Progress = Pick<AppState, "saved" | "skipped" | "again">;

/**
 * One number for "how hard": A1 1…10 → 1…10, A2 1…10 → 11…20.
 * (The levels overlap in real difficulty, but the stories are written in this order.)
 */
export function rankOf(s: { level: Level; difficulty: number }): number {
  return (s.level === "A2" ? 10 : 0) + s.difficulty;
}

/** 4 → "A1 · 4", 12.5 → "A2 · 2.5" */
export function rankLabel(rank: number): string {
  return rank > 10 ? `A2 · ${formatDifficulty(rank - 10)}` : `A1 · ${formatDifficulty(rank)}`;
}

/** Every level that has at least one story, easiest first: the stops of the level slider. */
export function levelSteps(stories: Story[]): number[] {
  return [...new Set(stories.map(rankOf))].sort((a, b) => a - b);
}

/** New stories: not yet saved or skipped, in reading order. */
export function unreadStories(stories: Story[], state: Pick<AppState, "saved" | "skipped">): Story[] {
  return stories.filter((s) => !state.saved.includes(s.id) && !state.skipped.includes(s.id));
}

/** A story is in the reading deck when it is new, or when the reader rolled back to it. */
const inDeck = (s: Story, state: Progress) => !state.skipped.includes(s.id) && (!state.saved.includes(s.id) || state.again.includes(s.id));

/**
 * The story to show next: the first one in the deck at or above the chosen level.
 * When everything from that level up is done, the easier unread stories come back, so nothing is ever lost.
 */
export function nextStory(stories: Story[], state: Progress & Pick<AppState, "startRank">): Story | undefined {
  const deck = stories.filter((s) => inDeck(s, state));
  return deck.find((s) => rankOf(s) >= state.startRank) ?? deck[0];
}

/**
 * What “Start here” at a level does: the deck starts again at that level, with every story from there up,
 * also the ones that were read and saved or skipped before (that is the roll back). Saved stories stay saved.
 * Easier stories are left as they are.
 */
export function levelPlan(stories: Story[], state: Progress, rank: number) {
  const up = stories.filter((s) => rankOf(s) >= rank);
  return {
    /** the story the deck will show */
    next: up[0] as Story | undefined,
    /** stories that are not in the deck now and come back into it */
    back: up.filter((s) => !inDeck(s, state)).length,
    /** skipped stories that become unread again */
    unskip: up.filter((s) => state.skipped.includes(s.id)).map((s) => s.id),
    /** saved stories that are shown again */
    again: up.filter((s) => state.saved.includes(s.id)).map((s) => s.id),
    /** new stories below the level: they stay unread */
    easier: unreadStories(stories, state).filter((s) => rankOf(s) < rank).length,
  };
}
