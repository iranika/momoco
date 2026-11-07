/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';

const ProductDBurl =
  'https://script.google.com/macros/s/AKfycbyqELM2mm3J58BLXIjxKxIYN64x6iF6I6ctJU_Vdui6gx331Pz5R5FpuL3s-aM8nsgn/exec';

export interface SearchInfo {
  Characters: string[];
  Keyword: string[];
  Comment: string;
}

export interface SearchDB extends SearchInfo {
  No: number;
  Title: string;
}

const toStringArray = (value: unknown): string[] => {
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

const normalizeSearchInfo = (value: unknown): SearchInfo => {
  const fallback: SearchInfo = {
    Characters: [],
    Keyword: [],
    Comment: '※検索DBに情報が追記されていません',
  };

  if (value == null || typeof value !== 'object') {
    return fallback;
  }

  const raw = value as Partial<SearchInfo>;
  return {
    Characters: toStringArray(raw.Characters),
    Keyword: toStringArray(raw.Keyword),
    Comment: typeof raw.Comment === 'string' ? raw.Comment : fallback.Comment,
  };
};

export const useSearchStore = defineStore('search', () => {
  const products = ref<SearchDB[]>([]);
  let extDB: (SearchInfo | undefined)[] = [];

  async function fetch() {
    try {
      const res = await axios.get<Array<Record<number, SearchInfo>>>(ProductDBurl);
      const db = res.data;
      extDB = db.map((v, i): SearchInfo | undefined => {
        return i in v ? v[i] : undefined;
      });
      products.value = window.pageData.map((v, i) => {
        if (extDB[i]) {
          return Object.assign({ Title: v.Title, No: i + 1 }, normalizeSearchInfo(extDB[i]));
        } else {
          return Object.assign(
            { Title: v.Title, No: i + 1 },
            {
              No: i + 1,
              Title: 'Non title',
            },
            normalizeSearchInfo(undefined),
          );
        }
      });
    } catch {
      // 検索DBの取得に失敗してもストアが空のままになるだけなので握りつぶす
    }
  }

  void fetch();

  return { products, fetch };
});
