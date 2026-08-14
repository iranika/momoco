const STORAGE_KEY = 'koma_aspect_ratios';

/** Width / height of early 4-koma scans; used until a file's intrinsic size is known. */
export const DEFAULT_KOMA_ASPECT = 1408 / 1850;

/**
 * Shorter than a typical 4-koma. Used only to decide how many episodes to mount:
 * underestimating height mounts extra lookahead, so appends stay off-screen.
 */
export const LOOKAHEAD_KOMA_ASPECT = 1.05;

export function parseAspectRatio(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = /^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/.exec(value);
  if (!match) return undefined;
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return undefined;
  return width / height;
}

export function formatAspectRatio(width: number, height: number): string {
  return `${width} / ${height}`;
}

export function readStoredKomaAspect(): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function writeStoredKomaAspect(value: Record<string, string>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore quota / private-mode failures; in-memory ratios still apply.
  }
}

export function estimateFrameHeight(
  contentWidth: number,
  aspectByUrl: Record<string, string>,
  url: string,
): number {
  const aspect = parseAspectRatio(aspectByUrl[url]) ?? LOOKAHEAD_KOMA_ASPECT;
  return contentWidth / aspect;
}

export function estimateEpisodeHeight(
  contentWidth: number,
  aspectByUrl: Record<string, string>,
  page: Page,
  actionsHeight = 48,
): number {
  const frames = page.ImagesUrl.reduce(
    (sum, url) => sum + estimateFrameHeight(contentWidth, aspectByUrl, url),
    0,
  );
  return frames + actionsHeight;
}

export function viewerContentWidth(): number {
  const padding = window.innerWidth < 600 ? 16 : 32;
  return Math.max(160, Math.min(window.innerWidth, 1280) - padding);
}
