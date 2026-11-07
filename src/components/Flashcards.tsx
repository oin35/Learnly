import { useCallback, useEffect, useState } from "react";
import { useStore } from "../lib/store";
import { displayWord } from "../data/dictionary";
import { canSpeak, speak } from "../lib/speech";
import { Icon } from "./Icon";

type Direction = "nl-en" | "en-nl";

/** One review session over a fixed list of card ids. Wrong answers come back at the end of the queue. */
export function Flashcards({ ids, onExit }: { ids: string[]; onExit: () => void }) {
  const { state, dispatch } = useStore();
  const [queue, setQueue] = useState<string[]>(ids);
  const [flipped, setFlipped] = useState(false);
  const [dir, setDir] = useState<Direction>("nl-en");
  const [stats, setStats] = useState({ right: 0, wrong: 0 });

  const total = ids.length;
  const id = queue[0];
  const card = id ? state.vocab[id] : undefined;

  const answer = useCallback(
    (correct: boolean) => {
      if (!id) return;
      dispatch({ type: "review", id, correct, now: Date.now() });
      setStats((s) => (correct ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 }));
      setQueue((q) => (correct ? q.slice(1) : [...q.slice(1), id]));
      setFlipped(false);
    },
    [dispatch, id],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      if (e.key === " " || e.key === "Enter") {
        if (e.target instanceof HTMLElement && e.target.tagName === "BUTTON") return;
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && e.key === "1") answer(false);
      else if (flipped && e.key === "2") answer(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, answer]);

  if (!card) {
    const first = stats.wrong === 0;
    return (
      <div className="scroll">
        <div className="page">
          <div className="empty">
            <div className="empty-emoji" aria-hidden="true">{first ? "🎉" : "💪"}</div>
            <h2>{total === 0 ? "Nothing to review" : "Session complete!"}</h2>
            {total > 0 && (
              <p>
                {total} {total === 1 ? "card" : "cards"} reviewed
                {stats.wrong > 0 ? `, ${stats.wrong} needed another try.` : ", all correct on the first try."}
              </p>
            )}
            <button className="btn btn-primary" onClick={onExit}>
              Back to vocabulary
            </button>
          </div>
        </div>
      </div>
    );
  }

  const front = dir === "nl-en" ? displayWord(card) : card.en;
  const back = dir === "nl-en" ? card.en : displayWord(card);
  const done = total - new Set(queue).size;

  return (
    <div className="scroll">
      <div className="page">
        <div className="fc-top">
          <button className="btn btn-text" onClick={onExit}>
            <Icon name="back" size={18} /> Exit
          </button>
          <span className="muted" aria-live="polite">
            {done} / {total} done
          </span>
          <button
            className="btn btn-text"
            onClick={() => {
              setDir((d) => (d === "nl-en" ? "en-nl" : "nl-en"));
              setFlipped(false);
            }}
          >
            {dir === "nl-en" ? "NL → EN" : "EN → NL"}
          </button>
        </div>
        <div className="progress" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${(done / total) * 100}%` }} />
        </div>

        <div
          className={`flashcard${flipped ? " flipped" : ""}`}
          role="button"
          tabIndex={0}
          aria-label={flipped ? "Card back. Press space to flip." : "Card front. Press space to reveal the answer."}
          onClick={() => setFlipped((f) => !f)}
        >
          <div className="fc-label">{dir === "nl-en" ? "Dutch" : "English"}</div>
          <div className="fc-front">{front}</div>
          {flipped && (
            <>
              <hr />
              <div className="fc-label">{dir === "nl-en" ? "English" : "Dutch"}</div>
              <div className="fc-back">{back}</div>
              {card.example && <div className="fc-example">“{card.example}”</div>}
            </>
          )}
          {!flipped && <div className="fc-hint">Tap to reveal</div>}
        </div>

        {canSpeak() && (
          <div className="center">
            <button className="btn btn-ghost" onClick={() => speak(displayWord(card))}>
              <Icon name="speaker" size={18} /> Listen
            </button>
          </div>
        )}

        <div className="fc-actions">
          {flipped ? (
            <>
              <button className="btn btn-ghost" onClick={() => answer(false)}>
                Not yet <kbd>1</kbd>
              </button>
              <button className="btn btn-primary" onClick={() => answer(true)}>
                <Icon name="check" size={18} /> Got it <kbd>2</kbd>
              </button>
            </>
          ) : (
            <button className="btn btn-primary btn-block" onClick={() => setFlipped(true)}>
              <Icon name="flip" size={18} /> Show answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
