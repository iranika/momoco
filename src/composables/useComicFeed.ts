import { computed, nextTick, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import { estimateEpisodeHeight, viewerContentWidth } from 'src/utils/komaAspect';
import { useAutoLoadStore } from 'src/stores/LocalStorage';

/** Load the next episode before the sentinel is this close to the viewport. */
const LOAD_AHEAD_VIEWPORTS = 1.25;
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

function loadAheadPx(): number {
  return Math.max(640, window.innerHeight * LOAD_AHEAD_VIEWPORTS);
}

function initialLastIndex(
  pages: Page[],
  start: number,
  aspectByUrl: Record<string, string>,
  autoLoad: boolean,
): number {
  if (!autoLoad) return start;
  const first = pages[start];
  if (!first) return start;
  const width = viewerContentWidth();
  let last = start;
  let height = estimateEpisodeHeight(width, aspectByUrl, first);
  const target = (window.innerHeight || 800) * (1 + LOAD_AHEAD_VIEWPORTS);
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
 * Contiguous episode window. Window scroll is the source of truth so loading
 * continues for as long as the user keeps scrolling. IntersectionObserver is a
 * secondary trigger only (it does not re-fire while still intersecting).
 */
export function useComicFeed(
  pages: Page[],
  pageQuery: Ref<string>,
  aspectByUrl: Ref<Record<string, string>>,
  sentinel: Ref<HTMLElement | null>,
) {
  const autoLoadStore = useAutoLoadStore();
  const startIndex = ref(0);
  const lastIndex = ref(0);
  let observer: IntersectionObserver | null = null;
  let expanding = false;
  let pendingLookahead = false;
  let scrollTick = false;

  function resetTo(page: string) {
    const start = resolvePageIndex(pages, page);
    startIndex.value = start;
    lastIndex.value = initialLastIndex(
      pages,
      start,
      aspectByUrl.value,
      autoLoadStore.enabled.value,
    );
  }

  resetTo(pageQuery.value);

  const visiblePages = computed(() => {
    const rows: { index: number; page: Page }[] = [];
    for (let i = startIndex.value; i <= lastIndex.value; i += 1) {
      const page = pages[i];
      if (page) rows.push({ index: i, page });
    }
    return rows;
  });

  const hasPrevious = computed(() => startIndex.value > 0);
  const hasMore = computed(() => lastIndex.value < pages.length - 1);

  function distanceToSentinel(): number | null {
    const el = sentinel.value;
    if (el) return el.getBoundingClientRect().top - window.innerHeight;
    const scrolling = document.scrollingElement;
    if (!scrolling) return null;
    return scrolling.scrollHeight - scrolling.scrollTop - window.innerHeight;
  }

  function shouldLoadMore(): boolean {
    if (!autoLoadStore.enabled.value || !hasMore.value) return false;
    const distance = distanceToSentinel();
    if (distance != null && distance < loadAheadPx()) return true;
    const scrolling = document.scrollingElement;
    if (!scrolling) return false;
    return scrolling.scrollHeight - scrolling.scrollTop - window.innerHeight < 320;
  }

  async function ensureLookahead() {
    if (pages.length === 0) return;
    if (expanding) {
      pendingLookahead = true;
      return;
    }
    expanding = true;
    pendingLookahead = false;
    try {
      let appended = 0;
      while (shouldLoadMore() && appended < MAX_APPEND_PER_TICK) {
        lastIndex.value += 1;
        appended += 1;
        await nextTick();
      }
      if (appended > 0) observe();
    } finally {
      expanding = false;
      if (pendingLookahead || shouldLoadMore()) {
        pendingLookahead = false;
        requestAnimationFrame(() => {
          void ensureLookahead();
        });
      }
    }
  }

  function requestLookahead() {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      scrollTick = false;
      void ensureLookahead();
    });
  }

  function observe() {
    observer?.disconnect();
    const el = sentinel.value;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) requestLookahead();
      },
      {
        root: null,
        rootMargin: `0px 0px ${Math.round(LOAD_AHEAD_VIEWPORTS * 100)}% 0px`,
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
    if (autoLoadStore.enabled.value) void ensureLookahead();
  }

  watch(
    () => autoLoadStore.enabled.value,
    (enabled) => {
      if (enabled) void ensureLookahead();
    },
  );

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

  watch(
    sentinel,
    () => {
      observe();
      void ensureLookahead();
    },
    { flush: 'post' },
  );

  onMounted(() => {
    observe();
    void ensureLookahead();
    window.addEventListener('scroll', requestLookahead, { passive: true });
    document.addEventListener('scroll', requestLookahead, { passive: true, capture: true });
    window.addEventListener('resize', requestLookahead, { passive: true });
    window.addEventListener('momoco:feed-check', requestLookahead);
  });

  onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener('scroll', requestLookahead);
    document.removeEventListener('scroll', requestLookahead, true);
    window.removeEventListener('resize', requestLookahead);
    window.removeEventListener('momoco:feed-check', requestLookahead);
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
