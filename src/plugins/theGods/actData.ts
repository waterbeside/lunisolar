import { isNumber } from '../../utils'

const a001 = '祈福 求嗣'
const a001a = '祭祀 祈福 求嗣'
const a001b = '祈福 求嗣 上冊進表章 施恩封拜 詔命公卿'
const a002 = '覃恩 肆赦'
const a003 = '施恩封拜 詔命公卿'
const a003a = `${a001a} 上冊進表章 頒詔 ${a002} ${a003}`
const a004 = '招賢 舉正直'
const a005 = '施恩惠 恤孤煢'
const a006 = '宣政事 布政事'
const a007 = '雪冤枉 緩刑獄'
const a007a = '行惠愛 雪冤枉 緩刑獄'
const a008 = '慶賜 賞賀 宴會'
const a008a = `${a004} ${a005} ${a006} ${a007} ${a008}`
const a009 = '行幸 遣使'
const a010 = '安撫邊境 選將訓兵 出師'
const a011 = '上官赴任 臨政親民'
const a011a = `${a010} ${a011}`
const a011b = `襲爵受封 ${a011}`
const a012 = '結婚姻 納采問名'
const a012a = '結婚姻 納采問名 嫁娶'
const a012b = '結婚姻 納采問名 嫁娶 進人口'
const a013 = '般移 安床'
const a013a = '般移 遠回'
const a014 = '整容 剃頭 整手足甲'
const a014a = '解除 整容 剃頭 整手足甲'
const a015 = '求醫療病'
const a016 = '營建宮室 修宮室 繕城郭'
const a017 = '興造動土 豎柱上梁'
const a017a = `${a017} 修倉庫`
const a017b = `營建宮室 修宮室 繕城郭 筑堤防 興造動土 豎柱上梁 修倉庫`
const a018 = '經絡 醞釀'
const a019 = '開市 立券 交易'
const a019a = '開市 立券 交易 納財'
const a020 = '開倉庫 出貨財'
const a020a = '開市 立券 交易 納財 開倉庫 出貨財'
const a020b = '修倉庫 開市 立券 交易 納財 開倉庫 出貨財'
const a021 = '修置產室'
const a022 = '破屋壞垣 開渠穿井'
const a023 = '修飾垣墻 破屋壞垣'
const a024 = '栽種 牧養 納畜'
const a025 = '破土 安葬'
const a025a = '破土 安葬 啟攢'
const a026 = '取漁 乘船渡水'
const a027 = '捕捉 畋獵 取漁'

const actDict = {
  a001,
  a001a,
  a001b,
  a002,
  a003,
  a003a,
  a004,
  a005,
  a006,
  a007,
  a007a,
  a008,
  a008a,
  a009,
  a010,
  a011,
  a011a,
  a011b,
  a012,
  a012a,
  a012b,
  a013,
  a013a,
  a014,
  a014a,
  a015,
  a016,
  a017,
  a017a,
  a017b,
  a018,
  a019,
  a019a,
  a020,
  a020a,
  a020b,
  a021,
  a022,
  a023,
  a024,
  a025,
  a025a,
  a026,
  a027
}

type ActGroupKey = keyof typeof actDict

// 通書六十事
export const commonActsStr =
  '祭祀 祈福 求嗣 上冊受封 上表章 襲爵受封 ' +
  '會親友 入學 冠帶 出行 上官赴任 臨政親民 ' +
  '結婚姻 納采問名 嫁娶 進人口 移徙 遠回 ' +
  '安床 解除 沐浴 剃頭 整手足甲 求醫療病 ' +
  '療目 針刺 裁衣 筑堤防 修造動土 豎柱上梁 ' +
  '修倉庫 鼓鑄 苫蓋 經絡 醞釀 開市 ' +
  '立券 交易 納財 開倉庫 出貨財 修置產室 ' +
  '開渠穿井 安碓磑 補垣塞穴 掃舍宇 修飾垣墻 平治道涂 ' +
  '破屋壞垣 伐木 捕捉 畋獵 取魚 乘船渡水 ' +
  '栽種 牧養 納畜 破土 安葬 啟攢'

export const commonActs = commonActsStr.split(' ')

