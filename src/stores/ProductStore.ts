/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';

const ProductDBurl =
  'https://script.google.com/macros/s/AKfycbzXYMhKrkOm3NtwqeQMBOJYc4uTz8kIbKMYOAdP0cb_lHB1BhTG8B9yc1CTyDAe_drT/exec';

// GASのコールドスタートを考慮して長めに取る
const REQUEST_TIMEOUT_MS = 20000;

export interface ProductInfo {
  No: number;
  title: string;
  release: Date;
  mainAct: Array<string>;
  subAct: Array<string>;
  link: string;
  dalf: string;
  banner: string;
  hints: Array<string>;
  img: string;
}

export const useProductStore = defineStore('product', () => {
  const products = ref<ProductInfo[]>([]);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const errorMessage = ref('');

  async function fetch() {
    status.value = 'loading';
    errorMessage.value = '';
    try {
      const res = await axios.get<ProductInfo[]>(ProductDBurl, {
        timeout: REQUEST_TIMEOUT_MS,
      });
      const list = res.data;
      //すずなさんと打ち上げ花火。【お休み用バイノーラル版】(No.49)だけDLsiteでの販売がないのでパッチワーク
      const patched = list.find((p) => p.No === 49);
      if (patched) {
        patched.img =
          'https://s2.booth.pm/b202d69d-2a2c-40cb-bffd-03236769e027/i/4153650/bb0183fb-e053-45f2-b5ba-7b8be5f07fff_base_resized.jpg';
        patched.dalf = 'https://momotori.booth.pm/items/4153650';
      }
      products.value = list;
      status.value = 'success';
    } catch (e) {
      status.value = 'error';
      errorMessage.value = e instanceof Error ? e.message : String(e);
      Notify.create({
        type: 'negative',
        message: '作品DBの取得に失敗しました。時間をおいて再読み込みしてください。',
      });
    }
  }

  void fetch();

  return { products, status, errorMessage, fetch };
});
