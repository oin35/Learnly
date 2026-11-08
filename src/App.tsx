import { useEffect, useState, useSyncExternalStore } from "react";
import { StoreProvider, useStore } from "./lib/store";
import { streak } from "./lib/state";
import { dueCards } from "./lib/srs";
import { Sheet } from "./components/Sheet";
import { SoundCheck } from "./components/SoundCheck";
import { getSoundCheckOpen, setSoundCheckOpen, subscribeUi } from "./lib/ui";
import { stories } from "./data/stories";
import { allClipTexts, storyClipTexts } from "./lib/warm";
import { warmClips } from "./lib/speech";
import { dismissSpeechIssue, getSpeechIssue, subscribeSpeechIssue } from "./lib/speech";
import { Icon, type IconName } from "./components/Icon";
import { ReadTab } from "./components/ReadTab";
import { SavedTab } from "./components/SavedTab";
import { WordsTab } from "./components/WordsTab";
import { GrammarTab } from "./components/GrammarTab";

type Tab = "read" | "saved" | "words" | "grammar";

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: "read", label: "Read", icon: "book" },
  { id: "saved", label: "Saved", icon: "heart" },
  { id: "words", label: "Words", icon: "cards" },
  { id: "grammar", label: "Grammar", icon: "bulb" },
];

function Shell() {
  const [tab, setTab] = useState<Tab>("read");
  const { state } = useStore();
  const now = Date.now();
  const days = streak(state.days, now);
  const due = dueCards(state.vocab, now).length;
  const soundIssue = useSyncExternalStore(subscribeSpeechIssue, getSpeechIssue);
  const checkOpen = useSyncExternalStore(subscribeUi, getSoundCheckOpen);

  // Download the audio in the background so taps play instantly: words first, then every story.
  useEffect(() => {
    const t = window.setTimeout(() => warmClips([...allClipTexts(), ...stories.flatMap(storyClipTexts)]), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">L</span>
          <span className="brand-name">Learnly</span>
          <span className="chip">Nederlands · A1</span>
        </div>
        <div className="streak" title="Day streak" aria-label={`${days} day streak`}>
          🔥 {days}
        </div>
      </header>

      {soundIssue && (
        <div className="notice" role="alert">
          <div>
            <strong>The sound didn’t start.</strong> The recorded audio couldn’t play and the phone’s own voice didn’t start either. Turn up the volume. On iPhone the
            phone’s voice also needs Silent mode off and a Dutch voice installed (Settings → Accessibility → Spoken Content → Voices → Dutch). Then tap a speaker again.{" "}
            <button className="link" onClick={() => setSoundCheckOpen(true)}>
              Run the sound check
            </button>
          </div>
          <button className="btn btn-text" onClick={dismissSpeechIssue}>
            Dismiss
          </button>
        </div>
      )}

      <main className="screen">
        {tab === "read" && <ReadTab goTo={setTab} />}
        {tab === "saved" && <SavedTab goRead={() => setTab("read")} />}
        {tab === "words" && <WordsTab goRead={() => setTab("read")} />}
        {tab === "grammar" && <GrammarTab />}
      </main>

      {checkOpen && (
        <Sheet label="Sound check" onClose={() => setSoundCheckOpen(false)}>
          <SoundCheck />
        </Sheet>
      )}

      <nav className="tabs" aria-label="Main">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab${tab === t.id ? " active" : ""}`}
            aria-current={tab === t.id ? "page" : undefined}
            onClick={() => setTab(t.id)}
          >
            <span className="tab-icon">
              <Icon name={t.icon} size={22} fill={t.id === "saved" && tab === "saved"} />
              {t.id === "words" && due > 0 && <span className="badge">{due}</span>}
            </span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
