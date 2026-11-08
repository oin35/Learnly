import { describe, expect, it } from "vitest";
import { reducer, initialState, streak, dayKey, loadState, saveState } from "./state";
import { schedule, dueCards, INTERVAL_DAYS, level, KNOWN_AFTER } from "./srs";
import { buildQuiz } from "./quiz";
import { dictionary } from "../data/dictionary";
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

  it("becomes Known only after 3 correct answers in a row; a wrong answer sends it back", () => {
    let c = reducer(initialState, { type: "addWord", word, now: t0 }).vocab.wortel;
    expect(level(c)).toBe("learning"); // brand new words are Learning too
    c = schedule(c, true, t0);
    c = schedule(c, true, t0);
    expect(c.box).toBe(KNOWN_AFTER - 1);
    expect(level(c)).toBe("learning");
    c = schedule(c, true, t0);
    expect(level(c)).toBe("known");
    c = schedule(c, false, t0);
    expect(level(c)).toBe("learning");
    expect(c.box).toBe(0);
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

describe("progress counters and favorites", () => {
  it("counts a story as read when the check is completed or when it is liked, once", () => {
    let s = reducer(initialState, { type: "markRead", id: "a", now: t0 });
    s = reducer(s, { type: "markRead", id: "a", now: t0 });
    expect(s.read).toEqual(["a"]);
    s = reducer(s, { type: "like", id: "b", now: t0 });
    expect(s.read).toEqual(["a", "b"]);
    s = reducer(s, { type: "skip", id: "c", now: t0 });
    expect(s.read).toEqual(["a", "b"]); // skipping is not reading
    s = reducer(s, { type: "unsave", id: "b" });
    expect(s.read).toContain("b"); // un-saving does not un-read
  });

  it("never lists a story twice and keeps read stories that are no longer saved", () => {
    const data = { v: 1, saved: ["a", "b"], skipped: [], vocab: {}, days: [], quiz: {}, pillsSeen: [], read: ["b", "c"], favPills: [] };
    const s = loadState({ getItem: () => JSON.stringify(data), setItem: () => undefined });
    expect([...s.read].sort()).toEqual(["a", "b", "c"]);
  });

  it("toggles favorite grammar pills and keeps them through save/load", () => {
    let s = reducer(initialState, { type: "toggleFavPill", id: "neg" });
    s = reducer(s, { type: "toggleFavPill", id: "q" });
    expect(s.favPills).toEqual(["neg", "q"]);
    const mem = new Map<string, string>();
    const kv = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v) };
    saveState(s, kv);
    expect(loadState(kv).favPills).toEqual(["neg", "q"]);
    s = reducer(s, { type: "toggleFavPill", id: "neg" });
    expect(s.favPills).toEqual(["q"]);
  });

  it("loads progress saved by the previous version (no read/favPills fields)", () => {
    const old = { v: 1, saved: ["a"], skipped: [], vocab: {}, days: [], quiz: {}, pillsSeen: [] };
    const kv = { getItem: () => JSON.stringify(old), setItem: () => undefined };
    const s = loadState(kv);
    expect(s.saved).toEqual(["a"]);
    expect(s.read).toEqual(["a"]); // a saved story is also a read story, even if it was saved before `read` existed
    expect(s.favPills).toEqual([]);
  });
});

describe("word quiz", () => {
  const seeded = (seed: number) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const real = dictionary.filter((d) => d.pos !== "name");

  it("always offers exactly 3 distinct options with the right one marked, in both directions", () => {
    for (const d of real) {
      const card = { id: d.nl.toLowerCase(), nl: d.nl, en: d.en, pos: d.pos, article: d.article };
      for (const dir of ["nl-en", "en-nl"] as const) {
        const q = buildQuiz(card, dir, seeded(7));
        expect(q.options).toHaveLength(3);
        expect(new Set(q.options).size, `${d.nl} ${dir}`).toBe(3);
        const correct = dir === "nl-en" ? d.en : d.article ? `${d.article} ${d.nl}` : d.nl;
        expect(q.options[q.answer]).toBe(correct);
        expect(q.prompt).toBe(dir === "nl-en" ? (d.article ? `${d.article} ${d.nl}` : d.nl) : d.en);
      }
    }
  });

  it("prefers wrong options of the same kind of word", () => {
    const verb = real.find((d) => d.nl === "kijken")!;
    const q = buildQuiz({ id: "kijken", nl: verb.nl, en: verb.en, pos: verb.pos }, "nl-en", seeded(3));
    expect(q.options.every((o) => o.startsWith("to "))).toBe(true);
  });
});
