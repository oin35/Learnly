import { useState } from "react";
import { useStore, type SyncResult } from "../lib/store";
import { KEY_MIN, normalizeKey } from "../lib/sync";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";

const MESSAGES: Partial<Record<SyncResult, string>> = {
  taken: "That key is already in use. If it is yours, tap “I already use this key”. Otherwise choose a different one.",
  missing: "No progress is saved under that key. Check the spelling, or tap “Create this key” to start with it.",
  invalid: `A sync key needs at least ${KEY_MIN} characters.`,
  error: "Couldn’t reach the sync service. Check your connection and try again.",
};

/** Turn progress sync on or off: choose your own sync key, or enter the key you already use on another device. */
export function SyncSheet({ onClose }: { onClose: () => void }) {
  const { sync } = useStore();
  const [entered, setEntered] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<SyncResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmStop, setConfirmStop] = useState(false);
  const valid = normalizeKey(entered) !== null;

  const go = async (mode: "start" | "join") => {
    setBusy(true);
    setProblem(null);
    const result = await (mode === "start" ? sync.start(entered) : sync.join(entered));
    setBusy(false);
    if (result === "ok") setEntered("");
    else setProblem(result);
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
        ) : (
          <form
            className="sync-join"
            onSubmit={(e) => {
              e.preventDefault();
              if (valid && !busy) void go("start");
            }}
          >
            <p className="muted">Keep your saved stories, words and streak safe online and use them on all your devices. No account needed: you choose a sync key.</p>
            <label htmlFor="sync-key-input">Your sync key</label>
            <input
              id="sync-key-input"
              className="search"
              placeholder={`At least ${KEY_MIN} characters`}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              maxLength={60}
              value={entered}
              onChange={(e) => {
                setEntered(e.target.value);
                setProblem(null);
              }}
            />
            <p className="fineprint">Choose something only you would think of, not “123456” or your first name: anyone who enters the same key sees and can change your progress. Capital letters and spaces don’t matter.</p>
            {problem && (
              <p className="sync-problem" role="alert">
                {MESSAGES[problem]}
              </p>
            )}
            <div className="sync-actions">
              <button className="btn btn-primary" type="submit" disabled={!valid || busy}>
                Create this key
              </button>
              <button className="btn btn-ghost" type="button" disabled={!valid || busy} onClick={() => void go("join")}>
                I already use this key
              </button>
            </div>
            <p className="fineprint">The progress already on this device is kept and combined with the key’s progress.</p>
          </form>
        )}
      </div>
    </Sheet>
  );
}