// 御用六十七事
export const emperorActsStr =
  '祭祀 祈福 求嗣 上刪進表章 頒詔 覃恩 ' +
  '肆赦 施恩封拜 詔命公卿 招賢 舉正直 施恩惠 ' +
  '恤孤煢 宣政事 布政事 行惠愛 雪冤枉 緩刑獄 ' +
  '慶幸 賞賀 宴會 入學 冠帶 行幸 ' +
  '遣使 安撫邊境 選將訓兵 出師 上官赴任 臨政親民 ' +
  '結婚姻 納采問名 嫁娶 進人口 般移 安床 ' +
  '解除 沐浴 剃頭 整手足甲 求醫療病 製裁 ' +
  '營建宮室 修宮室 繕城郭 筑堤防 興造動土 豎柱上梁 ' +
  '經絡 開市 立券 交易 納財 修置產室 ' +
  '開渠穿井 安碓磑 補垣 掃舍宇 修飾垣墻 平治道涂 ' +
  '伐木 捕捉 畋獵 取魚 栽種 牧養 納畜'

export const emperorActs = emperorActsStr.split(' ')

// 民用三十七事
export const civilActsStr =
  '祭祀 上表章 上官 入學 冠帶 結婚姻 ' +
  '會親友 嫁娶 進人口 出行 移徙 安床 ' +
  '沐浴 剃頭 療病 裁衣 修造動土 豎柱上梁 ' +
  '經絡 開市 立券 交易 納財 修置產室 ' +
  '開渠穿井 安碓磑 掃舍宇 平治道涂 破屋壞垣 伐木 ' +
  '捕捉 畋獵 栽種 牧養 破土 安葬 啟攢'

export const civilActs = civilActsStr.split(' ')

// 辯方書卷十一 的所有宜忌
export const defaultActsStr =
  '祭祀 祈福 求嗣 上刪進表章 上表章 頒詔 覃恩 ' +
  '肆赦 施恩封拜 詔命公卿 招賢 舉正直 施恩惠 ' +
  '恤孤煢 宣政事 布政事 行惠愛 雪冤枉 緩刑獄 ' +
  '慶幸 賞賀 宴會 入學 冠帶 行幸 ' +
  '遣使 安撫邊境 選將訓兵 出師 上官赴任 臨政親民 ' +
  '結婚姻 納采問名 嫁娶 進人口 般移 遠回 安床 ' +
  '解除 沐浴 整容 剃頭 整手足甲 求醫療病 療目 針刺 製裁 ' +
  '營建宮室 修宮室 繕城郭 筑堤防 興造動土 豎柱上梁 ' +
  '修倉庫 鼓鑄 苫蓋 經絡 醞釀 ' +
  '開市 立券 交易 納財 開倉庫 出貨財 修置產室 ' +
  '開渠穿井 安碓磑 補垣塞穴 掃舍宇 修飾垣墻 平治道涂 ' +
  '伐木 捕捉 畋獵 取魚 乘船渡水 栽種 牧養 納畜 ' +
  '破土 安葬 啟攢'

export const defaultActs = defaultActsStr.split(' ')

/**
 * 取得宜忌
 * @param actGroup 宜忌組合
 */
export function getAct(actGroup: (string | number)[]): string[]
export function getAct(actGroup: (string | number)[], returnString: false): string[]
export function getAct(actGroup: (string | number)[], returnString: true): string
export function getAct(
  actGroup: (string | number)[],
  returnString: boolean = false
): string[] | string {
  let resString = ''
  const parseItem = function (item: string | number) {
    const groupKey = 'a' + (isNumber(item) ? ('00' + item).slice(-3) : item)
    const sp = resString ? ' ' : ''
    if (actDict.hasOwnProperty(groupKey)) {
      // if (actDict.hasOwnProperty(groupKey)) {
      resString = sp + actDict[groupKey as ActGroupKey]
    } else if (typeof item != 'number') {
      resString = sp + item
    }
  }
  for (const item of actGroup) {
    if (typeof item === 'string' && !isNumber(item) && item.indexOf('-')) {
      const its = item.split('-')
      if (its.length === 2 && isNumber(its[0]) && isNumber(its[1])) {
        for (let i = Number(its[0]); i <= Number(its[1]); i++) {
          parseItem(i)
        }
      }
    } else parseItem(item)
  }
  return returnString ? resString : resString.split(' ')
}

export function excludeAct(excludes: string[], hay?: string[]): string[] {
  hay = hay ?? defaultActsStr.split(' ')
  const excludesSet = new Set(excludes.join(' ').split(' '))
  return hay.filter(item => !excludesSet.has(item))
}

