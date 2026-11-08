import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../lib/store";
import { displayWord } from "../data/dictionary";
import { canSpeak, speak } from "../lib/speech";
import { KNOWN_AFTER } from "../lib/srs";
import { buildQuiz, type Direction } from "../lib/quiz";
import { Icon } from "./Icon";

/** One review session: a 3-choice question per word. Wrong answers come back at the end of the queue. */
export function WordQuiz({ ids, onExit }: { ids: string[]; onExit: () => void }) {
  const { state, dispatch } = useStore();
  const [queue, setQueue] = useState<string[]>(ids);
  const [dir, setDir] = useState<Direction>("nl-en");
  const [picked, setPicked] = useState<number | null>(null);
  const [stats, setStats] = useState({ right: 0, wrong: 0 });
  const [graduated, setGraduated] = useState<string[]>([]);
  const [round, setRound] = useState(0); // advances only on "Continue", so a question never changes after it is answered

  const total = ids.length;
  const id = queue[0];
  const card = id ? state.vocab[id] : undefined;
  // Build the question once per round: the options must not move while the card's progress changes underneath
  const quiz = useMemo(() => (card ? buildQuiz(card, dir) : null), [id, dir, round]); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = useCallback(
    (i: number) => {
      if (!card || !quiz || picked !== null) return;
      const correct = i === quiz.answer;
      setPicked(i);
      setStats((s) => (correct ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 }));
      if (correct && card.box + 1 === KNOWN_AFTER) setGraduated((g) => [...g, displayWord(card)]);
      dispatch({ type: "review", id: card.id, correct, now: Date.now() });
    },
    [card, quiz, picked, dispatch],
  );

  const next = useCallback(() => {
    if (!id || !quiz || picked === null) return;
    const correct = picked === quiz.answer;
    setQueue((q) => (correct ? q.slice(1) : [...q.slice(1), id]));
    setPicked(null);
    setRound((r) => r + 1);
  }, [id, quiz, picked]);

  // Keyboard handler reads the latest state through a ref, so a key pressed right after a render is never lost
  const live = useRef({ picked, choose, next });
  live.current = { picked, choose, next };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { picked, choose, next } = live.current;
      if (picked === null && ["1", "2", "3"].includes(e.key)) choose(Number(e.key) - 1);
      else if (picked !== null && (e.key === "Enter" || e.key === " " || e.key === "ArrowRight")) {
        if (e.target instanceof HTMLElement && e.target.tagName === "BUTTON" && e.key !== "ArrowRight") return;
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!card || !quiz) {
    return (
      <div className="scroll">
        <div className="page">
          <div className="empty">
            <div className="empty-emoji" aria-hidden="true">{stats.wrong === 0 ? "🎉" : "💪"}</div>
            <h2>{total === 0 ? "Nothing to review" : "Session complete!"}</h2>
            {total > 0 && (
              <p>
                {total} {total === 1 ? "word" : "words"} reviewed
                {stats.wrong > 0 ? `, ${stats.wrong} needed another try.` : ", all correct on the first try."}
              </p>
            )}
            {graduated.length > 0 && (
              <p className="graduated">
                🎓 Now known: <strong>{graduated.join(", ")}</strong>
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

  const done = total - new Set(queue).size;
  const correctPick = picked !== null && picked === quiz.answer;
  const progress = Math.min(card.box, KNOWN_AFTER);

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
            disabled={picked !== null}
            onClick={() => setDir((d) => (d === "nl-en" ? "en-nl" : "nl-en"))}
          >
            {dir === "nl-en" ? "NL → EN" : "EN → NL"}
          </button>
        </div>
        <div className="progress" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${(done / total) * 100}%` }} />
        </div>

        <div className="wq-question">
          <div className="wq-word" lang={dir === "nl-en" ? "nl" : "en"}>
            {quiz.prompt}
          </div>
          {dir === "nl-en" && canSpeak() && (
            <button className="icon-btn" aria-label={`Listen to ${card.nl}`} onClick={() => speak(displayWord(card))}>
              <Icon name="speaker" size={22} />
            </button>
          )}
        </div>

        <div className="wq-options" role="group" aria-label="Choose the answer">
          {quiz.options.map((o, i) => {
            const state = picked === null ? "" : i === quiz.answer ? "correct" : i === picked ? "wrong" : "dim";
            return (
              <button key={o} className={`wq-opt ${state}`} disabled={picked !== null} onClick={() => choose(i)}>
                <kbd>{i + 1}</kbd>
                <span lang={dir === "nl-en" ? "en" : "nl"}>{o}</span>
                {picked !== null && i === quiz.answer && <Icon name="check" size={18} />}
                {picked !== null && i === picked && i !== quiz.answer && <Icon name="x" size={18} />}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="wq-feedback" role="status">
            <p className={correctPick ? "good" : "bad"}>
              {correctPick ? "Correct!" : `Not quite: ${dir === "nl-en" ? card.en : displayWord(card)}`}
            </p>
            {card.example && <p className="fc-example">“{card.example}”</p>}
            <p className="wq-progress">
              <span className="dots" aria-hidden="true">
                {Array.from({ length: KNOWN_AFTER }, (_, i) => (
                  <span key={i} className={`dot${i < progress ? " on" : ""}`} />
                ))}
              </span>
              {progress >= KNOWN_AFTER ? "Known! 🎓" : `${progress} of ${KNOWN_AFTER} correct in a row`}
            </p>
            <button className="btn btn-primary btn-block" onClick={next}>
              Continue <Icon name="arrow" size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
