/*
建除12神
建满平收黑,除危定执黄; 成开皆可用,闭破不可当。
*/
import { getBranchValue } from '../../../utils'

const duty12GodNames = [
  '建',
  '除',
  '滿',
  '平',
  '定',
  '執',
  '破',
  '危',
  '成',
  '收',
  '開',
  '閉'
] as const

const duty12GodData: {
  [key in typeof duty12GodNames[number]]: [
    string[] | null,
    string[] | null,
    GodDictItemExtra | null,
    number
  ]
} = {
  建: [
    '施恩封拜 詔命公卿 招賢 舉正直 行幸 遣使 上官赴任 臨政親民 訓兵 出師'.split(' '),
    ['結姻親', '開倉庫'],
    null,
    -1
  ],
  除: [
    '解除 沐浴 整容 剃頭 整手足甲 求醫療病 掃舍宇 施恩封拜 舉正直 行幸 遣使 上官赴任 臨政親民 安撫邊境 選將訓兵 出師'.split(
      ' '
    ),
    null,
    null,
    1
  ],
  滿: [
    (
      '進人口 裁製 修倉庫 經絡 開市 立券 交易 納財 開倉庫 出貨財 補垣塞穴 ' +
      '祭祀 祈福 上冊進表章 慶賜 賞賀 宴會 修宮室 繕城郭 '
    ).split(' '),
    '施恩封拜 詔命公卿 招賢 舉正直 上官赴任 臨政親民 結婚姻 納采問名 求醫療病'.split(' '),
    {
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        const mbValue = getBranchValue(lsr, 'month')
        if (
          ([2, 8].includes(mbValue) && gods.has('守日')) ||
          ([0, 3, 6, 9].includes(mbValue) && gods.has('相日')) ||
          ['月德', '天德合', '月德合', '月恩', '四相'].some(item => gods.has(item))
        ) {
          return {
            replace: {
              bad: []
            }
          }
        }
        return null
      }
    },
    -1
  ],
  // 平日 又為死神
  平: [
    ['修飾垣墻', '平治道涂'],
    (
      '祈福 求嗣 上冊進表章 頒詔 施恩封拜 詔命公卿 ' +
      '招賢 舉正直 宣政事 布政事 慶賜 賞賀 宴會 行幸 遣使 ' +
      '安撫邊境 選將訓兵 出師 上官赴任 臨政親民 結婚姻 納采問名 嫁娶 進人口 般移 安床 解除 ' +
      '求醫療病 裁製 營建宮室 修宮室 繕城郭 興造動土 豎柱上梁 修倉庫  ' +
      '鼓鑄 經絡 醞釀 開市 立券 交易 納財 開倉庫 出貨財 修置產室 開渠穿井 栽種 收養 納畜 破土 安葬 啟攢'
    ).split(' '),
    null,
    -1
  ],
  定: [
    ['冠帶', '運謀算', '畫計策'],
    ['上表章', '陳詞訟', '戰鬥', '征伐', '求醫療病', '安置產室', '經營', '栽種'],
    null,
    1
  ],
  執: [['捕捉'], null, null, 1],
  破: [['求醫療病', '破屋壞垣'], null, null, -1],
  危: [['安撫邊境', '選將訓兵', '安床'], null, null, 1],
  成: [
    (
      '入學 安撫邊境 般移 筑堤防 開市 施恩封拜 舉正直 慶賜 賞賀 宴會 行幸 遣使 ' +
      '上官赴任 臨政親民 結婚姻 納采問名 嫁娶 求醫療病'
    ).split(' '),
    null,
    null,
    1
  ],
  收: [
    ['進人口', '納財', '捕捉', '納畜'],
    (
      '祈福 求嗣 上冊進表章 頒詔 施恩封拜 詔命公卿 ' +
      '招賢 舉正直 宣政事 布政事 慶賜 賞賀 宴會 冠帶 行幸 遣使 ' +
      '安撫邊境 選將訓兵 出師 上官赴任 臨政親民 結婚姻 納采問名 嫁娶 般移 安床 解除 ' +
      '求醫療病 裁製 營建宮室 修宮室 繕城郭 興造動土 豎柱上梁 修倉庫  ' +
      '鼓鑄 經絡 醞釀 開市 立券 交易 開倉庫 出貨財 修置產室 開渠穿井 破土 安葬 啟攢'
    ).split(' '),
    {
      actsFilter: (lsr: lunisolar.Lunisolar, gods: Set<string>) => {
        if (['月恩', '四相', '時德'].some(i => gods.has(i))) {
          return {
            add: {
              good: ['修倉庫']
            }
          }
        }
        return null
      }
    },
    -1
  ],
  開: [
    (
      '祭祀 祈福 求嗣 上冊進表章 頒詔  覃恩 肆赦 施恩封拜 詔命公卿 ' +
      '招賢 舉正直 施恩惠 恤孤煢 宣政事 行惠愛 雪冤枉 緩刑獄 慶賜 賞賀 宴會 入學 行幸 遣使 ' +
      '上官赴任 臨政親民 般移 解除 ' +
      '求醫療病 裁製 修宮室 繕城郭 興造動土 豎柱上梁 ' +
      '開市 修置產室 開渠穿井 安碓磑 栽種 牧養'
    ).split(' '),
    ['伐木', '畋獵', '取魚', '破土', '安葬', '啟攢'],
    null,
    1
  ],
  // 閉日又名血支
  閉: [
    ['筑堤防', '補垣塞穴'],
    (
      '上冊進表章 頒詔 施恩封拜 詔命公卿 ' +
      '招賢 舉正直 宣政事 布政事 慶賜 賞賀 宴會 冠帶 行幸 遣使 ' +
      '出師 上官赴任 臨政親民 結婚姻 納采問名 嫁娶 進人口 般移 安床 ' +
      '求醫療病 營建宮室 修宮室 興造動土 豎柱上梁  ' +
      '開市 開倉庫 出貨財 修置產室 開渠穿井 針刺 療目'
    ).split(' '),
    null,
    -1
  ]
}

function getDuty12GodIndexAndKey(
  lsr: lunisolar.Lunisolar
): [number, typeof duty12GodNames[number]] {
  const godIdx = (getBranchValue(lsr, 'day') + 12 - getBranchValue(lsr, 'month')) % 12
  const key = duty12GodNames[godIdx]
  return [godIdx, key]
}

/**
 * @param lsr The instance of Lunisolar
 * @returns [建除12神索引, 名稱，宜[], 忌[]]
 */
function getDuty12God(
  lsr: lunisolar.Lunisolar
): [number, string, string[] | null, string[] | null, GodDictItemExtra | null, number] {
  const [godIdx, key] = getDuty12GodIndexAndKey(lsr)
  const extraDefault = {
    showGB: false
  }
  const [goodAct, badAct, extra, luckLevel] = duty12GodData[key]
  return [godIdx, key, goodAct, badAct, Object.assign({}, extraDefault, extra), luckLevel]
}
export { duty12GodNames, getDuty12GodIndexAndKey, getDuty12God }
