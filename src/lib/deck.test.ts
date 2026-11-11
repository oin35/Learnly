import { describe, expect, it } from "vitest";
import { stories } from "../data/stories";
import type { Story } from "../types";
import { levelSteps, nextStory, rankLabel, rankOf, unreadStories } from "./deck";
import { initialState, reducer, sanitize } from "./state";
import { mergeStates } from "./sync";

const st = (id: string, level: "A1" | "A2", difficulty: number) => ({ id, level, difficulty }) as Story;
const deck = [st("a", "A1", 1), st("b", "A1", 2), st("c", "A1", 2), st("d", "A1", 2.5), st("e", "A1", 10), st("f", "A2", 1)];

describe("levels", () => {
  it("A2 continues where A1 ends", () => {
    expect(rankOf({ level: "A1", difficulty: 10 })).toBe(10);
    expect(rankOf({ level: "A2", difficulty: 1 })).toBe(11);
    expect(rankLabel(4)).toBe("A1 · 4");
    expect(rankLabel(2.5)).toBe("A1 · 2.5");
    expect(rankLabel(10)).toBe("A1 · 10");
    expect(rankLabel(12.5)).toBe("A2 · 2.5");
  });

  it("the slider has one stop per level that has a story", () => {
    expect(levelSteps(deck)).toEqual([1, 2, 2.5, 10, 11]);
    const real = levelSteps(stories);
    expect(real[0]).toBe(1);
    expect(real).toEqual([...real].sort((a, b) => a - b));
  });
});

describe("choosing a level", () => {
  it("by default the deck starts at the first story", () => {
    expect(nextStory(deck, initialState)?.id).toBe("a");
    expect(unreadStories(deck, initialState)).toHaveLength(6);
  });

  it("jumping ahead starts at that level and leaves the easier stories unread", () => {
    const s = reducer(initialState, { type: "setStartRank", rank: 2.5 });
    expect(nextStory(deck, s)?.id).toBe("d");
    expect(unreadStories(deck, s)).toHaveLength(6); // nothing was skipped or marked read
    expect(s.skipped).toEqual([]);
    expect(s.read).toEqual([]);
  });

  it("rolling back brings the easier stories back", () => {
    let s = reducer(initialState, { type: "setStartRank", rank: 11 });
    expect(nextStory(deck, s)?.id).toBe("f");
    s = reducer(s, { type: "setStartRank", rank: 2 });
    expect(nextStory(deck, s)?.id).toBe("b");
    s = reducer(s, { type: "setStartRank", rank: 0 });
    expect(nextStory(deck, s)?.id).toBe("a");
  });

  it("saved and skipped stories are passed over; when the level runs out the easier ones return", () => {
    let s = reducer(initialState, { type: "setStartRank", rank: 10 });
    s = reducer(s, { type: "like", id: "e", now: 1 });
    expect(nextStory(deck, s)?.id).toBe("f");
    s = reducer(s, { type: "skip", id: "f", now: 2 });
    expect(nextStory(deck, s)?.id).toBe("a"); // nothing left up there: back to the unread easier stories
    for (const id of ["a", "b", "c", "d"]) s = reducer(s, { type: "skip", id, now: 3 });
    expect(nextStory(deck, s)).toBeUndefined();
  });

  it("the choice is stored, survives a reload and a sync", () => {
    const s = reducer(initialState, { type: "setStartRank", rank: 4.5 });
    expect(sanitize(JSON.parse(JSON.stringify(s)))?.startRank).toBe(4.5);
    expect(sanitize({ v: 1 })?.startRank).toBe(0); // progress saved before this feature
    expect(sanitize({ v: 1, startRank: "x" })?.startRank).toBe(0);
    expect(sanitize({ v: 1, startRank: -3 })?.startRank).toBe(0);
    expect(mergeStates(s, initialState).startRank).toBe(4.5); // this device's choice wins a merge
    expect(reducer(s, { type: "setStartRank", rank: 4.5 })).toBe(s); // no change, no needless save
  });
});
