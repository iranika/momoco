import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

interface ArchivesJson {
  archivesUrl: string;
  files: string[];
}

const HEADER_IMG_KEY = 'header_img';
const BOOKMARKS_KEY = 'bookmarks';
const AUTOLOAD_KEY = 'comic_autoload';
const DEFAULT_HEADER_IMG = 'https://mo4koma.iranika.info/top/top.webp';
const ARCHIVES_JSON_URL = 'https://mo4koma.iranika.info/top/archives.json';

export const useHeaderImgStore = defineStore('headerImg', () => {
  const archives = ref<ArchivesJson>({ archivesUrl: '', files: [] });
  const current = ref(DEFAULT_HEADER_IMG);

  function getFullpath(file: string) {
    return `${archives.value.archivesUrl}/${file}`;
  }

  function setCurrent(url: string) {
    window.localStorage.setItem(HEADER_IMG_KEY, url);
    current.value = url;
  }

  function resetCurrent() {
    window.localStorage.removeItem(HEADER_IMG_KEY);
    current.value = DEFAULT_HEADER_IMG;
  }

  async function syncImageList(jsonUrl = ARCHIVES_JSON_URL) {
    try {
      const res = await axios.get<ArchivesJson>(jsonUrl);
      archives.value = res.data;
    } catch {
      // 画像一覧の取得に失敗してもヘッダー選択画面が空になるだけなので握りつぶす
    }
  }

  current.value = window.localStorage.getItem(HEADER_IMG_KEY) ?? DEFAULT_HEADER_IMG;
  void syncImageList();

  return { archives, current, getFullpath, setCurrent, resetCurrent, syncImageList };
});

export const useHeaderVisibilityStore = defineStore('headerVisibility', () => {
  const showHeader = ref(true);
  const isForced = ref(false);

  function setVisible(visible: boolean) {
    showHeader.value = visible;
  }

  function toggle() {
    showHeader.value = !showHeader.value;
  }

  function forceToggle() {
    isForced.value = true;
    showHeader.value = !showHeader.value;
  }

  function releaseForce() {
    isForced.value = false;
  }

  return { showHeader, isForced, setVisible, toggle, forceToggle, releaseForce };
});

export const useBookmarkStore = defineStore('bookmark', () => {
  const bookmarks = ref<string[]>(readBookmarks());

  function readBookmarks(): string[] {
    const raw = window.localStorage.getItem(BOOKMARKS_KEY) ?? '';
    return raw !== '' ? raw.split(',') : [];
  }

  function persist() {
    window.localStorage.setItem(BOOKMARKS_KEY, bookmarks.value.join(','));
  }

  function add(p: number | string) {
    const key = String(p);
    if (!bookmarks.value.includes(key)) {
      bookmarks.value.push(key);
    }
    persist();
  }

  function remove(p: number | string) {
    const index = bookmarks.value.indexOf(String(p));
    if (index !== -1) {
      bookmarks.value.splice(index, 1);
    }
    persist();
  }

  function toggle(p: number | string) {
    if (bookmarks.value.includes(String(p))) {
      remove(p);
    } else {
      add(p);
    }
  }

  function has(p: number | string) {
    return bookmarks.value.includes(String(p));
  }

  const sortedBookmarks = computed(() =>
    [...bookmarks.value].sort((a, b) => Number(a) - Number(b)),
  );

  return { bookmarks, sortedBookmarks, add, remove, toggle, has };
});

export const useAutoLoadStore = defineStore('autoLoad', () => {
  const enabled = ref(window.localStorage.getItem(AUTOLOAD_KEY) !== '0');

  function toggle() {
    enabled.value = !enabled.value;
    window.localStorage.setItem(AUTOLOAD_KEY, enabled.value ? '1' : '0');
  }

  return { enabled, toggle };
});
