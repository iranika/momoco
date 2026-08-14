<template>
  <div class="viewer-content" v-scroll="scrolled">
    <div centered style="text-align: center; padding: 10px" v-if="Math.min.apply(null, show) > 0">
      <q-btn size="x-small" color="white" class="text-black" @click="beforeContent" rounded
        >▲前のお話▲</q-btn
      >
    </div>
    <div v-for="{ index: i, page } in visiblePages" :key="i">
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
          :fetchpriority="i === show[0] && j === 0 ? 'high' : 'low'"
          alt=""
          @load="onKomaLoad($event, url)"
        />
      </div>
      <div style="display: flex; justify-content: center">
        <TwitterShareButton :link="CreateShareLinkTwitter(page.Index, page.Title)" />
        <!-- NOTE:ブックマーク機能の実装 -->
        <q-btn
          :color="bookmarkStore.isIncludeBookmark(page.Index) ? 'grey' : 'green'"
          class="text-white"
          rounded
          size="xs"
          @click="bookmarkStore.clickBookmark(page.Index)"
          ><q-icon name="book" />しおり</q-btn
        >
        <!-- NOTE: MEMOボタンの実装 -->
        <q-btn
          color="orange"
          class="text-white"
          rounded
          size="xs"
          v-if="db.memos[i] && db.memos[i] != null"
          v-on:click="
            memo = db.memos[i];
            memodal = !memodal;
          "
        >
          <q-icon name="book" />Memo
        </q-btn>
      </div>
    </div>
    <!-- メモモーダル -->
    <q-dialog v-model="memodal">
      <q-card>
        <q-card-section>
          <div class="text-h6">ひとくちメモ</div>
          <q-space></q-space>
        </q-card-section>
        <q-card-section>
          <div v-html="memo"></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            type="text"
            label="閉じる"
            v-close-popup
            flat
            v-on:click="memodal = !memodal"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div centered style="text-align: center; padding: 10px">
      <q-btn
        rounded
        size="x-small"
        v-on:click="addContent()"
        color="white"
        class="text-black"
        v-if="pages.length - 1 > Math.max.apply(null, show)"
        >▼続きを表示▼</q-btn
      >
    </div>
  </div>
</template>

<style scoped>
.viewer-content {
  max-width: 1280px;
  margin: 0 auto 0 auto;
}

/* Reserve space before the WebP decodes. Default matches early 4-koma (1408x1850). */
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
import { debounce } from 'quasar';
import { computed, defineComponent, ref, watch } from 'vue';
import TwitterShareButton from 'components/TwitterShareButton.vue';
import useMemoStore from 'src/stores/MemoStore';
import { useBookmarkStore } from 'src/stores/LocalStorage';

interface Page {
  Title: string;
  ImagesUrl: Array<string>;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
  pageData: Array<Page>;
}

export default defineComponent({
  // name: 'ComponentName'
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
    //TODO: Twitterボタン
    //TODO: MEMO
    //TODO: Bookmark

    const memodal = ref(false);
    const memo = ref('');
    const db = useMemoStore().db;

    const bookmarkStore = useBookmarkStore();

    const pages = window.pageData;
    const show = ref<Array<number>>(initShow(props.page));

    const visiblePages = computed(() =>
      show.value.flatMap((i) => {
        const page = pages[i];
        return page ? [{ index: i, page }] : [];
      }),
    );

    const KOMA_ASPECT_KEY = 'koma_aspect_ratios';

    function readStoredKomaAspect(): Record<string, string> {
      try {
        const raw = window.localStorage.getItem(KOMA_ASPECT_KEY);
        return raw ? (JSON.parse(raw) as Record<string, string>) : {};
      } catch {
        return {};
      }
    }

    const komaAspect = ref<Record<string, string>>(readStoredKomaAspect());

    function komaFrameStyle(url: string) {
      const ar = komaAspect.value[url];
      return ar ? { '--koma-ar': ar } : undefined;
    }

    function onKomaLoad(event: Event, url: string) {
      const img = event.target;
      if (!(img instanceof HTMLImageElement) || !img.naturalWidth || !img.naturalHeight) {
        return;
      }
      const next = `${img.naturalWidth} / ${img.naturalHeight}`;
      if (komaAspect.value[url] === next) return;
      const updated = { ...komaAspect.value, [url]: next };
      komaAspect.value = updated;
      try {
        window.localStorage.setItem(KOMA_ASPECT_KEY, JSON.stringify(updated));
      } catch {
        // Ignore quota / private-mode failures; in-memory ratios still apply.
      }
    }

    function addContent(addnum = 1) {
      if (pages.length - 1 > Math.max.apply(null, show.value)) {
        show.value.push(Math.max.apply(null, show.value) + addnum);
      } else {
        console.log('viewerContent info: show.length is over pages.length');
      }
    }

    function beforeContent() {
      if (Math.min.apply(null, show.value) > 0) {
        show.value.unshift(Math.min.apply(null, show.value) - 1);
      } else {
        console.log('viewerContent info: can not show page under 0');
      }
    }
    function bottomVisible() {
      const scrollY = window.scrollY;
      const visible = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY + 2 >= pageHeight; // +2 is margin
      //console.log("bottomVisible is fired", {scrollY, visible, pageHeight, bottomOfPage})
      return bottomOfPage || pageHeight < visible;
    }

    const scrolled = debounce(() => {
      if (bottomVisible()) {
        addContent();
      }
    }, 200);

    function initShow(page: string) {
      const pageInt = parseInt(page);
      //const ZureMin = 3
      //const ZureMax = 80
      if (page === 'latest') {
        return [pages.length - 1];
      } else if (page === 'ri') {
        return [80];
      } else if (0 < pageInt && pageInt <= pages.length) {
        const match = pages.find((v) => String(v.Index) == page);
        const idx = match ? pages.indexOf(match) : -1;
        return idx >= 0 ? [idx] : [0];
      } else if (pageInt <= 0) {
        return [0];
      } else {
        console.log('?page query is unknown value');
        return [0];
      }
    }
    function CreateShareLinkTwitter(num: number | string, title: string) {
      const tw_text = encodeURI(`第${num}話「${title}」`);
      return `https://twitter.com/intent/tweet?hashtags=%E9%81%93%E8%8D%89%E5%B1%8B&original_referer=https%3A%2F%2Fpublish.twitter.com%2F%3FbuttonText%3D%25E3%2581%2593%25E3%2581%2593%25E3%2581%2599%25E3%2581%258D%25EF%25BC%2581%25EF%25BC%2581%2523%25E3%2581%25buttonUrl=BF%25E3%2581%25A1%25E3%2581%258F%25E3%2581%2595%25E3%2581%25B3%25E3%2582%2585%25E3%2581%2582%25E3%2583%25BC%26buttonType%3DTweetButton%26buttonUrl%3Dhttps%253A%252F%252F${location.host}%252F%252310%26dnt%3D1%26lang%3Dja%26widget%3DButton&ref_src=twsrc%5Etfw&text=${tw_text}&tw_p=tweetbutton&url=https%3A%2F%2F${location.host}%2F%23%2F%3Fpage%3D${num}`;
    }

    watch(
      () => props.page,
      (page) => {
        show.value = initShow(page);
      },
      { deep: true },
    );

    return {
      memodal,
      memo,
      db,
      pages,
      show,
      visiblePages,
      komaFrameStyle,
      onKomaLoad,
      addContent,
      beforeContent,
      scrolled,
      CreateShareLinkTwitter,
      bookmarkStore,
    };
  },
  methods: {},
});
</script>
