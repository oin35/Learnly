import type { VocabCard } from "../types";
import { sanitize, type AppState } from "./state";
import { SYNC } from "./syncConfig";

/**
 * Progress sync with a personal code (no accounts).
 * The code is the only key: whoever has it can read and change that progress, so it is long and random.
 */
export const syncAvailable = Boolean(SYNC.url && SYNC.key);

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O, 1/I: easy to read and type
export const CODE_LENGTH = 12;

export function newCode(random: (n: number) => Uint8Array = (n) => crypto.getRandomValues(new Uint8Array(n))): string {
  return [...random(CODE_LENGTH)].map((b) => ALPHABET[b % ALPHABET.length]).join("");
}

/** What the person typed → the canonical code, or null if it cannot be one. Forgiving about case, spaces and dashes. */
export function normalizeCode(input: string): string | null {
  const raw = input.toUpperCase().replace(/[^0-9A-Z]/g, "");
  return raw.length === CODE_LENGTH && [...raw].every((ch) => ALPHABET.includes(ch)) ? raw : null;
}

/** K7QM9TXP4HDW → K7QM-9TXP-4HDW */
export function formatCode(code: string): string {
  return code.replace(/(.{4})(?=.)/g, "$1-");
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
  };
}

export interface SyncMeta {
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
    return m && typeof m.code === "string" && normalizeCode(m.code) ? { code: m.code, stamp: typeof m.stamp === "string" ? m.stamp : null, dirty: Boolean(m.dirty) } : null;
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
