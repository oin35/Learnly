import { describe, expect, it } from "vitest";
import { stories } from "../data/stories";
import type { Story } from "../types";
import { levelPlan, levelSteps, nextStory, rankLabel, rankOf, unreadStories } from "./deck";
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

  const start = (s: typeof initialState, rank: number) => {
    const plan = levelPlan(deck, s, rank);
    return reducer(s, { type: "setStartRank", rank, unskip: plan.unskip, again: plan.again });
  };

  it("rolling back restarts the deck at that level, with the stories that were read or skipped before", () => {
    // read and saved a, b and d, skipped c: the deck is at e
    let s = initialState;
    for (const id of ["a", "b"]) s = reducer(s, { type: "like", id, now: 1 });
    s = reducer(s, { type: "skip", id: "c", now: 2 });
    s = reducer(s, { type: "like", id: "d", now: 3 });
    expect(nextStory(deck, s)?.id).toBe("e");
    const savedBefore = s.saved;

    // slide down to A1 · 2.5: the saved story d is read again; a, b, c are left alone
    let plan = levelPlan(deck, s, 2.5);
    expect(plan.next?.id).toBe("d");
    expect(plan.back).toBe(1);
    s = start(s, 2.5);
    expect(nextStory(deck, s)?.id).toBe("d");
    expect(s.saved).toEqual(savedBefore); // still saved, same order
    expect(s.skipped).toEqual(["c"]);
    expect(unreadStories(deck, s).map((x) => x.id)).toEqual(["e", "f"]); // "new stories" does not count the old ones

    // reading it again and moving on keeps it saved; so does passing over it
    const liked = reducer(s, { type: "like", id: "d", now: 4 });
    expect(liked.saved).toEqual(savedBefore);
    expect(nextStory(deck, liked)?.id).toBe("e");
    const passed = reducer(s, { type: "skip", id: "d", now: 4 });
    expect(passed.saved).toEqual(savedBefore);
    expect(passed.skipped).toEqual(["c"]);
    expect(nextStory(deck, passed)?.id).toBe("e");

    // all the way down: everything comes back, in order
    plan = levelPlan(deck, s, 1);
    expect(plan.next?.id).toBe("a");
    expect(plan.back).toBe(3); // a, b, c (d is already back)
    s = start(s, 1);
    expect(s.skipped).toEqual([]);
    const order: string[] = [];
    for (let n = nextStory(deck, s); n; n = nextStory(deck, s)) {
      order.push(n.id);
      s = reducer(s, { type: "like", id: n.id, now: 5 });
    }
    expect(order).toEqual(["a", "b", "c", "d", "e", "f"]);
  });

  it("sliding forward again returns to the new stories", () => {
    let s = initialState;
    for (const id of ["a", "b", "c", "d"]) s = reducer(s, { type: "like", id, now: 1 });
    s = start(s, 1);
    expect(nextStory(deck, s)?.id).toBe("a");
    s = start(s, 10);
    expect(nextStory(deck, s)?.id).toBe("e");
    expect(s.again).toEqual([]); // the easier saved stories are out of the deck again
    expect(s.saved).toHaveLength(4);
  });

  it("jumping ahead leaves easier stories alone", () => {
    const s = reducer(initialState, { type: "skip", id: "b", now: 1 });
    const plan = levelPlan(deck, s, 10);
    expect(plan.unskip).toEqual([]);
    expect(plan.back).toBe(0);
    expect(plan.easier).toBe(3); // a, c, d — b is skipped, not unread
    expect(plan.next?.id).toBe("e");
    expect(start(s, 10).skipped).toEqual(["b"]);
  });

  it("removing a story from Saved, a reload and a sync keep the deck consistent", () => {
    let s = reducer(initialState, { type: "like", id: "a", now: 1 });
    s = start(s, 1);
    expect(s.again).toEqual(["a"]);
    expect(sanitize(JSON.parse(JSON.stringify(s)))?.again).toEqual(["a"]);
    expect(sanitize({ v: 1, saved: [], again: ["a"] })?.again).toEqual([]); // only saved stories can be "again"
    expect(mergeStates(s, initialState).again).toEqual(["a"]);
    expect(reducer(s, { type: "unsave", id: "a" }).again).toEqual([]);
  });
});
