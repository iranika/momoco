/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';

const requestUrl =
  'https://script.google.com/macros/s/AKfycbyqELM2mm3J58BLXIjxKxIYN64x6iF6I6ctJU_Vdui6gx331Pz5R5FpuL3s-aM8nsgn/exec';

export const useMemoStore = defineStore('memo', () => {
  const memos = ref<string[]>([]);

  async function fetch() {
    try {
      const res = await axios.post<string[]>(requestUrl);
      memos.value = res.data;
    } catch {
      // メモの取得に失敗してもメモボタンが出ないだけなので握りつぶす
    }
  }

  void fetch();

  return { memos, fetch };
});
