/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import {reactive} from 'vue';
import axios from 'axios';

const ProductDBurl =
  'https://script.google.com/macros/s/AKfycbzXYMhKrkOm3NtwqeQMBOJYc4uTz8kIbKMYOAdP0cb_lHB1BhTG8B9yc1CTyDAe_drT/exec';

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

export class ProductsStore {
  public static instance: ProductsStore;

  public db = reactive({
    products: <Array<ProductInfo>>[]
  })

  public static getInstance(): ProductsStore {
    if (!this.instance) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.instance = new ProductsStore(ProductsStore.getInstance);
    }
    return this.instance;
  }
  public syncSpreadSheet(){
    void axios.get(ProductDBurl).then(res => {
      this.db.products = <Array<ProductInfo>>res.data;
      //すずなさんと打ち上げ花火。【お休み用バイノーラル版】だけDLsiteでの販売がないのでパッチワーク
      this.db.products[48].img = 'https://s2.booth.pm/b202d69d-2a2c-40cb-bffd-03236769e027/i/4153650/bb0183fb-e053-45f2-b5ba-7b8be5f07fff_base_resized.jpg'
      this.db.products[48].dalf = 'https://momotori.booth.pm/items/4153650'
    })
  }
  constructor(caller: () => ProductsStore) {
    if (caller == ProductsStore.getInstance) {
      console.info('create instance of ProductsStore');
      this.syncSpreadSheet();
    } else if (ProductsStore.instance) {
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


export default function useProductStore(){
  return ProductsStore.getInstance()
}