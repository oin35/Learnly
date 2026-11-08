/**
 * Lists every Dutch text the app speaks, keyed by clip id → scripts/audio/texts.json.
 * Run: npm run audio:texts   (then: python3 scripts/make-audio.py --model <voice.onnx>)
 */
import { writeFileSync } from "node:fs";
import { stories } from "../src/data/stories";
import { pills } from "../src/data/pills";
import { dictionary, displayWord } from "../src/data/dictionary";
import { stripMarkup } from "../src/lib/text";
import { audioId, normalizeClipText } from "../src/lib/audioId";

export const SOUND_CHECK_TEXT = "Hallo, dit is een test.";

const texts = new Set<string>();
for (const s of stories) for (const p of s.paragraphs) texts.add(normalizeClipText(stripMarkup(p.nl)));
for (const d of dictionary) texts.add(normalizeClipText(displayWord(d)));
for (const p of pills) for (const ex of p.examples) texts.add(normalizeClipText(ex.nl));
texts.add(SOUND_CHECK_TEXT);

const out: Record<string, string> = {};
for (const t of [...texts].sort()) {
  const id = audioId(t);
  if (out[id] && out[id] !== t) throw new Error(`Clip id collision: ${id}`);
  out[id] = t;
}
writeFileSync(new URL("./audio/texts.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log(`${Object.keys(out).length} clips, ${Object.values(out).reduce((n, t) => n + t.length, 0)} characters`);
