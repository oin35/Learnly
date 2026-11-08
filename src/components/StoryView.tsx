import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Story } from "../types";
import { lookup, entryId } from "../data/dictionary";
import { pillById } from "../data/pills";
import { parseSegments, readingMinutes, stripMarkup, tokenize, countWords } from "../lib/text";
import { useStore } from "../lib/store";
import { stopSpeaking, warmClips } from "../lib/speech";
import { storyClipTexts } from "../lib/warm";
import { useNarration } from "../lib/narration";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";
import { PillBody } from "./PillBody";
import { WordSheet } from "./WordSheet";
import { Quiz } from "./Quiz";
import { IntroView } from "./IntroView";
import { StoryPlayer } from "./StoryPlayer";
import { formatDifficulty } from "../lib/text";

type Selection = { kind: "word"; token: string; paragraph: string } | { kind: "pill"; id: string } | null;

interface Props {
  story: Story;
  mode: "deck" | "saved";
  /** Shown above the entry page (e.g. today's stats) */
  header?: ReactNode;
  onSkip?: () => void;
  onLike?: () => void;
  onBack?: () => void;
  onUnsave?: () => void;
}

function Words({
  text,
  paragraph,
  onWord,
}: {
  text: string;
  paragraph: string;
  onWord: (token: string, paragraph: string) => void;
}) {
  const { state } = useStore();
  return (
    <>
      {tokenize(text).map((t, i) => {
        if (!t.word) return <span key={i}>{t.text}</span>;
        const entry = lookup(t.text);
        const saved = entry ? Boolean(state.vocab[entryId(entry)]) : false;
        return (
          <button key={i} className={`w${saved ? " saved" : ""}`} onClick={() => onWord(t.text, paragraph)}>
            {t.text}
          </button>
        );
      })}
    </>
  );
}

export function StoryView({ story, mode, header, onSkip, onLike, onBack, onUnsave }: Props) {
  const { dispatch } = useStore();
  const [phase, setPhase] = useState<"intro" | "story">("intro");
  const [showEn, setShowEn] = useState(false);
  const [sel, setSel] = useState<Selection>(null);
  const minutes = readingMinutes(story.paragraphs);
  const texts = useMemo(() => story.paragraphs.map((p) => stripMarkup(p.nl)), [story]);
  const narration = useNarration(texts);
  useEffect(() => warmClips(storyClipTexts(story)), [story]);

  const openPill = (id: string) => {
    dispatch({ type: "pillSeen", id });
    setSel({ kind: "pill", id });
  };
  const openWord = (token: string, paragraph: string) => setSel({ kind: "word", token, paragraph });
  const close = () => setSel(null);

  const pill = sel?.kind === "pill" ? pillById.get(sel.id) : undefined;

  if (phase === "intro") {
    return (
      <IntroView
        story={story}
        mode={mode}
        header={header}
        onSkip={onSkip}
        onBack={onBack}
        onStart={() => {
          stopSpeaking();
          setPhase("story");
        }}
      />
    );
  }

  return (
    <>
      <div className="scroll">
        <article className="story">
          {mode === "saved" && onBack && (
            <button className="btn btn-text" onClick={onBack}>
              <Icon name="back" size={18} /> Saved stories
            </button>
          )}
          <div className="story-emoji" aria-hidden="true">
            {story.emoji}
          </div>
          <p className="eyebrow">
            {story.level} · Difficulty {formatDifficulty(story.difficulty)} · {story.topic} · {minutes} min read · {countWords(story.paragraphs)} words
          </p>
          <h1 className="story-title">{story.title}</h1>
          <p className="story-sub">{story.titleEn}</p>

          <div className="story-tools">
            <button className="btn btn-text" onClick={() => setPhase("intro")}>
              <Icon name="back" size={18} /> Key words &amp; grammar
            </button>
            <label className="switch">
              <input type="checkbox" checked={showEn} onChange={(e) => setShowEn(e.target.checked)} />
              <span>Show English</span>
            </label>
            <p className="hint">
              Tap a word for its meaning. Tap the <span className="capsule" aria-hidden="true" /> capsule for a grammar pill.
            </p>
          </div>

          <StoryPlayer n={narration} total={story.paragraphs.length} />

          <div className="story-text" lang="nl">
            {story.paragraphs.map((p, pi) => (
              <div
                className={`para${narration.status !== "idle" && narration.index === pi ? " speaking" : ""}`}
                key={pi}
              >
                <p>
                  {parseSegments(p.nl).map((seg, si) =>
                    seg.kind === "text" ? (
                      <Words key={si} text={seg.text} paragraph={p.nl} onWord={openWord} />
                    ) : (
                      <span className="pillspan" key={si}>
                        <Words text={seg.text} paragraph={p.nl} onWord={openWord} />
                        <button
                          className="pillbadge"
                          aria-label={`Grammar pill: ${pillById.get(seg.pillId)?.title ?? seg.pillId}`}
                          onClick={() => openPill(seg.pillId)}
                        >
                          <span className="capsule" aria-hidden="true" />
                        </button>
                      </span>
                    ),
                  )}
                  {narration.supported && (
                    <button
                      className="icon-btn small para-audio"
                      aria-label={`Listen to paragraph ${pi + 1}`}
                      onClick={() => narration.play(pi, true)}
                    >
                      <Icon name="speaker" size={16} />
                    </button>
                  )}
                </p>
                {showEn && (
                  <p className="para-en" lang="en">
                    {p.en}
                  </p>
                )}
              </div>
            ))}
          </div>

          {story.insight && (
            <aside className="insight" aria-label="Dutch insight">
              <p className="insight-label">
                <span className="flag-nl" aria-hidden="true" /> Dutch insight
              </p>
              <h3>{story.insight.title}</h3>
              <p>{story.insight.text}</p>
            </aside>
          )}

          <Quiz
            questions={story.quiz}
            onDone={(score, total) => {
              dispatch({ type: "quiz", id: story.id, score, total, now: Date.now() });
              dispatch({ type: "markRead", id: story.id, now: Date.now() });
            }}
          />
        </article>
      </div>

      <div className="actionbar">
        {mode === "deck" ? (
          <>
            <button className="btn btn-ghost" onClick={onSkip}>
              <Icon name="skip" size={18} /> Skip
            </button>
            <button className="btn btn-primary" onClick={onLike}>
              <Icon name="heart" size={18} /> Like &amp; save
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={onBack}>
              <Icon name="back" size={18} /> Back
            </button>
            <button className="btn btn-ghost" onClick={onUnsave}>
              <Icon name="heart" size={18} fill /> Remove from saved
            </button>
          </>
        )}
      </div>

      {sel?.kind === "word" && (
        <WordSheet token={sel.token} paragraph={sel.paragraph} storyId={story.id} onClose={close} />
      )}
      {pill && (
        <Sheet label={`Grammar pill: ${pill.title}`} onClose={close}>
          <PillBody pill={pill} />
        </Sheet>
      )}
    </>
  );
}
