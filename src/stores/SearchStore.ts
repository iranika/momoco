/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';

const ProductDBurl =
  'https://script.google.com/macros/s/AKfycbyqELM2mm3J58BLXIjxKxIYN64x6iF6I6ctJU_Vdui6gx331Pz5R5FpuL3s-aM8nsgn/exec';

// GASのコールドスタートを考慮して長めに取る
const REQUEST_TIMEOUT_MS = 20000;

export interface SearchInfo {
  Characters: string[];
  Keyword: string[];
  Comment: string;
}

export interface SearchDB extends SearchInfo {
  No: number;
  Title: string;
}

export const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }
  if (typeof value === 'string') {
    return value
      .split(/,|、/)
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }
  return [];
};

export const normalizeSearchInfo = (value: unknown): SearchInfo => {
  const fallback: SearchInfo = {
    Characters: [],
    Keyword: [],
    Comment: '※検索DBに情報が追記されていません',
  };

  if (value == null || typeof value !== 'object') {
    return fallback;
  }

  const raw = value as {
    Characters?: unknown;
    // スプレッドシート側の見出しが Charactors(綴り違い)のため両方を受け付ける
    Charactors?: unknown;
    Keyword?: unknown;
    Comment?: unknown;
  };
  return {
    Characters: toStringArray(raw.Characters ?? raw.Charactors),
    Keyword: toStringArray(raw.Keyword),
    Comment: typeof raw.Comment === 'string' ? raw.Comment : fallback.Comment,
  };
};

/*
GASのレスポンスは [{ "<話数index>": { Characters, Keyword, Comment } }, ...] の形式。
行の並び順ではなくオブジェクトのキー(話数index)を使って対応付けることで、
スプレッドシートで行の挿入・並べ替えがあっても別の話の情報が紐づかないようにする。
*/
export const toSearchInfoMap = (rows: unknown): Map<number, SearchInfo> => {
  const map = new Map<number, SearchInfo>();
  if (!Array.isArray(rows)) {
    return map;
  }
  rows.forEach((row, index) => {
    if (row == null || typeof row !== 'object') {
      return;
    }
    const entries = Object.entries(row as Record<string, unknown>);
    const first = entries[0];
    if (!first) {
      return;
    }
    const [key, value] = first;
    const episodeIndex = key !== '' ? Number(key) : index;
    if (!Number.isInteger(episodeIndex)) {
      return;
    }
    map.set(episodeIndex, normalizeSearchInfo(value));
  });
  return map;
};

export const useSearchStore = defineStore('search', () => {
  const products = ref<SearchDB[]>([]);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const errorMessage = ref('');

  async function fetch() {
    status.value = 'loading';
    errorMessage.value = '';
    try {
      const res = await axios.get<unknown>(ProductDBurl, {
        timeout: REQUEST_TIMEOUT_MS,
      });
      const infoMap = toSearchInfoMap(res.data);
      const pages = window.pageData ?? [];
      products.value = pages.map((page, i) => {
        const info = infoMap.get(i) ?? normalizeSearchInfo(undefined);
        return { No: i + 1, Title: page.Title, ...info };
      });
      status.value = 'success';
    } catch (e) {
      status.value = 'error';
      errorMessage.value = e instanceof Error ? e.message : String(e);
      Notify.create({
        type: 'negative',
        message: '検索DBの取得に失敗しました。時間をおいて再読み込みしてください。',
      });
    }
  }

  void fetch();

  return { products, status, errorMessage, fetch };
});
