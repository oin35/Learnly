import type { DictEntry, Story } from "../types";
import { entryById, lookup, entryId } from "../data/dictionary";
import { sentenceWith, stripMarkup, tokenize } from "./text";

export interface IntroWord {
  id: string;
  entry: DictEntry;
  /** The form as it appears in the story */
  token: string;
  /** Example sentence from the story containing the word */
  example: string;
  paragraph: string;
}

/** Resolve the key words of a story's entry page, with an example sentence taken from the story. */
export function introWords(story: Story): IntroWord[] {
  const out: IntroWord[] = [];
  for (const id of story.intro.words) {
    const entry = entryById(id);
    if (!entry) continue;
    let token = entry.nl;
    let paragraph = "";
    outer: for (const p of story.paragraphs) {
      for (const t of tokenize(stripMarkup(p.nl))) {
        if (t.word && lookup(t.text) && entryId(lookup(t.text)!) === id) {
          token = t.text;
          paragraph = p.nl;
          break outer;
        }
      }
    }
    out.push({ id, entry, token, paragraph, example: paragraph ? sentenceWith(paragraph, token) : "" });
  }
  return out;
}
