import { useState } from "react";
import { stories } from "../data/stories";
import { levelSteps, rankLabel, rankOf, unreadStories } from "../lib/deck";
import { useStore } from "../lib/store";
import { Sheet } from "./Sheet";

/** Choose the level to read at: slide up to jump ahead, back down for easier stories. */
export function LevelSheet({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useStore();
  const steps = levelSteps(stories);
  // start the slider on the current choice (the highest step that is not above it)
  const [index, setIndex] = useState(() => Math.max(0, steps.findLastIndex((r) => r <= state.startRank)));
  const rank = steps[index];

  const unread = unreadStories(stories, state);
  const easier = unread.filter((s) => rankOf(s) < rank).length;
  const next = unread.find((s) => rankOf(s) >= rank);

  return (
    <Sheet label="Choose your level" onClose={onClose}>
      <div className="lv">
        <h2 className="pill-title">Choose your level</h2>
        <p className="muted">
          Start reading where it feels right. Slide up to jump ahead, or back down for easier stories. Nothing is lost: stories you jump over stay unread.
        </p>
        <div className="lv-now">
          <strong>{rankLabel(rank)}</strong>
          <span>{easier === 0 ? "No stories are jumped over" : `${easier} easier ${easier === 1 ? "story stays" : "stories stay"} unread`}</span>
        </div>
        <input
          id="level-slider"
          type="range"
          min={0}
          max={steps.length - 1}
          step={1}
          value={index}
          aria-label="Level"
          aria-valuetext={rankLabel(rank)}
          onChange={(e) => setIndex(Number(e.target.value))}
        />
        <div className="lv-scale">
          <span>{rankLabel(steps[0])} easiest</span>
          <span>{rankLabel(steps[steps.length - 1])} hardest so far</span>
        </div>
        <div className="lv-next">
          {next ? (
            <>
              <span className="lv-emoji" aria-hidden="true">
                {next.emoji}
              </span>
              <span>
                <small>Your next story</small>
                <strong lang="nl">{next.title}</strong>
              </span>
            </>
          ) : (
            <span>
              <small>Nothing unread at this level</small>
              <strong>You’ll get the easier unread stories</strong>
            </span>
          )}
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            dispatch({ type: "setStartRank", rank: index === 0 ? 0 : rank });
            onClose();
          }}
        >
          Start here
        </button>
      </div>
    </Sheet>
  );
}
