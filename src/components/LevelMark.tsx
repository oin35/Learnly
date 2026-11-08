import type { Level } from "../types";
import { formatDifficulty, tickStates } from "../lib/text";

/**
 * A quiet mark that sits on a story title like a footnote:
 *  - the level (A1 / A2) as a tiny tag, the clearer part (its letters are drawn by CSS),
 *  - under it a hairline "ruler" of 10 ticks that fills up with the difficulty (2.5 = two and a half ticks), much fainter.
 * It takes the title's size (em units). It is only a label: not clickable.
 */
export function LevelMark({ level, difficulty }: { level: Level; difficulty: number }) {
  return (
    <span className={`lvl lvl-${level.toLowerCase()}`} role="img" aria-label={`Level ${level}, difficulty ${formatDifficulty(difficulty)} out of 10`}>
      <span className="lvl-tag" data-level={level} />
      <span className="lvl-ruler" aria-hidden="true">
        {tickStates(difficulty).map((t, i) => (
          <i key={i} className={`tick t-${t}`} />
        ))}
      </span>
    </span>
  );
}

/**
 * A title with its level mark glued to the last word, so the mark can never be left alone on a line.
 * The "A1" letters are drawn by CSS, so the title's text (for tests and copy/paste) is exactly the title.
 */
export function MarkedTitle({ title, level, difficulty }: { title: string; level: Level; difficulty: number }) {
  const i = title.lastIndexOf(" ");
  return (
    <>
      {title.slice(0, i + 1)}
      <span className="nw">
        {title.slice(i + 1)}
        <LevelMark level={level} difficulty={difficulty} />
      </span>
    </>
  );
}