// 天德月德天德合月德合所宜 (天赦亦然)
export const deGoodAct = getAct(
  [
    'a003a',
    4,
    5,
    '宣政事',
    '007a',
    '8-11',
    '012a',
    '般移 解除',
    15,
    '裁製 營建宮室 繕城郭',
    '017a',
    24,
    '栽種'
  ],
  false
)
// (
//   '祭祀 祈福 求嗣 上冊進表章 頒詔 覃恩 肆赦 施恩封拜 詔命公卿 ' +
//   '招賢 舉正直 施恩惠 恤孤煢 宣政事 行惠愛 雪冤枉 緩刑獄 慶賜 賞賀 宴會 行幸 ' +
//   '遣使 安撫邊境 選將訓兵 出師 上官赴任 臨政親民 結婚姻 納采問名 嫁娶 般移 解除 ' +
//   '求醫療病 裁製 營建宮室 繕城郭 興造動土 豎柱上梁 修倉庫 栽種 牧養 納畜 安葬'
// ).split(' ')

// 天願 (比天德少了解除 療病，多了進人口 經絡  醞釀等)
export const heavenWishGoodAct = getAct(
  [
    'a003a',
    4,
    5,
    '宣政事',
    '007a',
    '8-11',
    '012b',
    '般移 裁製 營建宮室 繕城郭',
    '017a',
    18,
    24,
    '栽種'
  ],
  false
)
// (
//   '祭祀 祈福 求嗣 上冊進表章 頒詔 覃恩 肆赦 施恩封拜 詔命公卿 ' +
//   '招賢 舉正直 施恩惠 恤孤煢 宣政事 行惠愛 雪冤枉 緩刑獄 慶賜 賞賀 宴會 行幸 ' +
//   '遣使 安撫邊境 選將訓兵 出師 上官赴任 臨政親民 結婚姻 納采問名 嫁娶 進人口 般移 ' +
//   '裁製 營建宮室 繕城郭 興造動土 豎柱上梁 修倉庫 經絡 醞釀 開市 立券 交易 納財 栽種 牧養 納畜 安葬'
// ).split(' ')

// 月恩 四相 時德
export const snDeGoodAct = (
  `${a001a} 施恩封拜 舉正直 ${a008} ${a009} ` +
  `${a011} ${a012} 般移 解除 ` +
  `求醫療病 裁製 修宮室 繕城郭 ${a017} 納財 ${a020} 栽種 牧養`
).split(' ')

// 劫煞
export const jieShaBadActStr =
  `${a001} 上冊進表章 頒詔 ${a003} ` +
  `${a004} ${a006} ${a008} 冠帶 ${a009} ` +
  `${a011a} ${a012a} ${a013} ` +
  `${a014a} ` +
  `${a015} 裁製 ${a017b} ` +
  `鼓鑄 ${a018} ${a020a} 修置產室 開渠穿井 ` +
  `安碓磑 掃舍宇 ${a023} ` +
  `${a024} ${a025a}`

export const jieShaBadAct = jieShaBadActStr.split(' ')

// 月厭
export const monthHateBadAct = `${jieShaBadActStr} 進人口 遠回 平治道涂 伐木 修筑園圃`
  .split(' ')
  .filter(i => i != '掃舍宇')

// 大時 天吏 之忌
export const bigTimeBadAct = (
  '祈福 求嗣 上冊進表章 施恩封拜 詔命公卿 ' +
  `${a004} 冠帶 ${a009} ` +
  `${a011a} ${a012b} ${a013} ` +
  '解除 ' +
  `求醫療病 ${a017b} ` +
  `${a020a} 修置產室 ` +
  `${a024}`
).split(' ')

// 土符 地囊
export const earthBagBadAct = getAct(
  ['017b', 21, '開渠穿井 安碓磑 補垣塞穴 修飾垣墻 平治道涂 破屋壞垣 栽種 破土'],
  false
)

// 往亡 氣往亡
export const goDeadBadAct =
  `上冊進表章 頒詔 詔命公卿 招賢 宣政事 ${a009} ${a011a} 嫁娶 進人口 般移 ${a015} ${a027}`.split(
    ' '
  )

// 上朔 四離 四絕 晦日
export const leave4BadAct = excludeAct(
  `祈福 解除 沐浴 ${a014} 補垣塞穴 掃舍宇 修飾垣墻 平治道涂 破屋壞垣`.split(' ')
)

export const commonOnlyBad = getAct([10], false)
export const commonOnlyBad2 = getAct([10, 15], false)
