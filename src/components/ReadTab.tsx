import { useEffect, useState } from "react";
import { stories } from "../data/stories";
import { useStore } from "../lib/store";
import { streak } from "../lib/state";
import { nextStory, unreadStories } from "../lib/deck";
import { Icon } from "./Icon";
import { LevelSheet } from "./LevelSheet";
import { StoryView } from "./StoryView";

export function ReadTab({ goTo }: { goTo: (tab: "saved" | "words") => void }) {
  const { state, dispatch } = useStore();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const [levelOpen, setLevelOpen] = useState(false);
  const next = nextStory(stories, state);
  const left = unreadStories(stories, state).length;
  const again = next ? state.saved.includes(next.id) : false; // rolled back to a story that was saved before
  const now = Date.now();
  const days = streak(state.days, now);

  const strip = (
    <div className="today" aria-label="Your progress">
      <div className="stat">
        <strong>{days}</strong>
        <span>day streak</span>
      </div>
      <button className="stat stat-btn" onClick={() => goTo("words")}>
        <strong>{Object.keys(state.vocab).length}</strong>
        <span>words saved</span>
      </button>
      <button className="stat stat-btn" onClick={() => goTo("saved")}>
        <strong>{state.saved.length}</strong>
        <span>stories saved</span>
      </button>
      <div className="stat">
        <strong>{state.read.length}</strong>
        <span>stories read</span>
      </div>
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
        saved={again}
        header={
          <>
            {strip}
            <button
              className={`left lvl-${next.level.toLowerCase()}`}
              aria-label={`${left} new ${left === 1 ? "story" : "stories"} to read. Choose your level.`}
              onClick={() => setLevelOpen(true)}
            >
              <span>
                {left} new {left === 1 ? "story" : "stories"} to read
              </span>
              <Icon name="sliders" size={16} />
            </button>
          </>
        }
        onLike={() => {
          dispatch({ type: "like", id: next.id, now: Date.now() });
          setToast(again ? "Next story!" : `Saved “${next.title}” ♥`);
        }}
        onSkip={() => {
          dispatch({ type: "skip", id: next.id, now: Date.now() });
          setToast(again ? "Next story!" : "Skipped. Next story!");
        }}
      />
      {levelOpen && <LevelSheet onClose={() => setLevelOpen(false)} />}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  );
}
