/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import {reactive} from 'vue';
import axios from 'axios';

const requestUrl =
    'https://script.google.com/macros/s/AKfycbyqELM2mm3J58BLXIjxKxIYN64x6iF6I6ctJU_Vdui6gx331Pz5R5FpuL3s-aM8nsgn/exec';

export class MemoStore {
  public static instance: MemoStore;

  public db = reactive({
    memos: <Array<string>>[]
  })

  public static getInstance(): MemoStore {
    if (!this.instance) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.instance = new MemoStore(MemoStore.getInstance);
    }
    return this.instance;
  }
  public syncSpreadSheet(){
    void axios.post(requestUrl).then(res => {
      this.db.memos = <Array<string>>res.data;
    })
  }
  constructor(caller: () => MemoStore) {
    if (caller == MemoStore.getInstance) {
      console.info('create instance of MemoStore');
      this.syncSpreadSheet();
    } else if (MemoStore.instance) {
      throw new Error(
        'Already created instance of AuthStore. You should use AuthStore.getInstance().'
      );
    } else {
      throw new Error(
        'Constractor args valided illegal. You should use AuthStore.getInstance()'
      );
    }
  }
}


export default function useMemoStore(){
  return MemoStore.getInstance()
}