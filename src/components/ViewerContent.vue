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
          alt=""
          @load="onKomaLoad($event, url)"
        />
      </div>
      <div class="episode-actions">
        <TwitterShareButton :link="CreateShareLinkTwitter(page.Index, page.Title)" />
        <q-btn
          :color="bookmarkStore.isIncludeBookmark(page.Index) ? 'grey' : 'green'"
          class="text-white"
          rounded
          size="xs"
          @click="bookmarkStore.clickBookmark(page.Index)"
        >
          <q-icon name="book" />しおり
        </q-btn>
        <q-btn
          v-if="db.memos[i]"
          color="orange"
          class="text-white"
          rounded
          size="xs"
          @click="
            memo = db.memos[i];
            memodal = !memodal;
          "
        >
          <q-icon name="book" />Memo
        </q-btn>
      </div>
    </article>

    <div v-if="hasMore" ref="sentinelEl" class="feed-sentinel" aria-hidden="true" />

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
import { defineComponent, ref, toRef } from 'vue';
import TwitterShareButton from 'components/TwitterShareButton.vue';
import useMemoStore from 'src/stores/MemoStore';
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
    const db = useMemoStore().db;
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
    }

    function CreateShareLinkTwitter(num: number | string, title: string) {
      const tw_text = encodeURI(`第${num}話「${title}」`);
      return `https://twitter.com/intent/tweet?hashtags=%E9%81%93%E8%8D%89%E5%B1%8B&original_referer=https%3A%2F%2Fpublish.twitter.com%2F%3FbuttonText%3D%25E3%2581%2593%25E3%2581%2593%25E3%2581%2599%25E3%2581%258D%25EF%25BC%2581%25EF%25BC%2581%2523%25E3%2581%25buttonUrl=BF%25E3%2581%25A1%25E3%2581%258F%25E3%2581%2595%25E3%2581%25B3%25E3%2582%2585%25E3%2581%2582%25E3%2583%25BC%26buttonType%3DTweetButton%26buttonUrl%3Dhttps%253A%252F%252F${location.host}%252F%252310%26dnt%3D1%26lang%3Dja%26widget%3DButton&ref_src=twsrc%5Etfw&text=${tw_text}&tw_p=tweetbutton&url=https%3A%2F%2F${location.host}%2F%23%2F%3Fpage%3D${num}`;
    }

    return {
      memodal,
      memo,
      db,
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
