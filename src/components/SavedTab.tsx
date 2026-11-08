import { useState } from "react";
import { stories } from "../data/stories";
import { useStore } from "../lib/store";
import { readingMinutes } from "../lib/text";
import { MarkedTitle } from "./LevelMark";
import { StoryView } from "./StoryView";

export function SavedTab({ goRead }: { goRead: () => void }) {
  const { state, dispatch } = useStore();
  const [openId, setOpenId] = useState<string | null>(null);

  const open = openId ? stories.find((s) => s.id === openId) : undefined;
  if (open) {
    return (
      <StoryView
        key={open.id}
        story={open}
        mode="saved"
        onBack={() => setOpenId(null)}
        onUnsave={() => {
          dispatch({ type: "unsave", id: open.id });
          setOpenId(null);
        }}
      />
    );
  }

  const saved = state.saved.map((id) => stories.find((s) => s.id === id)).filter((s) => s !== undefined);

  return (
    <div className="scroll">
      <div className="page">
        <h1 className="page-title">Saved stories</h1>
        {saved.length === 0 ? (
          <div className="empty">
            <div className="empty-emoji" aria-hidden="true">♥</div>
            <h2>Nothing saved yet</h2>
            <p>Tap “Like &amp; save” on a story you enjoy and it will show up here to re-read any time.</p>
            <button className="btn btn-primary" onClick={goRead}>
              Find a story
            </button>
          </div>
        ) : (
          <ul className="cards">
            {saved.map((s) => {
              const q = state.quiz[s.id];
              return (
                <li key={s.id}>
                  <button className="card story-card" onClick={() => setOpenId(s.id)}>
                    <span className="story-card-emoji" aria-hidden="true">{s.emoji}</span>
                    <span className="story-card-main">
                      <span className="story-card-title">
                        <MarkedTitle title={s.title} level={s.level} difficulty={s.difficulty} />
                      </span>
                      <span className="story-card-sub">{s.titleEn}</span>
                      <span className="story-card-meta">
                        {s.topic} · {readingMinutes(s.paragraphs)} min
                        {q ? ` · quiz ${q.score}/${q.total}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
