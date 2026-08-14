import { computed, nextTick, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import { estimateEpisodeHeight, viewerContentWidth } from 'src/utils/komaAspect';

/** Keep roughly this many viewports of comic below the fold before appending more. */
const BELOW_FOLD_VIEWPORTS = 1.5;
const MAX_APPEND_PER_TICK = 8;

export function resolvePageIndex(pages: Page[], page: string): number {
  const pageInt = parseInt(page, 10);
  if (page === 'latest') return Math.max(0, pages.length - 1);
  if (page === 'ri') return Math.min(80, Math.max(0, pages.length - 1));
  if (0 < pageInt && pageInt <= pages.length) {
    const match = pages.find((item) => String(item.Index) === page);
    const idx = match ? pages.indexOf(match) : -1;
    return idx >= 0 ? idx : 0;
  }
  if (pageInt <= 0) return 0;
  return 0;
}

function targetBelowFoldPx(): number {
  return window.innerHeight * BELOW_FOLD_VIEWPORTS;
}

function initialLastIndex(
  pages: Page[],
  start: number,
  aspectByUrl: Record<string, string>,
): number {
  const first = pages[start];
  if (!first) return start;
  const width = viewerContentWidth();
  let last = start;
  let height = estimateEpisodeHeight(width, aspectByUrl, first);
  const target = (window.innerHeight || 800) * (1 + BELOW_FOLD_VIEWPORTS);
  const minLast = Math.min(pages.length - 1, start + 1);
  while (last < pages.length - 1 && (height < target || last < minLast)) {
    last += 1;
    const next = pages[last];
    if (!next) break;
    height += estimateEpisodeHeight(width, aspectByUrl, next);
  }
  return last;
}

/**
 * Contiguous episode window with a below-the-fold lookahead buffer.
 * Next episodes are mounted into already-estimated space *before* the sentinel
 * reaches the viewport, so appends happen off-screen (no CLS).
 */
export function useComicFeed(
  pages: Page[],
  pageQuery: Ref<string>,
  aspectByUrl: Ref<Record<string, string>>,
  sentinel: Ref<HTMLElement | null>,
) {
  const startIndex = ref(0);
  const lastIndex = ref(0);
  let observer: IntersectionObserver | null = null;
  let expanding = false;

  function resetTo(page: string) {
    const start = resolvePageIndex(pages, page);
    startIndex.value = start;
    lastIndex.value = initialLastIndex(pages, start, aspectByUrl.value);
  }

  resetTo(pageQuery.value);

  const visibleIndices = computed(() => {
    const indices: number[] = [];
    for (let i = startIndex.value; i <= lastIndex.value; i += 1) {
      if (pages[i]) indices.push(i);
    }
    return indices;
  });

  const visiblePages = computed(() =>
    visibleIndices.value.flatMap((index) => {
      const page = pages[index];
      return page ? [{ index, page }] : [];
    }),
  );

  const hasPrevious = computed(() => startIndex.value > 0);
  const hasMore = computed(() => lastIndex.value < pages.length - 1);

  function sentinelNeedsMore(): boolean {
    const el = sentinel.value;
    if (!el || !hasMore.value) return false;
    return el.getBoundingClientRect().top < window.innerHeight + targetBelowFoldPx();
  }

  async function ensureLookahead() {
    if (expanding || pages.length === 0) return;
    expanding = true;
    try {
      let appended = 0;
      while (hasMore.value && sentinelNeedsMore() && appended < MAX_APPEND_PER_TICK) {
        lastIndex.value += 1;
        appended += 1;
        await nextTick();
      }
    } finally {
      expanding = false;
      if (hasMore.value && sentinelNeedsMore()) {
        requestAnimationFrame(() => {
          void ensureLookahead();
        });
      }
    }
  }

  function observe() {
    observer?.disconnect();
    const el = sentinel.value;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void ensureLookahead();
        }
      },
      {
        root: null,
        // Fire while the sentinel is still about 1.5 viewports below the fold.
        rootMargin: `0px 0px ${Math.round(BELOW_FOLD_VIEWPORTS * 100)}% 0px`,
        threshold: 0,
      },
    );
    observer.observe(el);
  }

  async function prependPrevious() {
    if (!hasPrevious.value) return;
    const scrolling = document.scrollingElement;
    const prevHeight = scrolling?.scrollHeight ?? 0;
    const prevTop = scrolling?.scrollTop ?? window.scrollY;
    startIndex.value -= 1;
    await nextTick();
    if (!scrolling) return;
    scrolling.scrollTop = prevTop + (scrolling.scrollHeight - prevHeight);
  }

  async function appendNext() {
    if (!hasMore.value) return;
    lastIndex.value += 1;
    await nextTick();
    void ensureLookahead();
  }

  watch(
    () => pageQuery.value,
    (page) => {
      resetTo(page);
      void nextTick().then(() => {
        observe();
        void ensureLookahead();
      });
    },
  );

  watch(sentinel, () => {
    observe();
    void ensureLookahead();
  }, { flush: 'post' });

  function onResize() {
    void ensureLookahead();
  }

  onMounted(() => {
    observe();
    void ensureLookahead();
    window.addEventListener('resize', onResize, { passive: true });
  });

  onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener('resize', onResize);
  });

  return {
    startIndex,
    lastIndex,
    visiblePages,
    hasPrevious,
    hasMore,
    prependPrevious,
    appendNext,
    ensureLookahead,
  };
}
