import { useState } from "react";
import { useStore, type SyncResult } from "../lib/store";
import { KEY_MIN, normalizeKey } from "../lib/sync";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";

type Mode = "start" | "join";

/** Turn progress sync on or off: create your own sync key, or enter the key you already use on another device. */
export function SyncSheet({ onClose }: { onClose: () => void }) {
  const { sync } = useStore();
  const [mode, setMode] = useState<Mode | null>(null);
  const [entered, setEntered] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<SyncResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmStop, setConfirmStop] = useState(false);
  const valid = normalizeKey(entered) !== null;

  const go = async (m: Mode) => {
    setMode(m);
    setBusy(true);
    setProblem(null);
    const result = await (m === "start" ? sync.start(entered) : sync.join(entered));
    setBusy(false);
    if (result === "ok") {
      setEntered("");
      setMode(null);
    } else setProblem(result);
  };

  const pick = (m: Mode | null) => {
    setMode(m);
    setProblem(null);
  };

  const copy = async () => {
    if (!sync.key) return;
    try {
      await navigator.clipboard.writeText(sync.key);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the key is on screen and selectable */
    }
  };

  return (
    <Sheet label="Sync your progress" onClose={onClose}>
      <div className="sync">
        <h2 className="pill-title">Sync your progress</h2>

        {sync.key ? (
          <>
            <p className="muted">Your progress is saved online under your sync key. Enter the same key on another phone or computer to continue there.</p>
            <div className="sync-code" aria-label="Your sync key">
              <code>{sync.key}</code>
              <button className="btn btn-ghost btn-small" onClick={copy}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="sync-status" role="status">
              {sync.status === "syncing" && "Syncing…"}
              {sync.status === "ok" && (sync.lastSynced ? "Synced just now. Changes save automatically." : "Sync is on. Changes save automatically.")}
              {sync.status === "error" && "Couldn’t reach the sync service. Your progress is safe on this device and will sync when the connection is back."}
            </p>
            <p className="fineprint">Keep your key to yourself: anyone who enters it can see and change your progress.</p>
            <div className="sync-actions">
              <button className="btn btn-ghost" onClick={sync.syncNow} disabled={sync.status === "syncing"}>
                <Icon name="flip" size={18} /> Sync now
              </button>
              {confirmStop ? (
                <>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      sync.stop();
                      setConfirmStop(false);
                    }}
                  >
                    Yes, stop on this device
                  </button>
                  <button className="btn btn-text" onClick={() => setConfirmStop(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-text" onClick={() => setConfirmStop(true)}>
                  Stop syncing on this device
                </button>
              )}
            </div>
          </>
        ) : mode === null ? (
          <>
            <p className="muted">Keep your saved stories, words and streak safe online and use them on all your devices. No account needed.</p>
            <div className="sync-choices">
              <button className="sync-choice" onClick={() => pick("start")}>
                <span className="sync-choice-icon" aria-hidden="true">
                  <Icon name="plus" size={22} />
                </span>
                <span>
                  <strong>Create a new key</strong>
                  <span>First time syncing? Choose your own key.</span>
                </span>
              </button>
              <button className="sync-choice" onClick={() => pick("join")}>
                <span className="sync-choice-icon" aria-hidden="true">
                  <Icon name="key" size={22} />
                </span>
                <span>
                  <strong>I already have a key</strong>
                  <span>Enter it to get your progress on this device.</span>
                </span>
              </button>
            </div>
          </>
        ) : (
          <form
            className="sync-join"
            onSubmit={(e) => {
              e.preventDefault();
              if (valid && !busy) void go(mode);
            }}
          >
            <button className="btn btn-text" type="button" onClick={() => pick(null)}>
              <Icon name="back" size={18} /> Back
            </button>
            <label htmlFor="sync-key-input">{mode === "start" ? "Choose your new sync key" : "Enter your sync key"}</label>
            <input
              id="sync-key-input"
              className="search"
              placeholder={mode === "start" ? `At least ${KEY_MIN} characters` : "The key you created before"}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              maxLength={60}
              autoFocus
              value={entered}
              onChange={(e) => {
                setEntered(e.target.value);
                setProblem(null);
              }}
            />
            <p className="fineprint">
              {mode === "start"
                ? "Choose something only you would think of, not “123456” or your first name: anyone who enters the same key sees and can change your progress. Capital letters and spaces don’t matter."
                : "Capital letters and spaces don’t matter. The progress already on this device is kept and combined with your key’s progress."}
            </p>
            {problem === "taken" && (
              <div className="sync-problem" role="alert">
                <p>That key is already in use. Choose a different one.</p>
                <button className="link" type="button" onClick={() => void go("join")}>
                  It’s my key: use it on this device
                </button>
              </div>
            )}
            {problem === "missing" && (
              <div className="sync-problem" role="alert">
                <p>No progress is saved under that key. Check the spelling.</p>
                <button className="link" type="button" onClick={() => void go("start")}>
                  Create it as a new key instead
                </button>
              </div>
            )}
            {problem === "invalid" && (
              <p className="sync-problem" role="alert">
                A sync key needs at least {KEY_MIN} characters.
              </p>
            )}
            {problem === "error" && (
              <p className="sync-problem" role="alert">
                Couldn’t reach the sync service. Check your connection and try again.
              </p>
            )}
            <button className="btn btn-primary btn-block" type="submit" disabled={!valid || busy}>
              {busy ? "One moment…" : mode === "start" ? "Create key" : "Use my key"}
            </button>
          </form>
        )}
      </div>
    </Sheet>
  );
}
