export type Segment =
  | { kind: "text"; text: string }
  | { kind: "pill"; text: string; pillId: string };

export type Token = { word: boolean; text: string };

const PILL_RE = /\{\{(.+?)\|([a-z0-9-]+)\}\}/g;
const WORD_RE = /[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*/gu;

/** Split a paragraph into plain text and grammar-pill segments. */
export function parseSegments(raw: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of raw.matchAll(PILL_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ kind: "text", text: raw.slice(last, idx) });
    out.push({ kind: "pill", text: m[1], pillId: m[2] });
    last = idx + m[0].length;
  }
  if (last < raw.length) out.push({ kind: "text", text: raw.slice(last) });
  return out;
}

/** Split text into word and non-word (punctuation / whitespace) tokens. */
export function tokenize(text: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of text.matchAll(WORD_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ word: false, text: text.slice(last, idx) });
    out.push({ word: true, text: m[0] });
    last = idx + m[0].length;
  }
  if (last < text.length) out.push({ word: false, text: text.slice(last) });
  return out;
}

/** Remove pill markup, leaving the plain Dutch sentence. */
export function stripMarkup(raw: string): string {
  return raw.replace(PILL_RE, "$1");
}

/** Number of words in the Dutch text of a story. */
export function countWords(paragraphs: { nl: string }[]): number {
  return paragraphs.reduce(
    (n, p) => n + tokenize(stripMarkup(p.nl)).filter((t) => t.word).length,
    0,
  );
}

/** Reading time in minutes for a beginner (about 60 words per minute). */
export function readingMinutes(paragraphs: { nl: string }[]): number {
  return Math.max(1, Math.ceil(countWords(paragraphs) / 60));
}

/** Find the sentence in `raw` (a paragraph) that contains the given word. */
export function sentenceWith(raw: string, word: string): string {
  const plain = stripMarkup(raw);
  const sentences = plain.match(/[^.!?]+[.!?]*["”]?/g) ?? [plain];
  const w = word.toLowerCase();
  const hit = sentences.find((s) =>
    tokenize(s).some((t) => t.word && t.text.toLowerCase() === w),
  );
  return (hit ?? plain).trim();
}
