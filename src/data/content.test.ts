import { describe, expect, it } from "vitest";
import { stories } from "./stories";
import { pillById } from "./pills";
import { lookup, dictionary, entryId } from "./dictionary";
import { parseSegments, stripMarkup, tokenize, countWords, readingMinutes } from "../lib/text";
import { introWords } from "../lib/intro";

describe("story content", () => {
  it("has unique story ids", () => {
    const ids = stories.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every word in every story is in the dictionary", () => {
    const missing = new Set<string>();
    for (const s of stories) {
      for (const p of s.paragraphs) {
        for (const t of tokenize(stripMarkup(p.nl))) {
          if (t.word && !lookup(t.text)) missing.add(`${t.text} (${s.id})`);
        }
      }
    }
    expect([...missing]).toEqual([]);
  });

  it("every pill referenced in a story exists", () => {
    const unknown: string[] = [];
    for (const s of stories) {
      for (const p of s.paragraphs) {
        for (const seg of parseSegments(p.nl)) {
          if (seg.kind === "pill" && !pillById.has(seg.pillId)) unknown.push(`${seg.pillId} (${s.id})`);
        }
      }
    }
    expect(unknown).toEqual([]);
  });

  it("pill markup is balanced (no stray braces)", () => {
    for (const s of stories) {
      for (const p of s.paragraphs) {
        expect(stripMarkup(p.nl)).not.toMatch(/[{}|]/);
      }
    }
  });

  it("each story reads in 3 minutes or less and has a translation per paragraph", () => {
    for (const s of stories) {
      expect(readingMinutes(s.paragraphs)).toBeLessThanOrEqual(3);
      expect(countWords(s.paragraphs)).toBeLessThanOrEqual(180);
      for (const p of s.paragraphs) expect(p.en.length).toBeGreaterThan(5);
    }
  });

  it("quiz answers point at a real option", () => {
    for (const s of stories) {
      expect(s.quiz.length).toBeGreaterThan(0);
      for (const q of s.quiz) {
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      }
    }
  });

  it("every pill is used in at least one story", () => {
    const used = new Set<string>();
    for (const s of stories) for (const p of s.paragraphs) for (const seg of parseSegments(p.nl)) if (seg.kind === "pill") used.add(seg.pillId);
    const unused = [...pillById.keys()].filter((id) => !used.has(id));
    expect(unused).toEqual([]);
  });
});

describe("story entry page (intro)", () => {
  it("has at most 5 key words and 1–2 key pills", () => {
    for (const s of stories) {
      expect(s.intro.words.length, s.id).toBeGreaterThanOrEqual(1);
      expect(s.intro.words.length, s.id).toBeLessThanOrEqual(5);
      expect(s.intro.pills.length, s.id).toBeGreaterThanOrEqual(1);
      expect(s.intro.pills.length, s.id).toBeLessThanOrEqual(2);
      expect(new Set(s.intro.words).size, s.id).toBe(s.intro.words.length);
    }
  });

  it("every key word exists in the dictionary and occurs in its story, with an example sentence", () => {
    for (const s of stories) {
      const resolved = introWords(s);
      expect(resolved.map((w) => w.id), s.id).toEqual(s.intro.words);
      for (const w of resolved) {
        expect(w.paragraph, `${s.id}: ${w.id} not found in story`).not.toBe("");
        expect(w.example.length, `${s.id}: ${w.id}`).toBeGreaterThan(3);
      }
    }
  });

  it("every key pill exists and is used in the story itself", () => {
    for (const s of stories) {
      const used = new Set<string>();
      for (const p of s.paragraphs) for (const seg of parseSegments(p.nl)) if (seg.kind === "pill") used.add(seg.pillId);
      for (const id of s.intro.pills) {
        expect(pillById.has(id), `${s.id}: unknown pill ${id}`).toBe(true);
        expect(used.has(id), `${s.id}: pill ${id} not used in story`).toBe(true);
      }
    }
  });
});

describe("dictionary", () => {
  it("has unique lemma ids", () => {
    const ids = dictionary.map(entryId);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });
  it("maps inflected forms to their lemma", () => {
    expect(lookup("Kijkt")?.nl).toBe("kijken");
    expect(lookup("grote")?.nl).toBe("groot");
    expect(lookup("wortels")?.article).toBe("de");
  });
});
