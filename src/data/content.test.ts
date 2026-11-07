import { describe, expect, it } from "vitest";
import { stories } from "./stories";
import { pillById } from "./pills";
import { lookup, dictionary, entryId } from "./dictionary";
import { parseSegments, stripMarkup, tokenize, countWords, readingMinutes } from "../lib/text";

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
