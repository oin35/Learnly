import type { VocabCard } from "../types";
import { sanitize, type AppState } from "./state";
import { SYNC } from "./syncConfig";

/**
 * Progress sync with a personal sync key (no accounts). People choose their own key (6 characters or more).
 * The key is the only thing protecting the progress: whoever types the same key sees and can change it.
 *
 * The server never sees the key itself: the app sends a code derived from it (and the server stores a hash of that).
 */
function framed(): boolean {
  try {
    return typeof window !== "undefined" && window.self !== window.top;
  } catch {
    return true;
  }
}

/** Off inside an embedded page (the claude.ai artifact cannot reach outside services) and when no server is configured. */
export const syncAvailable = Boolean(SYNC.url && SYNC.key) && !framed();

export const KEY_MIN = 6;
export const KEY_MAX = 40;

/** What the person typed → their key: case and spaces don't matter. Null if it is too short or too long. */
export function normalizeKey(input: string): string | null {
  const k = input.normalize("NFKC").toLowerCase().replace(/\s+/g, "");
  const n = [...k].length;
  return n >= KEY_MIN && n <= KEY_MAX ? k : null;
}

/** The code sent to the server for a key: 32 hex characters from a SHA-256 of the key. */
export async function codeFor(key: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("don-pablo-dutch-class:" + key));
  return [...new Uint8Array(digest)].slice(0, 16).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

/* ── Merging two devices' progress ─────────────────────────────────────────── */
const union = (a: string[], b: string[]) => [...new Set([...a, ...b])];

function betterCard(a: VocabCard, b: VocabCard): VocabCard {
  if (a.seen !== b.seen) return a.seen > b.seen ? a : b; // the one reviewed more is further along
  return a.due >= b.due ? a : b;
}

/** Keep everything both devices have; for the same word or quiz, keep the more advanced one. */
export function mergeStates(a: AppState, b: AppState): AppState {
  const saved = union(a.saved, b.saved);
  const vocab: Record<string, VocabCard> = { ...b.vocab };
  for (const [id, card] of Object.entries(a.vocab)) vocab[id] = vocab[id] ? betterCard(card, vocab[id]) : card;
  const quiz = { ...b.quiz };
  for (const [id, q] of Object.entries(a.quiz)) if (!quiz[id] || q.score >= quiz[id].score) quiz[id] = q;
  return {
    v: 1,
    saved,
    skipped: union(a.skipped, b.skipped).filter((id) => !saved.includes(id)),
    vocab,
    days: union(a.days, b.days).sort(),
    quiz,
    pillsSeen: union(a.pillsSeen, b.pillsSeen),
    read: union(union(a.read, b.read), saved),
    favPills: union(a.favPills, b.favPills),
    startRank: a.startRank, // a preference, not progress: this device's choice wins when both changed
  };
}

export interface SyncMeta {
  /** The sync key the person chose (normalised), shown back to them */
  key: string;
  /** The code derived from the key; this is what the server sees */
  code: string;
  /** Server timestamp of the version this device last synced with (null: never synced) */
  stamp: string | null;
  /** This device has changes that are not on the server yet */
  dirty: boolean;
}

export type Remote = { data: AppState; stamp: string } | null;

/**
 * Decide what to do after fetching the server's copy.
 *  - nothing on the server yet → upload ours;
 *  - server unchanged since our last sync → upload only if we changed something;
 *  - server changed and we did not → take the server's copy (this is what makes deletions travel);
 *  - both changed, or first sync on this device → merge and upload.
 */
export function reconcile(local: AppState, meta: SyncMeta, remote: Remote): { state: AppState; push: boolean; replaced: boolean } {
  if (!remote) return { state: local, push: true, replaced: false };
  if (remote.stamp === meta.stamp) return { state: local, push: meta.dirty, replaced: false };
  if (!meta.dirty && meta.stamp !== null) return { state: remote.data, push: false, replaced: true };
  return { state: mergeStates(local, remote.data), push: true, replaced: true };
}

/* ── Talking to the server ─────────────────────────────────────────────────── */
async function rpc(fn: string, body: unknown, keepalive = false): Promise<unknown> {
  const text = JSON.stringify(body);
  const res = await fetch(`${SYNC.url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SYNC.key, Authorization: `Bearer ${SYNC.key}` },
    body: text,
    keepalive: keepalive && text.length < 60000, // lets a save finish while the tab is closing (browsers cap the size)
  });
  if (!res.ok) throw new Error(`sync ${fn} failed: ${res.status}`);
  return res.json();
}

export async function pull(code: string): Promise<Remote> {
  const r = (await rpc("load_progress", { p_code: code })) as { data?: unknown; stamp?: unknown } | null;
  if (!r) return null;
  const data = sanitize(r.data);
  return data && typeof r.stamp === "string" ? { data, stamp: r.stamp } : null;
}

export async function push(code: string, state: AppState, keepalive = false): Promise<string> {
  return (await rpc("save_progress", { p_code: code, p_data: state }, keepalive)) as string;
}

/* ── This device's sync settings ───────────────────────────────────────────── */
const META_KEY = "learnly:sync";

export function loadMeta(): SyncMeta | null {
  try {
    const m = JSON.parse(localStorage.getItem(META_KEY) ?? "null") as Partial<SyncMeta> | null;
    return m && typeof m.key === "string" && typeof m.code === "string" && /^[0-9A-F]{32}$/.test(m.code)
      ? { key: m.key, code: m.code, stamp: typeof m.stamp === "string" ? m.stamp : null, dirty: Boolean(m.dirty) }
      : null;
  } catch {
    return null;
  }
}

export function saveMeta(meta: SyncMeta | null): void {
  try {
    if (meta) localStorage.setItem(META_KEY, JSON.stringify(meta));
    else localStorage.removeItem(META_KEY);
  } catch {
    /* storage unavailable: sync still works for this visit */
  }
}
