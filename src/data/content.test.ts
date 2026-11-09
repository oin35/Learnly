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

describe("difficulty ramp (docs/CURRICULUM.md)", () => {
  const BASELINE = 8; // the first stories, all A1 at difficulty 1–2

  it("starts with the baseline stories at A1, difficulty 1 or 2", () => {
    for (const s of stories.slice(0, BASELINE)) {
      expect(s.level, s.id).toBe("A1");
      expect([1, 2], s.id).toContain(s.difficulty);
    }
  });

  it("then rises by 0.5 with every new story; after A1 10 comes A2 1; A2 stops at 10", () => {
    for (let i = BASELINE; i < stories.length; i++) {
      const prev = stories[i - 1];
      const expected =
        prev.level === "A1" && prev.difficulty === 10
          ? { level: "A2", difficulty: 1 }
          : { level: prev.level, difficulty: Math.min(10, prev.difficulty + 0.5) };
      expect({ level: stories[i].level, difficulty: stories[i].difficulty }, `${stories[i].id} (story ${i + 1})`).toEqual(expected);
    }
  });

  it("every difficulty is a multiple of 0.5 between 1 and 10", () => {
    for (const s of stories) {
      expect(s.difficulty * 2, s.id).toBe(Math.round(s.difficulty * 2));
      expect(s.difficulty).toBeGreaterThanOrEqual(1);
      expect(s.difficulty).toBeLessThanOrEqual(10);
    }
  });

  it("stays short enough for its difficulty", () => {
    for (const s of stories) expect(countWords(s.paragraphs), s.id).toBeLessThanOrEqual(Math.min(180, 70 + 30 * s.difficulty));
  });

  it("every story after the baseline carries a Dutch insight", () => {
    for (const s of stories.slice(BASELINE)) {
      expect(s.insight?.title.length ?? 0, `${s.id} needs an insight`).toBeGreaterThan(5);
      expect(s.insight?.text.length ?? 0, `${s.id} needs an insight`).toBeGreaterThan(40);
    }
  });
});

describe("names in new stories (docs/CURRICULUM.md)", () => {
  it("use no person's name other than Tom and Lisa", () => {
    const BASELINE = 8;
    const bad: string[] = [];
    for (const s of stories.slice(BASELINE)) {
      for (const p of s.paragraphs) {
        for (const t of tokenize(stripMarkup(p.nl))) {
          const e = t.word ? lookup(t.text) : undefined;
          if (e?.pos === "name" && e.en.endsWith("(a name)") && !["Tom", "Lisa"].includes(e.nl)) bad.push(`${e.nl} in ${s.id}`);
        }
      }
    }
    expect([...new Set(bad)], "Only Tom (man) and Lisa (woman) may be used; use a role (de ober, de buurman, …) for anyone else").toEqual([]);
  });
});

describe("web app icon and name", () => {
  it("ships the Home Screen icon, the manifest and its icons, and links them from the page", async () => {
    const { existsSync, readFileSync } = await import("node:fs");
    const html = readFileSync("index.html", "utf8");
    expect(html).toContain('rel="apple-touch-icon" href="./apple-touch-icon.png"');
    expect(html).toContain('name="apple-mobile-web-app-title" content="Dutch Class"');
    expect(html).toContain('rel="manifest" href="./manifest.webmanifest"');
    const png = (f: string) => {
      const b = readFileSync(`public/${f}`);
      expect(b.subarray(1, 4).toString("latin1"), f).toBe("PNG");
      return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    };
    expect(png("apple-touch-icon.png")).toEqual({ w: 180, h: 180 });
    const m = JSON.parse(readFileSync("public/manifest.webmanifest", "utf8"));
    expect(m.short_name).toBe("Dutch Class");
    expect(m.display).toBe("standalone");
    for (const icon of m.icons) {
      expect(existsSync(`public/${icon.src}`), icon.src).toBe(true);
      const { w, h } = png(icon.src);
      expect(`${w}x${h}`).toBe(icon.sizes);
    }
  });
});

describe("story titles", () => {
  it("English titles are direct translations", () => {
    const t = Object.fromEntries(stories.map((s) => [s.id, s.titleEn]));
    expect(t["een-dag-van-emma"]).toBe("A day of Emma");
    expect(t["konijn-wortel"]).toBe("The rabbit and the carrot");
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
