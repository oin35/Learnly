import { useMemo, useState } from "react";
import { useStore } from "../lib/store";
import { KNOWN_AFTER, dueCards, level } from "../lib/srs";
import { displayWord } from "../data/dictionary";
import { canSpeak, speak } from "../lib/speech";
import { WordQuiz } from "./WordQuiz";
import { setSoundCheckOpen } from "../lib/ui";
import { Icon } from "./Icon";

export function WordsTab({ goRead }: { goRead: () => void }) {
  const { state, dispatch } = useStore();
  const [session, setSession] = useState<string[] | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "learning" | "known">("all");
  const [confirmReset, setConfirmReset] = useState(false);

  const cards = useMemo(() => Object.values(state.vocab).sort((a, b) => b.addedAt - a.addedAt), [state.vocab]);
  const due = dueCards(state.vocab, Date.now());

  if (session) return <WordQuiz ids={session} onExit={() => setSession(null)} />;

  const counts = { all: cards.length, learning: 0, known: 0 };
  for (const c of cards) counts[level(c)]++;
  const filtered = cards
    .filter((c) => filter === "all" || level(c) === filter)
    .filter((c) => !q.trim() || `${c.nl} ${c.en}`.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div className="scroll">
      <div className="page">
        <h1 className="page-title">Vocabulary</h1>

        {cards.length === 0 ? (
          <div className="empty">
            <div className="empty-emoji" aria-hidden="true">🔤</div>
            <h2>Your word list is empty</h2>
            <p>While reading, tap any word and choose “Save to vocabulary”. Your saved words become flashcards here.</p>
            <button className="btn btn-primary" onClick={goRead}>
              Start reading
            </button>
          </div>
        ) : (
          <>
            <div className="review-box">
              <div>
                <strong className="review-count">{due.length}</strong>
                <span className="muted"> {due.length === 1 ? "word" : "words"} due today</span>
                <div className="levels muted">
                  {counts.learning} learning · {counts.known} known
                </div>
              </div>
              <div className="review-actions">
                <button
                  className="btn btn-primary"
                  disabled={due.length === 0}
                  onClick={() => setSession(due.map((c) => c.id))}
                >
                  <Icon name="cards" size={18} /> Quiz me
                </button>
                <button className="btn btn-ghost" onClick={() => setSession(shuffle(cards.map((c) => c.id)))}>
                  Practice all
                </button>
              </div>
            </div>

            <div className="seg" role="group" aria-label="Show words">
              {(["all", "learning", "known"] as const).map((f) => (
                <button key={f} className={`seg-btn${filter === f ? " on" : ""}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f === "all" ? "All" : f === "learning" ? "Learning" : "Known"} <span className="seg-n">{counts[f]}</span>
                </button>
              ))}
            </div>

            <input
              className="search"
              type="search"
              placeholder="Search your words…"
              aria-label="Search your words"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <ul className="words">
              {filtered.map((c) => (
                <li className="word-row" key={c.id}>
                  <div className="word-row-main">
                    <span className="word-row-nl">{displayWord(c)}</span>
                    <span className="word-row-en">{c.en}</span>
                  </div>
                  {level(c) === "known" ? (
                    <span className="chip lvl-known">Known</span>
                  ) : (
                    <span className="dots" role="img" aria-label={`${Math.min(c.box, KNOWN_AFTER)} of ${KNOWN_AFTER} correct in a row`}>
                      {Array.from({ length: KNOWN_AFTER }, (_, i) => (
                        <span key={i} className={`dot${i < c.box ? " on" : ""}`} />
                      ))}
                    </span>
                  )}
                  {canSpeak() && (
                    <button className="icon-btn small" aria-label={`Listen to ${c.nl}`} onClick={() => speak(displayWord(c))}>
                      <Icon name="speaker" size={16} />
                    </button>
                  )}
                  <button
                    className="icon-btn small"
                    aria-label={`Remove ${c.nl}`}
                    onClick={() => dispatch({ type: "removeWord", id: c.id })}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="muted">{q.trim() ? `No words match “${q}”.` : filter === "known" ? "No known words yet. Answer a word correctly 3 times in a row." : "Nothing here."}</li>
              )}
            </ul>
          </>
        )}

        <p className="fineprint">
          Your progress is stored on this device only.{" "}
          <button className="link" onClick={() => setSoundCheckOpen(true)}>
            Sound check
          </button>{" "}
          ·{" "}
          {confirmReset ? (
            <>
              Reset saved stories, words and streak?{" "}
              <button
                className="link"
                onClick={() => {
                  dispatch({ type: "reset" });
                  setConfirmReset(false);
                }}
              >
                Yes, reset
              </button>{" "}
              ·{" "}
              <button className="link" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="link" onClick={() => setConfirmReset(true)}>
              Reset progress
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
