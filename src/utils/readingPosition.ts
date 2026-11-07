const STORAGE_KEY = 'reading_position';

/** Episode Index of the furthest chapter the user has read, or null if none. */
export function readReadingPosition(): number | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = Number(raw);
    return Number.isInteger(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

export function writeReadingPosition(index: number | string): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(index));
  } catch {
    // Ignore quota / private-mode failures; reading position is best-effort.
  }
}

/**
 * Record reading progress without ever moving it backwards, so opening an
 * older episode via ?page=N does not rewind the resume position.
 */
export function advanceReadingPosition(index: number | string): void {
  const value = Number(index);
  if (!Number.isInteger(value) || value <= 0) return;
  const current = readReadingPosition();
  if (current != null && current >= value) return;
  writeReadingPosition(value);
}
