/** Footer ad mock data. Not connected to DLsite affiliate or any ad server. */

export interface DlsiteWorkMock {
  id: string;
  title: string;
  maker: string;
  price: string;
  coverLabel: string;
  coverTone: string;
  href: string;
}

export interface ListingSlotMock {
  id: string;
  vacant: boolean;
  title: string;
  advertiser: string;
  note: string;
  accent: string;
  href?: string;
}

export const MOCK_DLSITE_WORKS: DlsiteWorkMock[] = [
  {
    id: 'rj-seri',
    title: 'せりさんぷる',
    maker: '道草屋',
    price: '¥1,100',
    coverLabel: 'せり',
    coverTone: 'linear-gradient(160deg, #d66b78 0%, #8b2e3c 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-suzu',
    title: 'しろさんぷる',
    maker: '道草屋',
    price: '¥1,100',
    coverLabel: 'しろ',
    coverTone: 'linear-gradient(160deg, #7bb7d4 0%, #2d5f7c 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-zuna',
    title: 'ずなさんぷる',
    maker: '道草屋',
    price: '¥1,320',
    coverLabel: 'ずな',
    coverTone: 'linear-gradient(160deg, #8ed08c 0%, #2f6b3a 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-hako',
    title: 'はこさんぷる',
    maker: '道草屋',
    price: '¥1,320',
    coverLabel: 'はこ',
    coverTone: 'linear-gradient(160deg, #d4ae78 0%, #7a4e22 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-ine',
    title: 'いねさんぷる',
    maker: '道草屋',
    price: '¥1,540',
    coverLabel: 'いね',
    coverTone: 'linear-gradient(160deg, #b89ad4 0%, #5a3a7a 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-tabi',
    title: 'たびさんぷる',
    maker: '道草屋',
    price: '¥1,540',
    coverLabel: 'たび',
    coverTone: 'linear-gradient(160deg, #e0a070 0%, #8a4a28 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-uri',
    title: 'うりさんぷる',
    maker: '道草屋',
    price: '¥1,210',
    coverLabel: 'うり',
    coverTone: 'linear-gradient(160deg, #74c7c0 0%, #2a6b66 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-natsu',
    title: 'なっちゃんさんぷる',
    maker: '道草屋',
    price: '¥1,210',
    coverLabel: 'なつ',
    coverTone: 'linear-gradient(160deg, #e08a9a 0%, #8a3a4a 100%)',
    href: '/#/dlsite',
  },
];

export const MOCK_LISTING_SLOTS: ListingSlotMock[] = [
  {
    id: 'slot-1',
    vacant: false,
    title: 'サンプル出品：同人音声サークル',
    advertiser: 'モック広告主 A',
    note: '掲載イメージです。実在の広告ではありません。',
    accent: 'linear-gradient(120deg, #4a90c8 0%, #2d5f8a 100%)',
    href: 'https://twitter.com/happy_packet',
  },
  {
    id: 'slot-2',
    vacant: false,
    title: 'サンプル出品：同人グッズ屋さん',
    advertiser: 'モック広告主 B',
    note: 'バナー掲載のイメージです。',
    accent: 'linear-gradient(120deg, #c87a4a 0%, #8a4a2d 100%)',
    href: 'https://twitter.com/happy_packet',
  },
  {
    id: 'slot-3',
    vacant: true,
    title: '空き枠：広告募集中',
    advertiser: '',
    note: '広告・作品紹介を出したい方向けの出品スロットです。',
    accent: 'linear-gradient(120deg, #9aa0a6 0%, #6a7076 100%)',
  },
];
