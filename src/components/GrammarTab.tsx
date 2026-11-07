import { pills } from "../data/pills";
import { useStore } from "../lib/store";
import { PillBody } from "./PillBody";

export function GrammarTab() {
  const { state, dispatch } = useStore();
  const seen = state.pillsSeen.length;

  return (
    <div className="scroll">
      <div className="page">
        <h1 className="page-title">Grammar pills</h1>
        <p className="muted lead">
          Small, practical bites of grammar. Just enough to read, order, ask and get around. You’ve met {seen} of {pills.length} in your stories.
        </p>
        <div className="accordion">
          {pills.map((p) => {
            const isSeen = state.pillsSeen.includes(p.id);
            return (
              <details
                key={p.id}
                className="acc"
                onToggle={(e) => {
                  if ((e.currentTarget as HTMLDetailsElement).open) dispatch({ type: "pillSeen", id: p.id });
                }}
              >
                <summary>
                  <span className="capsule" aria-hidden="true" />
                  <span className="acc-title">{p.title}</span>
                  <span className="acc-sum">{p.summary}</span>
                  {!isSeen && <span className="chip chip-new">new</span>}
                </summary>
                <PillBody pill={p} />
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}
