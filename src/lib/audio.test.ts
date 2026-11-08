import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { stories } from "../data/stories";
import { pills } from "../data/pills";
import { dictionary } from "../data/dictionary";
import { displayWord } from "../data/dictionary";
import { audioId, normalizeClipText } from "./audioId";
import { stripMarkup } from "./text";
import audioIndex from "../data/audio-index.json";

const HOW = "Run `npm run audio:texts` and then scripts/make-audio.py (see README) to record the missing clips.";

/** Everything the app can ask to be spoken */
function spokenTexts(): string[] {
  const t: string[] = [];
  for (const s of stories) for (const p of s.paragraphs) t.push(stripMarkup(p.nl));
  for (const d of dictionary) t.push(displayWord(d));
  for (const p of pills) for (const e of p.examples) t.push(e.nl);
  return t.map(normalizeClipText);
}

describe("recorded audio", () => {
  it("gives stable, distinct ids", () => {
    expect(audioId("de wortel")).toBe(audioId("  de   wortel "));
    expect(audioId("de wortel")).not.toBe(audioId("het huis"));
    expect(audioId("de wortel")).toMatch(/^[0-9a-f]{14}$/);
    const ids = spokenTexts().map(audioId);
    expect(new Set(ids).size).toBe(new Set(spokenTexts()).size);
  });

  it("has a recorded clip for every story paragraph, word and grammar example", () => {
    const index = new Set<string>(audioIndex);
    const missing = [...new Set(spokenTexts())].filter((t) => !index.has(audioId(t)));
    expect(missing, HOW).toEqual([]);
  });

  it("every indexed clip exists on disk and is a real MP3", () => {
    for (const id of audioIndex) {
      const f = `public/audio/${id}.mp3`;
      expect(existsSync(f), f).toBe(true);
      const b = readFileSync(f);
      expect(b.length, f).toBeGreaterThan(2000);
      const isMp3 = b.subarray(0, 3).toString("latin1") === "ID3" || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0);
      expect(isMp3, `${f} is not an MP3`).toBe(true);
    }
  });

  it("has no stray audio files", () => {
    const index = new Set<string>(audioIndex);
    const stray = readdirSync("public/audio").filter((f) => f.endsWith(".mp3") && !index.has(f.replace(".mp3", "")));
    expect(stray).toEqual([]);
  });
});
