/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import {reactive} from 'vue';
import axios from 'axios';

const ProductDBurl =
    'https://script.google.com/macros/s/AKfycbyqELM2mm3J58BLXIjxKxIYN64x6iF6I6ctJU_Vdui6gx331Pz5R5FpuL3s-aM8nsgn/exec';

export interface SearchInfo {
    Charactors: string[];
    Keyword: string[];
    Comment: string;
}

export interface SearchDB extends SearchInfo {
    No: number;
    Title: string;
}

export class SearchStore {
  public static instance: SearchStore;

  public products = reactive({
    value: <Array<SearchDB>>[]
  })

  private extDB = <Array<SearchInfo>>[]

  public static getInstance(): SearchStore {
    if (!this.instance) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.instance = new SearchStore(SearchStore.getInstance);
    }
    return this.instance;
  }
  public syncSpreadSheet(){
    void axios.get(ProductDBurl).then(res => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = <Array<any>>res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.extDB = <Array<SearchInfo>>db.map((v: any, i:number)=>{
          if (i in v){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return <SearchInfo>v[i]
          }
      })
      this.products.value = window.pageData.map((v,i)=>{
          if (this.extDB[i]){
              return Object.assign({ Title: v.Title, No: i + 1 }, this.extDB[i])
          }else{
            return Object.assign({ Title: v.Title, No: i + 1 },{
                No: i + 1,
                Title: 'Non title',
                Charactors: [],
                Keyword: [],
                Comment: '※検索DBに情報が追記されていません'
              })
          }
      })
      console.log(this.products.value)
    })
  }
  constructor(caller: () => SearchStore) {
    if (caller == SearchStore.getInstance) {
      console.info('create instance of SearchStore');
      this.syncSpreadSheet();
    } else if (SearchStore.instance) {
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


export function useSearchStore(){
  return SearchStore.getInstance()
}