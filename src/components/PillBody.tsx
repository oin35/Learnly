import type { Pill } from "../types";
import { speak, canSpeak } from "../lib/speech";
import { Icon } from "./Icon";

export function PillBody({ pill }: { pill: Pill }) {
  return (
    <div className="pill-body">
      <h2 className="pill-title">
        <span className="capsule" aria-hidden="true" /> {pill.title}
      </h2>
      <p className="pill-summary">{pill.summary}</p>
      <ul className="pill-points">
        {pill.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="pill-examples">
        {pill.examples.map((ex) => (
          <div className="example" key={ex.nl}>
            <div className="example-nl">
              {ex.nl}
              {canSpeak() && (
                <button className="icon-btn small" aria-label={`Listen: ${ex.nl}`} onClick={() => speak(ex.nl)}>
                  <Icon name="speaker" size={16} />
                </button>
              )}
            </div>
            <div className="example-en">{ex.en}</div>
          </div>
        ))}
      </div>
      {pill.tip && <p className="pill-tip">💡 {pill.tip}</p>}
    </div>
  );
}
