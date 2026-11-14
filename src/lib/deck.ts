import type { Level, Story } from "../types";
import type { AppState } from "./state";
import { formatDifficulty } from "./text";

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

/** Stories not yet saved or skipped, in reading order. */
export function unreadStories(stories: Story[], state: Pick<AppState, "saved" | "skipped">): Story[] {
  return stories.filter((s) => !state.saved.includes(s.id) && !state.skipped.includes(s.id));
}

/**
 * The story to show next: the first unread one at or above the chosen level.
 * When everything from that level up is done, the easier unread stories come back, so nothing is ever lost.
 */
export function nextStory(stories: Story[], state: Pick<AppState, "saved" | "skipped" | "startRank">): Story | undefined {
  const unread = unreadStories(stories, state);
  return unread.find((s) => rankOf(s) >= state.startRank) ?? unread[0];
}

/**
 * What “Start here” at a level does. Starting at a level also brings back the stories from that level up
 * that were skipped before (that is the roll back); saved stories stay in Saved and are not shown again.
 */
export function levelPlan(stories: Story[], state: Pick<AppState, "saved" | "skipped">, rank: number) {
  const open = stories.filter((s) => !state.saved.includes(s.id));
  const returning = open.filter((s) => state.skipped.includes(s.id) && rankOf(s) >= rank);
  return {
    /** skipped stories that come back into the deck */
    returning,
    /** unread stories below the level: they stay unread */
    easier: open.filter((s) => !state.skipped.includes(s.id) && rankOf(s) < rank).length,
    /** the story the deck will show */
    next: open.find((s) => rankOf(s) >= rank),
  };
}
