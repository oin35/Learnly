import { useState, type ReactNode } from "react";
import type { Story } from "../types";
import { lookup, entryId } from "../data/dictionary";
import { pillById } from "../data/pills";
import { parseSegments, readingMinutes, stripMarkup, tokenize, countWords } from "../lib/text";
import { useStore } from "../lib/store";
import { canSpeak, speak } from "../lib/speech";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";
import { PillBody } from "./PillBody";
import { WordSheet } from "./WordSheet";
import { Quiz } from "./Quiz";

type Selection = { kind: "word"; token: string; paragraph: string } | { kind: "pill"; id: string } | null;

interface Props {
  story: Story;
  mode: "deck" | "saved";
  intro?: ReactNode;
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

export function StoryView({ story, mode, intro, onSkip, onLike, onBack, onUnsave }: Props) {
  const { dispatch } = useStore();
  const [showEn, setShowEn] = useState(false);
  const [sel, setSel] = useState<Selection>(null);
  const minutes = readingMinutes(story.paragraphs);

  const openPill = (id: string) => {
    dispatch({ type: "pillSeen", id });
    setSel({ kind: "pill", id });
  };
  const openWord = (token: string, paragraph: string) => setSel({ kind: "word", token, paragraph });
  const close = () => setSel(null);

  const pill = sel?.kind === "pill" ? pillById.get(sel.id) : undefined;

  return (
    <>
      <div className="scroll">
        {intro}
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
            {story.level} · {story.topic} · {minutes} min read · {countWords(story.paragraphs)} words
          </p>
          <h1 className="story-title">{story.title}</h1>
          <p className="story-sub">{story.titleEn}</p>

          <div className="story-tools">
            <label className="switch">
              <input type="checkbox" checked={showEn} onChange={(e) => setShowEn(e.target.checked)} />
              <span>Show English</span>
            </label>
            <p className="hint">
              Tap a word for its meaning. Tap the <span className="capsule" aria-hidden="true" /> capsule for a grammar pill.
            </p>
          </div>

          <div className="story-text" lang="nl">
            {story.paragraphs.map((p, pi) => (
              <div className="para" key={pi}>
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
                  {canSpeak() && (
                    <button
                      className="icon-btn small para-audio"
                      aria-label="Listen to this paragraph"
                      onClick={() => speak(stripMarkup(p.nl))}
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

          <Quiz
            questions={story.quiz}
            onDone={(score, total) => dispatch({ type: "quiz", id: story.id, score, total, now: Date.now() })}
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
