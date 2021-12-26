/*
productsはGoogleスプレッドシート上の道草屋作品DBを取得するためのものです。
https://docs.google.com/spreadsheets/d/1naQXZKxTK0NyHuJK0juqCurruwj3tMqgO5dGUM2LO0w/edit?usp=sharing
*/

import {reactive} from 'vue';


export class BookmarkStore {
  public static instance: BookmarkStore;

  public bookmarks = reactive({
    value : this.getBookmark()
  })

  private getBookmark(){
    const bookmarks = window.localStorage.getItem('bookmarks') ?? '';
    return bookmarks != '' ? bookmarks.split(',') : []
  }
  public addBookmark(p: number) {
    if (!this.bookmarks.value.includes(String(p))){
        this.bookmarks.value.push(String(p))
    }
    this.setBookmark();
  }
  public removeBookmark(p: number) {
    const index = this.bookmarks.value.indexOf(String(p));
    if (index != -1) {
      this.bookmarks.value.splice(index, 1);
    }
    this.setBookmark();
  }
  private setBookmark() {
    console.log('setBookmark',this.bookmarks.value)
    window.localStorage.setItem('bookmarks', this.bookmarks.value.join(','));
  }
  public isIncludeBookmark(p: number) {
    return this.bookmarks.value.includes(String(p));
  }
  public clickBookmark(p: number){
    this.bookmarks.value.includes(String(p)) ? this.removeBookmark(p) : this.addBookmark(p)
  }
  public static getInstance(): BookmarkStore {
    if (!this.instance) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.instance = new BookmarkStore(BookmarkStore.getInstance);
    }
    return this.instance;
  }
  constructor(caller: () => BookmarkStore) {
    if (caller == BookmarkStore.getInstance) {
      console.info('create instance of BookmarkStore');
    } else if (BookmarkStore.instance) {
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

export function useBookmarkStore(){
    return BookmarkStore.getInstance()
}
