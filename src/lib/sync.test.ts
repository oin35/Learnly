import { describe, expect, it } from "vitest";
import { initialState, reducer, sanitize, type AppState } from "./state";
import { codeFor, mergeStates, normalizeKey, reconcile } from "./sync";

const t0 = new Date(2026, 5, 10, 9, 30).getTime();
const word = (id: string) => ({ id, nl: id, en: id + "-en", pos: "noun" as const });
const withWord = (s: AppState, id: string, now = t0) => reducer(s, { type: "addWord", word: word(id), now });

describe("sync keys", () => {
  it("need at least 6 characters; capitals and spaces don't matter", () => {
    expect(normalizeKey("12345")).toBeNull();
    expect(normalizeKey("  a b c d e ")).toBeNull(); // only 5 real characters
    expect(normalizeKey("123456")).toBe("123456");
    expect(normalizeKey(" Tulip Bike 77 ")).toBe("tulipbike77");
    expect(normalizeKey("TULIPBIKE77")).toBe(normalizeKey("tulip bike 77"));
    expect(normalizeKey("çiçek-2026")).toBe("çiçek-2026"); // any letters and signs are fine
    expect(normalizeKey("x".repeat(41))).toBeNull();
  });

  it("turn into a code the server accepts, the same on every device and different per key", async () => {
    const a = await codeFor("tulipbike77");
    expect(a).toMatch(/^[0-9A-F]{32}$/); // fits the server rule ^[0-9A-Z]{12,40}$
    expect(await codeFor("tulipbike77")).toBe(a);
    expect(await codeFor("tulipbike78")).not.toBe(a);
    expect(a).not.toContain("TULIP"); // the key itself is not sent
  });
});

describe("merging two devices", () => {
  it("keeps everything from both and never lists a story twice", () => {
    let a = reducer(initialState, { type: "like", id: "s1", now: t0 });
    a = withWord(a, "wortel");
    a = reducer(a, { type: "toggleFavPill", id: "neg" });
    let b = reducer(initialState, { type: "like", id: "s2", now: t0 });
    b = reducer(b, { type: "skip", id: "s1", now: t0 });
    b = withWord(b, "fiets");
    b = reducer(b, { type: "quiz", id: "s2", score: 2, total: 2, now: t0 + 86400000 });
    const m = mergeStates(a, b);
    expect([...m.saved].sort()).toEqual(["s1", "s2"]);
    expect(m.skipped).toEqual([]); // s1 was saved on the other device, so it is not "skipped"
    expect(Object.keys(m.vocab).sort()).toEqual(["fiets", "wortel"]);
    expect(m.favPills).toEqual(["neg"]);
    expect(m.quiz.s2).toEqual({ score: 2, total: 2 });
    expect(m.days).toHaveLength(2);
    expect([...m.read].sort()).toEqual(["s1", "s2"]);
    expect(sanitize(JSON.parse(JSON.stringify(m)))).toEqual(m); // survives the trip to the server and back
  });

  it("for the same word keeps the copy that was reviewed more", () => {
    const a = withWord(initialState, "wortel");
    let b = withWord(initialState, "wortel");
    b = reducer(b, { type: "review", id: "wortel", correct: true, now: t0 });
    b = reducer(b, { type: "review", id: "wortel", correct: true, now: t0 });
    expect(mergeStates(a, b).vocab.wortel.box).toBe(2);
    expect(mergeStates(b, a).vocab.wortel.box).toBe(2);
  });

  it("keeps the best quiz score", () => {
    const a = reducer(initialState, { type: "quiz", id: "s", score: 1, total: 2, now: t0 });
    const b = reducer(initialState, { type: "quiz", id: "s", score: 2, total: 2, now: t0 });
    expect(mergeStates(a, b).quiz.s.score).toBe(2);
    expect(mergeStates(b, a).quiz.s.score).toBe(2);
  });
});

describe("deciding what to do after fetching the server copy", () => {
  const local = withWord(initialState, "wortel");
  const server = withWord(initialState, "fiets");
  const meta = (stamp: string | null, dirty: boolean) => ({ key: "tulipbike77", code: "0".repeat(32), stamp, dirty });

  it("uploads when the server has nothing yet", () => {
    expect(reconcile(local, meta(null, true), null)).toEqual({ state: local, push: true, replaced: false });
  });
  it("does nothing when neither side changed", () => {
    expect(reconcile(local, meta("t1", false), { data: local, stamp: "t1" })).toEqual({ state: local, push: false, replaced: false });
  });
  it("uploads when only this device changed", () => {
    expect(reconcile(local, meta("t1", true), { data: server, stamp: "t1" })).toEqual({ state: local, push: true, replaced: false });
  });
  it("takes the server copy when only the other device changed (so removals travel too)", () => {
    const r = reconcile(local, meta("t1", false), { data: initialState, stamp: "t2" });
    expect(r).toEqual({ state: initialState, push: false, replaced: true });
  });
  it("merges when both changed", () => {
    const r = reconcile(local, meta("t1", true), { data: server, stamp: "t2" });
    expect(Object.keys(r.state.vocab).sort()).toEqual(["fiets", "wortel"]);
    expect(r.push && r.replaced).toBe(true);
  });
  it("merges on the first sync of a device that joins with a code (nothing is lost)", () => {
    const r = reconcile(local, meta(null, true), { data: server, stamp: "t5" });
    expect(Object.keys(r.state.vocab).sort()).toEqual(["fiets", "wortel"]);
    expect(r.push && r.replaced).toBe(true);
  });
});

describe("data from the server is not trusted", () => {
  it("rejects anything that is not our progress format", () => {
    expect(sanitize(null)).toBeNull();
    expect(sanitize("hello")).toBeNull();
    expect(sanitize({ v: 2 })).toBeNull();
    expect(sanitize({ v: 1, saved: "x", days: [1, "2026-01-01"] })).toEqual({ ...initialState, days: ["2026-01-01"] });
  });
});
