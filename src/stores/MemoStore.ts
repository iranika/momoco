/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';

const requestUrl =
  'https://script.google.com/macros/s/AKfycbyqELM2mm3J58BLXIjxKxIYN64x6iF6I6ctJU_Vdui6gx331Pz5R5FpuL3s-aM8nsgn/exec';

// GASのコールドスタートを考慮して長めに取る
const REQUEST_TIMEOUT_MS = 20000;

export const useMemoStore = defineStore('memo', () => {
  const memos = ref<string[]>([]);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const errorMessage = ref('');

  async function fetch() {
    status.value = 'loading';
    errorMessage.value = '';
    try {
      const res = await axios.post<string[]>(requestUrl, undefined, {
        timeout: REQUEST_TIMEOUT_MS,
      });
      memos.value = res.data;
      status.value = 'success';
    } catch (e) {
      status.value = 'error';
      errorMessage.value = e instanceof Error ? e.message : String(e);
      Notify.create({
        type: 'negative',
        message: 'メモの取得に失敗しました。時間をおいて再読み込みしてください。',
      });
    }
  }

  void fetch();

  return { memos, status, errorMessage, fetch };
});
