import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type Dispatch, type ReactNode } from "react";
import { reducer, loadState, saveState, type Action, type AppState } from "./state";
import { loadMeta, newCode, pull, push, reconcile, saveMeta, syncAvailable, type SyncMeta } from "./sync";

export type SyncStatus = "off" | "syncing" | "ok" | "error";

export interface SyncApi {
  available: boolean;
  code: string | null;
  status: SyncStatus;
  /** When this device last synced successfully (ms), if it has */
  lastSynced: number | null;
  /** Start syncing this device under a brand-new code */
  start: () => void;
  /** Start syncing this device with an existing code (from another device) */
  join: (code: string) => void;
  /** Stop syncing on this device (progress stays on the device and on the server) */
  stop: () => void;
  syncNow: () => void;
}

const Ctx = createContext<{ state: AppState; dispatch: Dispatch<Action>; sync: SyncApi } | null>(null);

function useSyncEngine(state: AppState, dispatch: Dispatch<Action>): SyncApi {
  const [meta, setMetaState] = useState<SyncMeta | null>(() => (syncAvailable ? loadMeta() : null));
  const [status, setStatus] = useState<SyncStatus>(meta ? "ok" : "off");
  const [lastSynced, setLastSynced] = useState<number | null>(null);

  const metaRef = useRef(meta);
  const stateRef = useRef(state);
  stateRef.current = state;
  const busy = useRef(false);
  const again = useRef(false);
  const changes = useRef(0); // counts local changes, to notice edits made while a sync was in flight
  const fromServer = useRef(false); // the next state change came from the server, not from the person
  const first = useRef(true);
  const timer = useRef<number | undefined>(undefined);

  const setMeta = useCallback((m: SyncMeta | null) => {
    metaRef.current = m;
    setMetaState(m);
    saveMeta(m);
  }, []);

  const run = useCallback(
    async (closing = false) => {
      const m = metaRef.current;
      if (!m || !syncAvailable) return;
      if (busy.current) {
        again.current = true;
        return;
      }
      busy.current = true;
      setStatus("syncing");
      const seen = changes.current;
      try {
        const remote = await pull(m.code);
        const cur = metaRef.current;
        if (!cur || cur.code !== m.code) return; // switched off or changed code meanwhile
        const r = reconcile(stateRef.current, cur, remote);
        if (r.replaced) {
          fromServer.current = true;
          dispatch({ type: "replace", state: r.state });
        }
        const stamp = r.push ? await push(m.code, r.state, closing) : (remote?.stamp ?? null);
        if (metaRef.current?.code === m.code) {
          setMeta({ code: m.code, stamp, dirty: changes.current !== seen });
          setStatus("ok");
          setLastSynced(Date.now());
        }
      } catch {
        if (metaRef.current?.code === m.code) setStatus("error");
      } finally {
        busy.current = false;
        if (again.current) {
          again.current = false;
          window.setTimeout(() => void run(), 0);
        }
      }
    },
    [dispatch, setMeta],
  );

  // A local change: remember it and sync shortly after
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (fromServer.current) {
      fromServer.current = false;
      return;
    }
    const m = metaRef.current;
    if (!m) return;
    changes.current++;
    if (!m.dirty) setMeta({ ...m, dirty: true });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void run(), 1500);
  }, [state, run, setMeta]);

  // Sync when the app opens, comes back to the front, or the connection returns; flush when it goes to the background
  useEffect(() => {
    if (!syncAvailable) return;
    void run();
    const onVisible = () => {
      if (document.visibilityState === "visible") void run();
      else if (metaRef.current?.dirty) {
        window.clearTimeout(timer.current);
        void run(true);
      }
    };
    const onOnline = () => void run();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, [run]);

  const begin = useCallback(
    (code: string) => {
      setMeta({ code, stamp: null, dirty: true });
      setStatus("syncing");
      void run();
    },
    [run, setMeta],
  );

  return useMemo(
    () => ({
      available: syncAvailable,
      code: meta?.code ?? null,
      status: meta ? status : "off",
      lastSynced,
      start: () => begin(newCode()),
      join: (code: string) => begin(code),
      stop: () => {
        window.clearTimeout(timer.current);
        setMeta(null);
        setStatus("off");
        setLastSynced(null);
      },
      syncNow: () => void run(),
    }),
    [meta, status, lastSynced, begin, run, setMeta],
  );
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  useEffect(() => saveState(state), [state]);
  const sync = useSyncEngine(state, dispatch);
  return <Ctx.Provider value={{ state, dispatch, sync }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside StoreProvider");
  return v;
}
