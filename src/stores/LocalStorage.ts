/*
*/

import {reactive} from 'vue';

export class HeaderImgStore{
  public static instance: HeaderImgStore;

  public imgList = reactive({
    value: this.getImageList()
  })

  public current = reactive({
    value: "https://mo4koma.iranika.info/top/achives/"
  })

  public getImageList(){
    //TODO:画像リストを取得する
    return [
      "https://mo4koma.iranika.info/top/archives/seri7y.jpg"
    ]
  }

  public static getInstance(): HeaderImgStore {
    if (!this.instance) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.instance = new HeaderImgStore(HeaderImgStore.getInstance);
    }
    return this.instance;
  }
  constructor(caller: () => HeaderImgStore) {
    if (caller == HeaderImgStore.getInstance) {
      console.info('create instance of HeaderImgStore');
    } else if (HeaderImgStore.instance) {
      throw new Error(
        'Already created instance of HeaderImgStore. You should use HeaderImgStore.getInstance().'
      );
    } else {
      throw new Error(
        'Constractor args valided illegal. You should use HeaderImgStore.getInstance()'
      );
    }
  }
}

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
        'Already created instance of BookmarkStore. You should use BookmarkStore.getInstance().'
      );
    } else {
      throw new Error(
        'Constractor args valided illegal. You should use BookmarkStore.getInstance()'
      );
    }
  }
}

export function useBookmarkStore(){
    return BookmarkStore.getInstance()
}
