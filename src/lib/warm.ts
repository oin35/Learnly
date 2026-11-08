import type { Story } from "../types";
import { dictionary, displayWord, entryById, lookup } from "../data/dictionary";
import { pillById } from "../data/pills";
import { parseSegments, stripMarkup, tokenize } from "./text";

/** Texts of a story's clips, most urgent first: key words, paragraphs, every word in the story, grammar examples. */
export function storyClipTexts(story: Story): string[] {
  const out: string[] = [];
  for (const id of story.intro.words) {
    const e = entryById(id);
    if (e) out.push(displayWord(e));
  }
  for (const p of story.paragraphs) out.push(stripMarkup(p.nl));
  const pillIds = new Set(story.intro.pills);
  for (const p of story.paragraphs) {
    for (const seg of parseSegments(p.nl)) if (seg.kind === "pill") pillIds.add(seg.pillId);
    for (const t of tokenize(stripMarkup(p.nl))) {
      const e = t.word ? lookup(t.text) : undefined;
      if (e) out.push(displayWord(e));
    }
  }
  for (const id of pillIds) for (const ex of pillById.get(id)?.examples ?? []) out.push(ex.nl);
  return [...new Set(out)];
}

/** Everything else, for background loading once the current story is covered. */
export function allClipTexts(): string[] {
  return dictionary.map(displayWord);
}
