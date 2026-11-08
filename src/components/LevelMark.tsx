import { useState } from "react";
import type { Level } from "../types";
import { formatDifficulty, tickStates } from "../lib/text";
import { Sheet } from "./Sheet";

const NAMES: Record<Level, string> = { A1: "beginner", A2: "elementary" };

/**
 * A quiet mark that sits on a story title like a footnote:
 *  - the level (A1 / A2) as a tiny tag, the clearer part,
 *  - under it a hairline "ruler" of 10 ticks that fills up with the difficulty (2.5 = two and a half ticks), much fainter.
 * It takes the title's size (em units). Tap it for a short explanation.
 */
export function LevelMark({ level, difficulty, interactive = true }: { level: Level; difficulty: number; interactive?: boolean }) {
  const [open, setOpen] = useState(false);
  const label = `Level ${level}, difficulty ${formatDifficulty(difficulty)} out of 10`;
  const body = (
    <>
      <span className="lvl-tag" data-level={level} />
      <span className="lvl-ruler" aria-hidden="true">
        {tickStates(difficulty).map((t, i) => (
          <i key={i} className={`tick t-${t}`} />
        ))}
      </span>
    </>
  );

  if (!interactive) {
    return (
      <span className={`lvl lvl-${level.toLowerCase()}`} role="img" aria-label={label}>
        {body}
      </span>
    );
  }
  return (
    <>
      <button className={`lvl lvl-${level.toLowerCase()}`} aria-label={`${label}. Tap for an explanation.`} onClick={() => setOpen(true)}>
        {body}
      </button>
      {open && (
        <Sheet label="About this level mark" onClose={() => setOpen(false)}>
          <h2 className="pill-title">
            {level} · difficulty {formatDifficulty(difficulty)} of 10
          </h2>
          <p className="pill-summary">
            {level} is the {NAMES[level]} level
          </p>
          <ul className="pill-points">
            <li>
              The letters are the European CEFR level: <strong>A1</strong> (beginner), then <strong>A2</strong> (elementary).
            </li>
            <li>The tiny ruler under them shows how hard this story is <em>inside</em> its level, from 1 to 10.</li>
            <li>The levels overlap a little: the top of A1 is about as hard as the start of A2.</li>
          </ul>
        </Sheet>
      )}
    </>
  );
}

/**
 * A title with its level mark glued to the last word, so the mark can never be left alone on a line.
 * The "A1" letters are drawn by CSS, so the title's text (for tests and copy/paste) is exactly the title.
 */
export function MarkedTitle({ title, level, difficulty, interactive = true }: { title: string; level: Level; difficulty: number; interactive?: boolean }) {
  const i = title.lastIndexOf(" ");
  return (
    <>
      {title.slice(0, i + 1)}
      <span className="nw">
        {title.slice(i + 1)}
        <LevelMark level={level} difficulty={difficulty} interactive={interactive} />
      </span>
    </>
  );
}
