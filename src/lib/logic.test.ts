import { describe, expect, it } from "vitest";
import { reducer, initialState, streak, dayKey, loadState, saveState } from "./state";
import { schedule, dueCards, INTERVAL_DAYS, level } from "./srs";
import { parseSegments, tokenize, sentenceWith, stripMarkup } from "./text";

const DAY = 24 * 3600 * 1000;
const t0 = new Date(2026, 5, 10, 9, 30).getTime(); // local time
const word = { id: "wortel", nl: "wortel", en: "carrot", pos: "noun" as const, article: "de" as const };

describe("state reducer", () => {
  it("likes a story, removes it from skipped, newest first", () => {
    let s = reducer(initialState, { type: "skip", id: "a", now: t0 });
    expect(s.skipped).toEqual(["a"]);
    s = reducer(s, { type: "like", id: "a", now: t0 });
    s = reducer(s, { type: "like", id: "b", now: t0 });
    expect(s.saved).toEqual(["b", "a"]);
    expect(s.skipped).toEqual([]);
  });

  it("does not skip an already saved story", () => {
    let s = reducer(initialState, { type: "like", id: "a", now: t0 });
    s = reducer(s, { type: "skip", id: "a", now: t0 });
    expect(s.skipped).toEqual([]);
  });

  it("adds a word once and removes it", () => {
    let s = reducer(initialState, { type: "addWord", word, now: t0 });
    const again = reducer(s, { type: "addWord", word: { ...word, en: "other" }, now: t0 + 1 });
    expect(again).toBe(s);
    expect(s.vocab.wortel.box).toBe(0);
    s = reducer(s, { type: "removeWord", id: "wortel" });
    expect(s.vocab).toEqual({});
  });

  it("keeps the best quiz score", () => {
    let s = reducer(initialState, { type: "quiz", id: "a", score: 2, total: 2, now: t0 });
    s = reducer(s, { type: "quiz", id: "a", score: 1, total: 2, now: t0 });
    expect(s.quiz.a).toEqual({ score: 2, total: 2 });
  });
});

describe("streak", () => {
  it("counts consecutive days ending today or yesterday", () => {
    const days = [dayKey(t0 - 2 * DAY), dayKey(t0 - DAY), dayKey(t0)];
    expect(streak(days, t0)).toBe(3);
    expect(streak(days.slice(0, 2), t0)).toBe(2); // not yet active today
    expect(streak([dayKey(t0 - 3 * DAY)], t0)).toBe(0);
    expect(streak([], t0)).toBe(0);
  });
});

describe("spaced repetition", () => {
  it("moves up a box and schedules for a later day when correct", () => {
    let s = reducer(initialState, { type: "addWord", word, now: t0 });
    expect(dueCards(s.vocab, t0)).toHaveLength(1);
    s = reducer(s, { type: "review", id: "wortel", correct: true, now: t0 });
    const c = s.vocab.wortel;
    expect(c.box).toBe(1);
    expect(dueCards(s.vocab, t0)).toHaveLength(0);
    expect(dueCards(s.vocab, t0 + DAY)).toHaveLength(1); // due again tomorrow
    expect(level(c)).toBe("learning");
  });

  it("falls back to box 0 and retries soon when wrong", () => {
    let c = { ...reducer(initialState, { type: "addWord", word, now: t0 }).vocab.wortel };
    c = schedule(schedule(c, true, t0), true, t0);
    expect(c.box).toBe(2);
    const wrong = schedule(c, false, t0);
    expect(wrong.box).toBe(0);
    expect(wrong.due).toBeGreaterThan(t0);
    expect(wrong.due).toBeLessThan(t0 + DAY);
  });

  it("caps at the last box", () => {
    let c = reducer(initialState, { type: "addWord", word, now: t0 }).vocab.wortel;
    for (let i = 0; i < 10; i++) c = schedule(c, true, t0);
    expect(c.box).toBe(INTERVAL_DAYS.length - 1);
    expect(level(c)).toBe("known");
  });
});

describe("persistence", () => {
  it("round-trips through storage and survives corrupt data", () => {
    const mem = new Map<string, string>();
    const kv = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v) };
    const s = reducer(initialState, { type: "like", id: "a", now: t0 });
    saveState(s, kv);
    expect(loadState(kv).saved).toEqual(["a"]);
    kv.setItem("learnly:v1", "{not json");
    expect(loadState(kv)).toEqual(initialState);
    expect(loadState(null)).toEqual(initialState);
  });
});

describe("text helpers", () => {
  it("parses pill markup and tokenizes words with accents", () => {
    const segs = parseSegments("Hij ziet {{geen wortel|neg}}. België!");
    expect(segs.map((s) => s.kind)).toEqual(["text", "pill", "text"]);
    expect(tokenize("België, ja!").filter((t) => t.word).map((t) => t.text)).toEqual(["België", "ja"]);
  });
  it("finds the sentence containing a word", () => {
    const raw = "Het is ochtend. {{Het konijntje|dim}} heet Bram. Bram heeft honger.";
    expect(stripMarkup(raw)).not.toContain("{{");
    expect(sentenceWith(raw, "heet")).toBe("Het konijntje heet Bram.");
  });
});
