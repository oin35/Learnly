import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { stories } from "../data/stories";
import { pills } from "../data/pills";
import { dictionary, displayWord } from "../data/dictionary";
import { audioId, normalizeClipText } from "./audioId";
import { stripMarkup } from "./text";
import audioIndexJson from "../data/audio-index.json";

interface AudioIndex {
  packs: string[];
  clips: Record<string, [number, number, number]>;
}
const audioIndex = audioIndexJson as unknown as AudioIndex;

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
    const missing = [...new Set(spokenTexts())].filter((t) => !(audioId(t) in audioIndex.clips));
    expect(missing, HOW).toEqual([]);
  });

  it("every pack file exists, and every clip lies inside its pack as a real, non-overlapping MP3", () => {
    const packs = audioIndex.packs.map((name) => {
      const f = `public/audio/${name}`;
      expect(existsSync(f), f).toBe(true);
      return readFileSync(f);
    });
    const byPack = new Map<number, [number, number, string][]>();
    for (const [id, [pack, offset, length]] of Object.entries(audioIndex.clips)) {
      expect(pack, id).toBeLessThan(packs.length);
      expect(length, id).toBeGreaterThan(2000);
      expect(offset + length, `${id} runs past the end of its pack`).toBeLessThanOrEqual(packs[pack].length);
      const head = packs[pack].subarray(offset, offset + 3);
      const isMp3 = head.toString("latin1") === "ID3" || (head[0] === 0xff && (head[1] & 0xe0) === 0xe0);
      expect(isMp3, `${id} does not start like an MP3`).toBe(true);
      byPack.set(pack, [...(byPack.get(pack) ?? []), [offset, length, id]]);
    }
    for (const [pack, list] of byPack) {
      const sorted = [...list].sort((a, b) => a[0] - b[0]);
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i][0], `clips ${sorted[i - 1][2]} and ${sorted[i][2]} overlap in pack ${pack}`).toBeGreaterThanOrEqual(sorted[i - 1][0] + sorted[i - 1][1]);
      }
    }
  });

  it("has no stray audio files", () => {
    const known = new Set(audioIndex.packs);
    const stray = readdirSync("public/audio").filter((f) => !known.has(f));
    expect(stray).toEqual([]);
  });
});
