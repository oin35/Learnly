/** Tiny observable for app-wide UI flags that several components need to open/close. */
let soundCheckOpen = false;
const listeners = new Set<() => void>();

export const getSoundCheckOpen = () => soundCheckOpen;
export function setSoundCheckOpen(v: boolean) {
  if (soundCheckOpen !== v) {
    soundCheckOpen = v;
    listeners.forEach((l) => l());
  }
}
export function subscribeUi(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}
