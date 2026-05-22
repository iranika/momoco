interface Page {
  Title: string;
  ImagesUrl: Array<string>;
  Index: number | string;
}
interface Window {
  pageData: Array<Page>;
}
