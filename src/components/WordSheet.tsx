import { lookup, entryId, displayWord } from "../data/dictionary";
import { useStore } from "../lib/store";
import { canSpeak, speak } from "../lib/speech";
import { sentenceWith } from "../lib/text";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";

const POS_LABEL: Record<string, string> = {
  noun: "noun",
  verb: "verb",
  adj: "adjective",
  adv: "adverb",
  prep: "preposition",
  pron: "pronoun / article",
  conj: "conjunction",
  num: "number",
  det: "determiner",
  phrase: "phrase",
  name: "name",
};

interface Props {
  /** The word exactly as it appears in the text */
  token: string;
  /** Raw paragraph (with pill markup) to pick an example sentence from */
  paragraph: string;
  storyId: string;
  onClose: () => void;
}

export function WordSheet({ token, paragraph, storyId, onClose }: Props) {
  const { state, dispatch } = useStore();
  const entry = lookup(token);

  if (!entry) {
    return (
      <Sheet label={`Meaning of ${token}`} onClose={onClose}>
        <h2 className="word-title">{token}</h2>
        <p className="muted">No dictionary entry yet for this word.</p>
      </Sheet>
    );
  }

  const id = entryId(entry);
  const isSaved = Boolean(state.vocab[id]);
  const changed = token.toLowerCase() !== entry.nl.toLowerCase();
  const canSave = entry.pos !== "name";

  const toggle = () => {
    if (isSaved) {
      dispatch({ type: "removeWord", id });
    } else {
      dispatch({
        type: "addWord",
        now: Date.now(),
        word: {
          id,
          nl: entry.nl,
          en: entry.en,
          pos: entry.pos,
          article: entry.article,
          example: sentenceWith(paragraph, token),
          storyId,
        },
      });
    }
  };

  return (
    <Sheet label={`Meaning of ${token}`} onClose={onClose}>
      <div className="word-head">
        <h2 className="word-title">{displayWord(entry)}</h2>
        {canSpeak() && (
          <button className="icon-btn" aria-label={`Listen to ${entry.nl}`} onClick={() => speak(displayWord(entry))}>
            <Icon name="speaker" />
          </button>
        )}
      </div>
      <p className="word-meta">
        <span className="chip">{POS_LABEL[entry.pos] ?? entry.pos}</span>
        {changed && (
          <span className="muted">
            “{token}” is a form of <strong>{entry.nl}</strong>
          </span>
        )}
      </p>
      <p className="word-en">{entry.en}</p>
      {canSave ? (
        <button className={`btn ${isSaved ? "btn-ghost" : "btn-primary"} btn-block`} onClick={toggle}>
          <Icon name={isSaved ? "check" : "plus"} size={18} />
          {isSaved ? "Saved to vocabulary (tap to remove)" : "Save to vocabulary"}
        </button>
      ) : (
        <p className="muted">Names don’t need to be learned. 🙂</p>
      )}
    </Sheet>
  );
}
