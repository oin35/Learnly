import { useMemo, useState } from "react";
import type { Pill } from "../types";
import { pills } from "../data/pills";
import { useStore } from "../lib/store";
import { FavStar } from "./FavStar";
import { Icon } from "./Icon";
import { PillBody } from "./PillBody";

const haystack = (p: Pill) =>
  [p.title, p.summary, ...p.points, ...p.examples.flatMap((e) => [e.nl, e.en]), p.tip ?? ""].join(" ").toLowerCase();

export function GrammarTab() {
  const { state, dispatch } = useStore();
  const [q, setQ] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const seen = state.pillsSeen.length;
  const favs = state.favPills.length;

  const index = useMemo(() => new Map(pills.map((p) => [p.id, haystack(p)])), []);
  const needle = q.trim().toLowerCase();
  const shown = pills.filter((p) => (!favOnly || state.favPills.includes(p.id)) && (!needle || index.get(p.id)!.includes(needle)));

  return (
    <div className="scroll">
      <div className="page">
        <div className="title-row">
          <h1 className="page-title">Grammar pills</h1>
          <button
            className={`fav-filter${favOnly ? " on" : ""}`}
            aria-pressed={favOnly}
            aria-label={favOnly ? "Showing favorite grammar pills. Tap to show all." : "Show favorite grammar pills"}
            onClick={() => setFavOnly((v) => !v)}
          >
            <Icon name="star" size={20} fill={favOnly} /> <span>{favs}</span>
          </button>
        </div>
        <p className="muted lead">
          Small, practical bites of grammar. Just enough to read, order, ask and get around. You’ve met {seen} of {pills.length} in your stories.
        </p>

        <input
          className="search"
          type="search"
          placeholder="Search grammar pills…"
          aria-label="Search grammar pills"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="accordion">
          {shown.map((p) => {
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
                  {!isSeen && <span className="chip chip-new">new</span>}
                  <span className="acc-star">
                    <FavStar pillId={p.id} title={p.title} />
                  </span>
                  <span className="acc-sum">{p.summary}</span>
                </summary>
                <PillBody pill={p} />
              </details>
            );
          })}
          {shown.length === 0 && (
            <p className="muted empty-note">
              {favOnly && !needle
                ? "No favorites yet. Tap the star on a pill to save it here."
                : `No grammar pills match “${q}”${favOnly ? " in your favorites" : ""}.`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
