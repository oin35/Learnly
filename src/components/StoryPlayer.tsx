import type { useNarration } from "../lib/narration";
import { Icon } from "./Icon";

type Narration = ReturnType<typeof useNarration>;

/** Read-aloud controls for the whole story. */
export function StoryPlayer({ n, total }: { n: Narration; total: number }) {
  if (!n.supported) {
    return (
      <p className="hint player-note">This browser can’t read aloud. Try Safari or Chrome to hear the story.</p>
    );
  }
  const idle = n.status === "idle";
  return (
    <div className="player" role="group" aria-label="Read the story aloud">
      <div className="player-row">
        {idle ? (
          <button className="btn btn-primary" onClick={() => n.play(0)}>
            <Icon name="play" size={18} fill /> Listen to the story
          </button>
        ) : (
          <>
            {n.status === "playing" ? (
              <button className="btn btn-primary" onClick={n.pause} aria-label="Pause">
                <Icon name="pause" size={18} fill /> Pause
              </button>
            ) : (
              <button className="btn btn-primary" onClick={n.resume} aria-label="Resume">
                <Icon name="play" size={18} fill /> Resume
              </button>
            )}
            <button className="btn btn-ghost" onClick={n.stop} aria-label="Stop">
              <Icon name="stop" size={16} fill /> Stop
            </button>
          </>
        )}
        <label className="switch player-slow">
          <input type="checkbox" checked={n.slow} onChange={n.toggleSlow} />
          <span>Slow</span>
        </label>
      </div>
      <p className="player-status" aria-live="polite">
        {idle ? "No sound? Switch off Silent mode and turn up the volume." : `Paragraph ${Math.max(1, n.index + 1)} of ${total}`}
      </p>
    </div>
  );
}
