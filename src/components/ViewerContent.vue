<template>
  <div ref="rootEl" class="viewer-content">
    <div v-if="hasPrevious" class="feed-nav">
      <q-btn size="x-small" color="white" class="text-black" rounded @click="prependPrevious">
        ▲前のお話▲
      </q-btn>
    </div>

    <article
      v-for="{ index: i, page } in visiblePages"
      :key="i"
      class="episode"
      :data-episode-index="page.Index"
    >
      <div
        v-for="(url, j) in page.ImagesUrl"
        :key="j"
        class="koma-frame"
        :style="komaFrameStyle(url)"
      >
        <img
          :src="url.replace('/ja/', '/ja/webp/').replace('.jpg', '.webp')"
          class="img4koma"
          width="1408"
          height="1850"
          decoding="async"
          :loading="i === startIndex ? 'eager' : 'lazy'"
          :fetchpriority="i === startIndex && j === 0 ? 'high' : 'low'"
          :alt="`第${page.Index}話 ${j + 1}コマ目`"
          @load="onKomaLoad($event, url)"
        />
      </div>
      <div class="episode-actions">
        <TwitterShareButton :link="CreateShareLinkTwitter(page.Index, page.Title)" />
        <q-btn
          :color="bookmarkStore.has(page.Index) ? 'grey' : 'green'"
          class="text-white"
          rounded
          size="xs"
          @click="bookmarkStore.toggle(page.Index)"
        >
          <q-icon name="book" />しおり
        </q-btn>
        <q-btn
          v-if="memoStore.memos[i]"
          color="orange"
          class="text-white"
          rounded
          size="xs"
          @click="
            memo = memoStore.memos[i];
            memodal = !memodal;
          "
        >
          <q-icon name="book" />Memo
        </q-btn>
      </div>
    </article>

    <div ref="sentinelEl" class="feed-sentinel" aria-hidden="true" />

    <q-dialog v-model="memodal">
      <q-card>
        <q-card-section>
          <div class="text-h6">ひとくちメモ</div>
          <q-space />
        </q-card-section>
        <q-card-section>
          <div v-html="memo" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="閉じる" v-close-popup @click="memodal = !memodal" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div v-if="hasMore" class="feed-nav">
      <q-btn size="x-small" color="white" class="text-black" rounded @click="appendNext">
        ▼続きを表示▼
      </q-btn>
    </div>
  </div>
</template>

<style scoped>
.viewer-content {
  max-width: 1280px;
  margin: 0 auto;
}

.feed-nav {
  text-align: center;
  padding: 10px;
}

.episode-actions {
  display: flex;
  justify-content: center;
}

.feed-sentinel {
  width: 100%;
  height: 1px;
  pointer-events: none;
}

.koma-frame {
  width: 100%;
  aspect-ratio: var(--koma-ar, 1408 / 1850);
  background-color: rgba(255, 255, 255, 0.28);
  overflow: hidden;
}

.img4koma {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, ref, toRef, watch } from 'vue';
import TwitterShareButton from 'components/TwitterShareButton.vue';
import { useMemoStore } from 'src/stores/MemoStore';
import { useBookmarkStore } from 'src/stores/LocalStorage';
import { useComicFeed } from 'src/composables/useComicFeed';
import {
  formatAspectRatio,
  readStoredKomaAspect,
  writeStoredKomaAspect,
} from 'src/utils/komaAspect';
import { advanceReadingPosition } from 'src/utils/readingPosition';

export default defineComponent({
  components: {
    TwitterShareButton,
  },
  props: {
    page: {
      type: String,
      default: '1',
    },
    lang: {
      type: String,
      default: 'ja',
    },
  },

  setup(props) {
    const memodal = ref(false);
    const memo = ref('');
    const memoStore = useMemoStore();
    const bookmarkStore = useBookmarkStore();
    const sentinelEl = ref<HTMLElement | null>(null);

    const pages = window.pageData ?? [];
    const komaAspect = ref<Record<string, string>>(readStoredKomaAspect());
    const pageQuery = toRef(props, 'page');

    const feed = useComicFeed(pages, pageQuery, komaAspect, sentinelEl);
    const rootEl = ref<HTMLElement | null>(null);
    let scrollTick = false;

    // 画面に実際に到達した話の Index を保存し、次回ホームを開いたときに再開できるようにする。
    // lastIndex(先読み込みの末尾)ではなく DOM 上の表示位置から求める。
    function saveReadingPosition() {
      const root = rootEl.value;
      if (!root) return;
      const viewportBottom = window.innerHeight;
      let furthest: number | null = null;
      const articles = root.querySelectorAll<HTMLElement>('article.episode');
      for (const el of articles) {
        if (el.getBoundingClientRect().top >= viewportBottom) break;
        const index = Number(el.dataset.episodeIndex);
        if (Number.isInteger(index) && index > 0 && (furthest == null || index > furthest)) {
          furthest = index;
        }
      }
      if (furthest != null) advanceReadingPosition(furthest);
    }

    function scheduleSave() {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        scrollTick = false;
        saveReadingPosition();
      });
    }

    watch(feed.visiblePages, scheduleSave, { flush: 'post' });

    onMounted(() => {
      window.addEventListener('scroll', scheduleSave, { passive: true });
      void nextTick(() => saveReadingPosition());
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', scheduleSave);
    });

    function komaFrameStyle(url: string) {
      const ar = komaAspect.value[url];
      return ar ? { '--koma-ar': ar } : undefined;
    }

    function onKomaLoad(event: Event, url: string) {
      const img = event.target;
      if (!(img instanceof HTMLImageElement) || !img.naturalWidth || !img.naturalHeight) {
        return;
      }
      const next = formatAspectRatio(img.naturalWidth, img.naturalHeight);
      if (komaAspect.value[url] === next) return;
      const updated = { ...komaAspect.value, [url]: next };
      komaAspect.value = updated;
      writeStoredKomaAspect(updated);
      void feed.ensureLookahead();
    }

    function CreateShareLinkTwitter(num: number | string, title: string) {
      const text = `第${num}話「${title}」`;
      const url = `https://${location.host}/#/?page=${num}`;
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent('道草屋')}`;
    }

    return {
      memodal,
      memo,
      memoStore,
      sentinelEl,
      rootEl,
      startIndex: feed.startIndex,
      visiblePages: feed.visiblePages,
      hasPrevious: feed.hasPrevious,
      hasMore: feed.hasMore,
      prependPrevious: feed.prependPrevious,
      appendNext: feed.appendNext,
      komaFrameStyle,
      onKomaLoad,
      CreateShareLinkTwitter,
      bookmarkStore,
    };
  },
});
</script>
