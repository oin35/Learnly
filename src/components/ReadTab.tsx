import { useEffect, useState } from "react";
import { stories } from "../data/stories";
import { useStore } from "../lib/store";
import { dueCards } from "../lib/srs";
import { streak } from "../lib/state";
import { StoryView } from "./StoryView";

export function ReadTab({ goTo }: { goTo: (tab: "saved" | "words") => void }) {
  const { state, dispatch } = useStore();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const next = stories.find((s) => !state.saved.includes(s.id) && !state.skipped.includes(s.id));
  const left = stories.filter((s) => !state.saved.includes(s.id) && !state.skipped.includes(s.id)).length;
  const now = Date.now();
  const due = dueCards(state.vocab, now).length;
  const days = streak(state.days, now);

  const strip = (
    <div className="today" aria-label="Today">
      <div className="stat">
        <strong>{days}</strong>
        <span>day streak 🔥</span>
      </div>
      <button className="stat stat-btn" onClick={() => goTo("words")}>
        <strong>{Object.keys(state.vocab).length}</strong>
        <span>words saved</span>
      </button>
      <button className="stat stat-btn" onClick={() => goTo("words")}>
        <strong>{due}</strong>
        <span>cards to review</span>
      </button>
    </div>
  );

  if (!next) {
    return (
      <div className="scroll">
        {strip}
        <div className="empty">
          <div className="empty-emoji" aria-hidden="true">🎉</div>
          <h2>You’ve seen every story!</h2>
          <p>New A1 stories are coming. Meanwhile, re-read your saved stories or revisit the ones you skipped.</p>
          <div className="empty-actions">
            <button className="btn btn-primary" onClick={() => goTo("saved")}>
              Open saved stories
            </button>
            {state.skipped.length > 0 && (
              <button className="btn btn-ghost" onClick={() => dispatch({ type: "resetSkipped" })}>
                Show {state.skipped.length} skipped {state.skipped.length === 1 ? "story" : "stories"} again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <StoryView
        key={next.id}
        story={next}
        mode="deck"
        header={
          <>
            {strip}
            <p className="left">
              {left} new {left === 1 ? "story" : "stories"} to read
            </p>
          </>
        }
        onLike={() => {
          dispatch({ type: "like", id: next.id, now: Date.now() });
          setToast(`Saved “${next.title}” ♥`);
        }}
        onSkip={() => {
          dispatch({ type: "skip", id: next.id, now: Date.now() });
          setToast("Skipped. Next story!");
        }}
      />
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  );
}
