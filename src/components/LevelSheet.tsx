import { useState } from "react";
import { stories } from "../data/stories";
import { levelPlan, levelSteps, nextStory, rankLabel, rankOf } from "../lib/deck";
import { useStore } from "../lib/store";
import { Sheet } from "./Sheet";

/** Choose the level to read at: slide up to jump ahead, back down for easier stories. */
export function LevelSheet({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useStore();
  const steps = levelSteps(stories);
  // the slider starts where the reader is now: at the level of the story on the main screen
  const current = nextStory(stories, state);
  const [here] = useState(() => (current ? Math.max(0, steps.indexOf(rankOf(current))) : steps.length - 1));
  const [index, setIndex] = useState(here);
  const rank = steps[index];
  const moved = index !== here || !current;

  const plan = levelPlan(stories, state, rank);
  const next = moved ? plan.next : current;
  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
  const notes = [
    plan.back > 0 && `${plural(plan.back, "story comes", "stories come")} back`,
    plan.easier > 0 && `${plural(plan.easier, "easier story stays", "easier stories stay")} unread`,
  ].filter(Boolean);
  const note = !moved ? "You are here now" : notes.length ? notes.join(" · ") : "No stories are jumped over";

  return (
    <Sheet label="Choose your level" onClose={onClose}>
      <div className="lv">
        <h2 className="pill-title">Choose your level</h2>
        <p className="muted">
          Start reading where it feels right. Slide up to jump ahead, or back down to read easier stories again. Nothing is lost: stories you jump over stay unread, and your saved stories stay saved.
        </p>
        <div className="lv-now">
          <strong>{rankLabel(rank)}</strong>
          <span>{note}</span>
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
            if (moved) dispatch({ type: "setStartRank", rank: index === 0 ? 0 : rank, unskip: plan.unskip, again: plan.again });
            onClose();
          }}
        >
          Start here
        </button>
      </div>
    </Sheet>
  );
}
