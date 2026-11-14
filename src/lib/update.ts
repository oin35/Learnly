/**
 * Keeping the app up to date.
 *
 * An iPhone Home Screen app is not reloaded when it is reopened: iOS brings the old page back as it was,
 * so a fix or a new story could take days to arrive. Each build therefore has an id, and the server has
 * a small version.json with the id of the newest build. When the app opens or comes back to the front it
 * compares the two and, if a newer build is out, reloads itself. Progress is in storage, so nothing is lost.
 */
declare const __BUILD__: string | undefined;

/** The id of the build that is running */
export const BUILD: string = typeof __BUILD__ === "string" ? __BUILD__ : "dev";

const TRIED_KEY = "learnly:update-tried";
const MIN_GAP = 60_000; // ask the server at most once a minute

/** Reload only for a build that is different from ours and that we have not already tried to load (no reload loops). */
export function shouldReload(current: string, latest: unknown, tried: string | null): latest is string {
  return typeof latest === "string" && latest !== "" && latest !== current && latest !== tried;
}

/** The address to load for a build: the extra ?v= makes the browser skip its cached copy of the page. */
export function freshUrl(href: string, build: string): string {
  const url = new URL(href);
  url.searchParams.set("v", build.replace(/\D/g, ""));
  return url.toString();
}

/** Someone in the middle of a story or a panel is not interrupted; the update waits for the next time. */
const busy = () => document.querySelector(".story-text, .sheet") !== null;

let last = 0;

export async function checkForUpdate(force = false): Promise<void> {
  const now = Date.now();
  if (!force && now - last < MIN_GAP) return;
  last = now;
  try {
    const res = await fetch(`./version.json?t=${now}`, { cache: "no-store" });
    if (!res.ok) return;
    const latest = ((await res.json()) as { build?: unknown }).build;
    let tried: string | null = null;
    try {
      tried = sessionStorage.getItem(TRIED_KEY);
    } catch {
      /* no storage: the URL check below still prevents a loop */
    }
    if (!shouldReload(BUILD, latest, tried)) return;
    const target = freshUrl(location.href, latest);
    if (target === location.href || busy()) return;
    try {
      sessionStorage.setItem(TRIED_KEY, latest);
    } catch {
      /* see above */
    }
    location.replace(target);
  } catch {
    /* offline, or hosted somewhere without version.json: keep running this build */
  }
}

export function watchForUpdates(): void {
  let framed = true;
  try {
    framed = window.self !== window.top;
  } catch {
    /* cross-origin frame */
  }
  if (framed || BUILD === "dev" || import.meta.env.DEV) return; // inside claude.ai the page is replaced as a whole
  void checkForUpdate(true);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void checkForUpdate();
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) void checkForUpdate();
  });
}
