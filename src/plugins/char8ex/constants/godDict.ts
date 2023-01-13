interface C8GodDict {
  [key: string]: C8godItem
}

export interface GodRuleItem {
  startBy: 'branch' | 'stem' | 'takeSoundE5' | 'season' | 'sb' | null
  startPillar: string[]
  startAO?: 'and' | 'or'
  startMapping?: any[]
  findBy: 'branch' | 'stem' | 's,b' | 'sb'
  sbFormatter?: (sV: number, bV: number) => [number, number]
  ruleParams?: any[]
  rule: any
}

interface C8godItem {
  luckLevel: number
  rules: GodRuleItem[]
}

export const godDict: C8GodDict = {
  // 年日干见支
  天乙貴人: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        rule: [
          [1, 7],
          [0, 8],
          [11, 9],
          [11, 9],
          [1, 7],
          [0, 8],
          [1, 7],
          [2, 6],
          [3, 5]
        ]
      }
    ]
  },
  文昌貴人: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        rule: [5, 6, 8, 9, 8, 9, 11, 0, 2, 3]
      }
    ]
  },
  國印貴人: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        rule: [10, 11, 1, 2, 1, 2, 4, 5, 7, 8]
      }
    ]
  },
  // 年干见支
  太極貴人: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['year'],
        findBy: 'branch',
        sbFormatter: (sV: number, bV: number) => [sV >> 1, bV],
        rule: [
          [0, 6],
          [3, 9],
          [4, 10, 1, 7],
          [2, 11],
          [5, 8]
        ]
      }
    ]
  },
  // 日干见支
  金輿: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['day'],
        findBy: 'branch',
        rule: [4, 5, 7, 8, 7, 8, 10, 11, 1, 2]
      }
    ]
  },
  禄神: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['day'],
        findBy: 'branch',
        rule: [2, 3, 5, 6, 5, 6, 8, 9, 11, 0]
      }
    ]
  },
  垣城: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['day'],
        findBy: 'branch',
        rule: [11, 6, 2, 9, 2, 9, 5, 0, 8, 3]
      }
    ]
  },
  羊刃: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['day'],
        findBy: 'branch',
        rule: [3, 2, 6, 5, 6, 5, 9, 8, 0, 11]
      }
    ]
  },
  // 年干见时支
  天官: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['year:hour'],
        findBy: 'branch',
        rule: [7, 4, 5, 9, 10, 3, 11, 8, 2, 8]
      }
    ]
  },
  // 日干见柱
  天福: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['day'],
        findBy: 'sb',
        rule: [57, 56, 59, 48, 51, 50, 53, 42, [25, 55], [4, 34]]
      }
    ]
  },
  辭館: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['day'],
        findBy: 'sb',
        rule: [26, 27, 41, 54, 53, 6, 8, 9, 12]
      }
    ]
  },
  墓煞: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['day'],
        findBy: 'sb',
        rule: [
          [16, 46],
          [37, 7],
          [28, 58],
          [49, 19],
          [40, 10],
          [1, 31],
          [52, 22],
          [13, 43],
          [4, 34],
          [25, 55]
        ]
      }
    ]
  },
  // 日干见时柱
  時墓: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['day'],
        findBy: 'sb',
        rule: [[55, 7], [34, 46], null, null, null, null, [1, 13], [40, 52], null, null]
      }
    ]
  },
  // 年月干见月年支，日时干见时日支
  天廚: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'stem',
        startPillar: ['year:month', 'month:year', 'day:hour', 'hour:day'],
        findBy: 'branch',
        rule: [5, 6, 5, 6, 8, 911, 0, 2, 3]
      }
    ]
  },
  //--- 地支表
  // 月支见干(支)
  天德: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month'],
        findBy: 's,b',
        rule: ['b5', 's6', 's3', 'b8', 's8', 's7', 'b11', 's0', 's9', 'b2', 's2', 's1']
      }
    ]
  },
  天德合: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month'],
        findBy: 's,b',
        rule: ['b8', 's1', 's8', 'b5', 's3', 's2', 'b2', 's5', 's4', 'b11', 's7', 's6']
      }
    ]
  },
  // 月支见支
  天醫: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month'],
        findBy: 'branch',
        rule: [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    ]
  },
  太白星: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month'],
        findBy: 'branch',
        sbFormatter: (sV: number, bV: number) => [sV, bV % 3],
        rule: [5, 1, 9]
      }
    ]
  },
  // 日支見時
  隔角: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month:hour'],
        findBy: 'branch',
        rule: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1]
      }
    ]
  },
  // 年支見支
  喪門: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year'],
        findBy: 'branch',
        rule: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1]
      }
    ]
  },
  吊客: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year'],
        findBy: 'branch',
        rule: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    ]
  },
  // 阳男阴女，命前三辰为勾，命后三辰为绞。阴男阳女，命前三辰为绞，命后三辰为勾。
  勾煞: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year'],
        findBy: 'branch',
        ruleParams: ['year.stem', 'sex'],
        rule: (yaarStem: number, sex: number) => {
          if ((yaarStem + sex) % 2 === 1) {
            // 阳男阴女
            return [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2]
          } else {
            // 阴男阳女
            return [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8]
          }
        }
      }
    ]
  },
  絞煞: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year'],
        findBy: 'branch',
        rule: (yaarStem: number, sex: number) => {
          if ((yaarStem + sex) % 2 === 1) {
            // 阳男阴女
            return [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8]
          } else {
            // 阴男阳女
            return [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2]
          }
        }
      }
    ]
  },
  元辰: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year'],
        findBy: 'branch',
        ruleParams: ['year.stem', 'sex'],
        rule: (yaarStem: number, sex: number) => {
          if ((yaarStem + sex) % 2 === 1) {
            // 阳男阴女
            return [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6]
          } else {
            // 阴男阳女
            return [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4]
          }
        }
      }
    ]
  },
  // 年月支见支
  孤辰: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'month'],
        findBy: 'branch',
        rule: [2, 2, 5, 5, 5, 8, 8, 8, 11, 11, 11, 2]
      }
    ]
  },
  寡宿: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'month'],
        findBy: 'branch',
        rule: [10, 10, 1, 1, 1, 4, 4, 4, 7, 7, 7, 10]
      }
    ]
  },
  // 年日支見支
  天羅: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        // 戌见亥，亥见戌为天罗
        rule: [null, null, null, null, null, null, null, null, null, null, 11, 10]
      },
      {
        startBy: 'takeSoundE5',
        startPillar: ['year'],
        findBy: 'branch',
        // 年纳音为火见戌亥
        rule: [null, [10, 11], null, null, null]
      }
    ]
  },
  地網: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        // 辰见巳，巳见辰为地网
        rule: [null, null, null, null, 5, 4, null, null, null, null, null, null]
      },
      {
        startBy: 'takeSoundE5',
        startPillar: ['year'],
        findBy: 'branch',
        // 納音水土見辰巳
        rule: [null, null, [4, 5], null, [4, 5]]
      }
    ]
  },
  // 月支見干
  月德: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month'],
        findBy: 'stem',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [8, 6, 2, 0]
      }
    ]
  },
  月德合: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month'],
        findBy: 'stem',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [3, 1, 7, 5]
      }
    ]
  },
  德: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month'],
        findBy: 'stem',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [
          [0, 1],
          [2, 3],
          [4, 5, 8, 9],
          [6, 7]
        ]
      }
    ]
  },
  秀: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['month'],
        findBy: 'stem',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [
          [2, 7, 0, 5],
          [1, 6],
          [4, 9],
          [3, 8]
        ]
      }
    ]
  },
  // 年日支见支
  華蓋: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [4, 1, 10, 7]
      }
    ]
  },
  將星: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [0, 9, 6, 3]
      }
    ]
  },
  驛馬: {
    luckLevel: 0,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [2, 11, 8, 5]
      }
    ]
  },
  桃花: {
    luckLevel: 0,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [9, 6, 3, 0]
      }
    ]
  },
  劫煞: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [5, 2, 11, 8]
      }
    ]
  },
  亡神: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [11, 8, 5, 2]
      }
    ]
  },
  災煞: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['year', 'day'],
        findBy: 'branch',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [6, 3, 0, 9]
      }
    ]
  },
  // 日支見支
  六厄: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'branch',
        startPillar: ['day'],
        findBy: 'branch',
        sbFormatter: (sV, bV) => [sV, bV % 4],
        rule: [3, 0, 9, 6]
      }
    ]
  },
  // 見日柱
  日貴: {
    luckLevel: 1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [33, 23, 29, 39]
      }
    ]
  },
  日德: {
    luckLevel: 1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [50, 52, 4, 16, 58]
      }
    ]
  },
  陰陽差錯: {
    luckLevel: -1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [12, 13, 14, 27, 28, 29, 42, 43, 44, 57, 58, 59]
      }
    ]
  },
  陰陽煞: {
    luckLevel: -1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [12, 54]
      }
    ]
  },
  九醜: {
    luckLevel: -1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [24, 51, 48, 18, 51, 15, 27, 21, 45, 57]
      }
    ]
  },
  天赦: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'season',
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [14, 30, 44, 0]
      }
    ]
  },
  四廢: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'season',
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [
          [56, 57],
          [48, 59],
          [50, 51],
          [53, 42]
        ]
      }
    ]
  },
  天地轉煞: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'season',
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [
          [51, 27],
          [42, 54],
          [57, 9],
          [12, 48]
        ]
      }
    ]
  },
  金神: {
    luckLevel: -1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day', 'null:hour'],
        findBy: 'sb',
        rule: [1, 5, 9]
      }
    ]
  },
  孤鸞: {
    luckLevel: -1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day', 'null:hour'],
        startAO: 'and',
        findBy: 'sb',
        rule: [50, 41, 42, 53, 54, 44, 47, 48]
      }
    ]
  },
  八專: {
    luckLevel: -1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day', 'null:hour'],
        findBy: 'sb',
        rule: [50, 51, 43, 34, 55, 56, 57, 49]
      }
    ]
  },
  十惡大敗: {
    luckLevel: -1,
    rules: [
      {
        startBy: null,
        startPillar: ['null:day'],
        findBy: 'sb',
        rule: [8, 16, 17, 23, 25, 32, 34, 40, 41, 59]
      }
    ]
  },
  // 納音起
  學堂: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'takeSoundE5',
        startPillar: ['day'],
        findBy: 'sb',
        rule: [35, 44, 2, 17, 20]
      }
    ]
  },
  帝座: {
    luckLevel: 1,
    rules: [
      {
        startBy: 'takeSoundE5',
        startPillar: ['hour'],
        findBy: 'branch',
        rule: [3, 6, 6, 9, 0]
      }
    ]
  },
  // 其它
  截路空亡: {
    luckLevel: -1,
    rules: [
      {
        startBy: 'sb',
        startPillar: ['day:hour'],
        findBy: 'stem',
        startMapping: [[10, 21, 32, 43, 15, 26, 37, 48]],
        rule: [[8, 9]]
      },
      {
        startBy: 'sb',
        startPillar: ['day:hour'],
        findBy: 'sb',
        startMapping: [
          [54, 59],
          [4, 9]
        ],
        rule: [
          [48, 49],
          [58, 59]
        ]
      }
    ]
  }
}

export const godKeysSet = new Set(Object.keys(godDict))
