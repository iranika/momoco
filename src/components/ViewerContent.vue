<template>
  <div class="viewer-content">
    <div v-if="hasPrevious" class="feed-nav">
      <q-btn size="x-small" color="white" class="text-black" rounded @click="prependPrevious">
        ▲前のお話▲
      </q-btn>
    </div>

    <article v-for="{ index: i, page } in visiblePages" :key="i" class="episode">
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
    <p v-if="!hasMore && visiblePages.length" class="latest-notice">これが最新話です</p>
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

.latest-notice {
  text-align: center;
  padding: 16px 10px;
  color: rgba(0, 0, 0, 0.6);
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
import { defineComponent, ref, toRef } from 'vue';
import TwitterShareButton from 'components/TwitterShareButton.vue';
import { useMemoStore } from 'src/stores/MemoStore';
import { useBookmarkStore } from 'src/stores/LocalStorage';
import { useComicFeed } from 'src/composables/useComicFeed';
import {
  formatAspectRatio,
  readStoredKomaAspect,
  writeStoredKomaAspect,
} from 'src/utils/komaAspect';

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
