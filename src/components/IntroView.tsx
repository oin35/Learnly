import { useEffect, useMemo, type ReactNode } from "react";
import type { Story } from "../types";
import { displayWord } from "../data/dictionary";
import { pillById } from "../data/pills";
import { introWords } from "../lib/intro";
import { useStore } from "../lib/store";
import { canSpeak, speak, speakAll } from "../lib/speech";
import { formatDifficulty, readingMinutes } from "../lib/text";
import { Icon } from "./Icon";
import { PillBody } from "./PillBody";

interface Props {
  story: Story;
  mode: "deck" | "saved";
  header?: ReactNode;
  onSkip?: () => void;
  onBack?: () => void;
  onStart: () => void;
}

/** Entry page: a few key words (with pronunciation) and 1–2 grammar pills, before the story itself. */
export function IntroView({ story, mode, header, onSkip, onBack, onStart }: Props) {
  const { state, dispatch } = useStore();
  const words = useMemo(() => introWords(story), [story]);
  const pills = story.intro.pills.map((id) => pillById.get(id)).filter((p) => p !== undefined);
  const speech = canSpeak();

  useEffect(() => {
    for (const id of story.intro.pills) dispatch({ type: "pillSeen", id });
  }, [story, dispatch]);

  return (
    <>
      <div className="scroll">
        {header}
        <div className="intro">
          {mode === "saved" && onBack && (
            <button className="btn btn-text" onClick={onBack}>
              <Icon name="back" size={18} /> Saved stories
            </button>
          )}
          <p className="eyebrow">Before you read</p>
          <div className="intro-head">
            <span className="intro-emoji" aria-hidden="true">
              {story.emoji}
            </span>
            <div>
              <h1 className="intro-title">{story.title}</h1>
              <p className="story-sub">
                {story.titleEn} · Difficulty {formatDifficulty(story.difficulty)} · {story.topic} · {readingMinutes(story.paragraphs)} min read
              </p>
            </div>
          </div>

          <section aria-labelledby="kw-heading">
            <div className="section-head">
              <h2 id="kw-heading" className="section-title">
                {words.length} words to know
              </h2>
              {speech && (
                <button className="btn btn-ghost btn-small" onClick={() => speakAll(words.map((w) => displayWord(w.entry)))}>
                  <Icon name="speaker" size={16} /> Play all
                </button>
              )}
            </div>
            <ul className="kw-list">
              {words.map((w) => {
                const saved = Boolean(state.vocab[w.id]);
                const label = displayWord(w.entry);
                return (
                  <li className="kw" key={w.id}>
                    {speech ? (
                      <button className="kw-play" aria-label={`Listen: ${label}`} onClick={() => speak(label)}>
                        <Icon name="speaker" size={22} />
                      </button>
                    ) : (
                      <span className="kw-play off" aria-hidden="true" />
                    )}
                    <div className="kw-main">
                      <span className="kw-nl" lang="nl">
                        {label}
                      </span>
                      <span className="kw-en">{w.entry.en}</span>
                      {w.example && (
                        <span className="kw-ex" lang="nl">
                          “{w.example}”
                        </span>
                      )}
                    </div>
                    <button
                      className={`icon-btn${saved ? " on" : ""}`}
                      aria-label={saved ? `Remove ${w.entry.nl} from vocabulary` : `Save ${w.entry.nl} to vocabulary`}
                      aria-pressed={saved}
                      onClick={() =>
                        saved
                          ? dispatch({ type: "removeWord", id: w.id })
                          : dispatch({
                              type: "addWord",
                              now: Date.now(),
                              word: {
                                id: w.id,
                                nl: w.entry.nl,
                                en: w.entry.en,
                                pos: w.entry.pos,
                                article: w.entry.article,
                                example: w.example || undefined,
                                storyId: story.id,
                              },
                            })
                      }
                    >
                      <Icon name={saved ? "check" : "plus"} size={20} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="gp-heading">
            <h2 id="gp-heading" className="section-title">
              {pills.length === 1 ? "Key grammar pill" : `${pills.length} key grammar pills`}
            </h2>
            <div className="intro-pills">
              {pills.map((p) => (
                <div className="intro-pill" key={p.id}>
                  <PillBody pill={p} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="actionbar">
        {mode === "deck" ? (
          <button className="btn btn-ghost" onClick={onSkip}>
            <Icon name="skip" size={18} /> Skip
          </button>
        ) : (
          <button className="btn btn-ghost" onClick={onBack}>
            <Icon name="back" size={18} /> Back
          </button>
        )}
        <button className="btn btn-primary" onClick={onStart}>
          To the story <Icon name="arrow" size={18} />
        </button>
      </div>
    </>
  );
}
