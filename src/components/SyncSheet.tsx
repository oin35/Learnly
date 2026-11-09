import { useState } from "react";
import { useStore } from "../lib/store";
import { formatCode, normalizeCode } from "../lib/sync";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";

/** Turn progress sync on or off, show this person's sync code, or enter a code from another device. */
export function SyncSheet({ onClose }: { onClose: () => void }) {
  const { sync } = useStore();
  const [entered, setEntered] = useState("");
  const [copied, setCopied] = useState(false);
  const [confirmStop, setConfirmStop] = useState(false);
  const valid = normalizeCode(entered);

  const copy = async () => {
    if (!sync.code) return;
    try {
      await navigator.clipboard.writeText(formatCode(sync.code));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the code is on screen and selectable */
    }
  };

  return (
    <Sheet label="Sync your progress" onClose={onClose}>
      <div className="sync">
        <h2 className="pill-title">Sync your progress</h2>

        {sync.code ? (
          <>
            <p className="muted">Your progress is saved online under your personal code. Enter this code on another phone or computer to continue there.</p>
            <div className="sync-code" aria-label="Your sync code">
              <code>{formatCode(sync.code)}</code>
              <button className="btn btn-ghost btn-small" onClick={copy}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="sync-status" role="status">
              {sync.status === "syncing" && "Syncing…"}
              {sync.status === "ok" && (sync.lastSynced ? "Synced just now. Changes save automatically." : "Sync is on. Changes save automatically.")}
              {sync.status === "error" && "Couldn’t reach the sync service. Your progress is safe on this device and will sync when the connection is back."}
            </p>
            <p className="fineprint sync-warn">Keep the code private and write it down: anyone with it can see and change your progress, and without it the online copy can’t be recovered.</p>
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
          <>
            <p className="muted">Keep your saved stories, words and streak safe online, and use them on all your devices. No account needed: you get a personal code.</p>
            <button className="btn btn-primary btn-block" onClick={sync.start}>
              Turn on sync and get my code
            </button>
            <form
              className="sync-join"
              onSubmit={(e) => {
                e.preventDefault();
                if (valid) sync.join(valid);
              }}
            >
              <label htmlFor="sync-code-input">Already have a code from another device?</label>
              <div className="sync-join-row">
                <input
                  id="sync-code-input"
                  className="search"
                  placeholder="XXXX-XXXX-XXXX"
                  autoCapitalize="characters"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  value={entered}
                  onChange={(e) => setEntered(e.target.value)}
                />
                <button className="btn btn-ghost" type="submit" disabled={!valid}>
                  Use code
                </button>
              </div>
              {entered.trim() !== "" && !valid && <p className="fineprint">A code has 12 letters and numbers, like K7QM-9TXP-4HDW.</p>}
            </form>
            <p className="fineprint">The progress already on this device is kept and combined with the code’s progress.</p>
          </>
        )}
      </div>
    </Sheet>
  );
}
