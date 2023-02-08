export const GOD_QUERY_STRING = {
  YG: 'year gods',
  MG: 'month gods',
  DG: 'day gods',
  HG: 'hour gods',
  TDG: 'this day gods',
  DBYG: 'day of yellow-black god',
  HBYG: 'hour of yellow-black god',
  DTG: 'duty god',
  YLLG: 'year of long-life god',
  MLLG: 'month of long-life god',
  DLLG: 'day of long-life god',
  HLLG: 'hour of long-life god',
  GA: 'good act',
  GA1: 'good act 1',
  GA2: 'good act 2',
  GA3: 'good act 3',
  BA: 'bad act',
  BA1: 'bad act 1',
  BA2: 'bad act 2',
  BA3: 'bad act 3'
}

// 遇德之德
export const MEETING_DES = ['月德', '月德合', '天德', '天德合']
export const MEETING_DES_SET = new Set(MEETING_DES)

// 赦愿
export const PARDON_WISH = ['天赦', '天願']
export const PARDON_WISH_SET = new Set(PARDON_WISH)

// 用于评定宜忌等第的神煞
export const LEVEL_SIGNGOD_LIST = [
  '相日',
  '月建',
  '時德',
  '六合',
  '天吏',
  '月令長生',
  '官日',
  '除日',
  '執日',
  '開日',
  '滿日',
  '民日',
  '月破',
  '危日',
  '建日',
  '月德',
  '大會',
  '守日',
  '成日',
  '定日',
  '德'
]

export const LEVEL_GOD_KEYS = [
  '平日',
  '收日',
  '閉日',
  '劫煞',
  '災煞',
  '月煞',
  '月刑',
  '月害',
  '月厭',
  '大時',
  '天吏'
] as const

export const GOD_LEVEL_DICT: {
  [key in LevelGodKey]: [number, number[], string[]][]
} = {
  平日: [
    [0, [11], ['相日', '時德', '六合']],
    [1, [6], ['相日', '六合', '月刑']],
    [2, [8], ['相日', '月害']],
    [3, [2], ['相日', '月害', '月刑']],
    [3, [3, 6, 9], ['天吏']],
    [4, [1, 4, 7, 10], ['月煞']],
    [4, [0], ['天吏', '月刑']]
  ],
  收日: [
    [0, [2, 8], ['月令長生', '六合', '劫煞']],
    [2, [5, 11], ['月令長生', '劫煞']],
    [2, [4, 7], ['月害']],
    [3, [0, 6, 9], ['大時']],
    [3, [1, 10], ['月刑']],
    [4, [3], ['大時']]
  ],
  閉日: [
    [3, [0, 3, 6, 9], ['王日']],
    [3, [1, 4, 7, 10], ['官日', '天吏']],
    [4, [2, 5, 8, 11], ['月煞']]
  ],
  劫煞: [
    [0, [2, 8], ['月令長生', '六合', '收日']],
    [1, [1, 4, 7, 10], ['除日', '相日']],
    [2, [5, 11], ['月令長生', '月害', '收日']],
    [3, [0, 3, 6, 9], ['執日']]
  ],
  災煞: [
    [1, [2, 5, 8, 10], ['開日']],
    [2, [1, 4, 7, 10], ['滿日', '民日']],
    [4, [0, 6], ['月破']],
    [5, [0, 6], ['月厭']]
  ],
  月煞: [
    [1, [3, 9], ['六合', '危日']],
    [3, [0, 6], ['月害', '危日']],
    [4, [2, 5, 8, 11], ['閉日']],
    [4, [1, 4, 7, 10], ['平日']]
  ],
  月刑: [
    [1, [5], ['平日', '六合', '相日']],
    [3, [2], ['相日', '月害', '平日']],
    [3, [4, 9, 11], ['建日']],
    [3, [1, 10], ['收日']],
    [4, [0], ['平日', '天吏']],
    [4, [3], ['收日', '大時']],
    [4, [7, 8], ['月破']],
    [4, [6], ['月建', '月厭', '月德', '大會']]
  ],
  月害: [
    [2, [3, 9], ['守日', '除日']],
    [2, [1, 7], ['執日', '大時']],
    [2, [5, 11], ['月令長生', '劫煞']],
    [2, [8], ['相日', '平日']],
    [3, [0, 6], ['月煞']],
    [3, [4, 10], ['官日', '閉日', '天吏']],
    [3, [2], ['相日', '平日', '月刑']]
  ],
  月厭: [
    [2, [2, 8], ['成日']],
    [2, [1, 7], ['開日']],
    [3, [4, 10], ['定日']],
    [3, [5, 11], ['滿日']],
    [4, [0], ['月建', '德', '大會']],
    [4, [6], ['月建', '月刑', '德', '大會']],
    [5, [3, 9], ['月破', '災煞']]
  ],
  大時: [
    [0, [2, 5, 8, 11], ['除日', '官日']],
    [0, [4, 10], ['執日', '六合']],
    [2, [1, 7], ['執日', '月害']],
    [3, [0, 6, 9], ['收日']],
    [4, [3], ['收日', '月刑']]
  ],
  天吏: [
    [2, [2, 5, 8, 11], ['危日']],
    [3, [1, 4, 7, 10], ['閉日']],
    [3, [3, 6, 9], ['平日']],
    [4, [0], ['平日', '月刑']]
  ]
}

export const YMDH_SINGLE_LOWER = ['y', 'm', 'd', 'h']
export const YMDH_SINGLE_LOWER_SET = new Set(YMDH_SINGLE_LOWER)

export type LevelGodKey = (typeof LEVEL_GOD_KEYS)[number]

export type ProcessData = {
  gods: Set<string>
  signGods: Set<string>
  mdsbActs: string[] // 遇德犹忌
  mwsbActs: string[] // 遇赦愿犹忌
  acts: ActsSet
  gRemove: {
    good: string[]
    bad: string[]
  }
  gOnlySign: string[]
}

// 九醜日的天干地支
export const NINE_UGLILY_DAY = new Set([24, 54, 48, 18, 51, 15, 27, 21, 45, 57])
export const NINE_UGLILY_TERM_ORDER = [2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1] // 十一月月將（冬至）開始
