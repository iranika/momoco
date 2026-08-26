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
  href?: string;
}

export const MOCK_DLSITE_WORKS: DlsiteWorkMock[] = [
  {
    id: 'rj-seri',
    title: 'せりさんぷる',
    maker: '道草屋',
    price: '¥1,100',
    coverLabel: 'せり',
    coverTone: 'linear-gradient(145deg, #c45c6a 0%, #8b2e3c 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-suzu',
    title: 'しろさんぷる',
    maker: '道草屋',
    price: '¥1,100',
    coverLabel: 'しろ',
    coverTone: 'linear-gradient(145deg, #6aa8c9 0%, #2d5f7c 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-zuna',
    title: 'ずなさんぷる',
    maker: '道草屋',
    price: '¥1,320',
    coverLabel: 'ずな',
    coverTone: 'linear-gradient(145deg, #7bc47a 0%, #2f6b3a 100%)',
    href: '/#/dlsite',
  },
  {
    id: 'rj-hako',
    title: 'はこさんぷる',
    maker: '道草屋',
    price: '¥1,320',
    coverLabel: 'はこ',
    coverTone: 'linear-gradient(145deg, #c9a06a 0%, #7a4e22 100%)',
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
    href: 'https://twitter.com/happy_packet',
  },
  {
    id: 'slot-2',
    vacant: true,
    title: '空き枠',
    advertiser: '',
    note: '広告・作品紹介を出したい方向けの出品スロットです。',
  },
];
