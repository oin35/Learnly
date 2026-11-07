import { useState } from "react";
import { StoreProvider, useStore } from "./lib/store";
import { streak } from "./lib/state";
import { dueCards } from "./lib/srs";
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

      <main className="screen">
        {tab === "read" && <ReadTab goTo={setTab} />}
        {tab === "saved" && <SavedTab goRead={() => setTab("read")} />}
        {tab === "words" && <WordsTab goRead={() => setTab("read")} />}
        {tab === "grammar" && <GrammarTab />}
      </main>

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
