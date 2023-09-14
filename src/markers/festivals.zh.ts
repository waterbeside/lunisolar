import type { Lunisolar } from '../class/lunisolar'
export const festivals = [
  {
    format: 'MMDD',
    map: {
      '0101': {
        tag: '傳統節日',
        name: '元旦'
      },
      '0110': {
        tag: ['中國主題', 'occupation'],
        name: '中国人民警察节'
      },
      '0121': {
        tag: '國際主題',
        name: '國際擁抱日'
      },
      '0202': {
        tag: ['國際主題', 'environment'],
        name: '世界濕地日'
      },
      '0204': {
        tag: ['國際主題', 'health'],
        name: '世界抗癌日'
      },
      '0210': {
        tag: '國際主題',
        name: '國際氣象節'
      },
      '0214': {
        tag: '西方節日',
        name: '情人節'
      },
      '0220': {
        tag: '國際主題',
        name: '世界社會公正日'
      },
      '0301': {
        tag: ['國際主題', 'environment'],
        name: '國際海豹日'
      },
      '0303': [
        {
          tag: ['國際主題', 'environment'],
          name: '世界野生動植物日'
        },
        {
          tag: ['中國主題', 'health'],
          name: '全國愛耳日'
        },
        {
          tag: ['國際主題', 'health'],
          name: '國際愛耳日'
        }
      ]
    },
    '0305': {
      tag: ['中國主題', 'commemoration'],
      name: '學雷鋒記念日'
    },
    '0306': {
      tag: ['國際主題', 'health'],
      name: '世界青光眼日'
    },
    '0308': {
      tag: '國際主題',
      name: '婦女節'
    },
    '0312': {
      tag: ['中國主題', 'environment'],
      name: '植樹節'
    },
    '0315': {
      tag: '國際主題',
      name: '國際消費日'
    },
    '0320': [
      {
        tag: '國際主題',
        name: '世界無肉日'
      },
      {
        tag: '國際主題',
        name: '國際幸福日'
      }
    ],
    '0321': [
      {
        tag: ['國際主題', 'environment'],
        name: '世界森林日'
      },
      {
        tag: '國際主題',
        name: '世界睡眠日'
      },
      {
        tag: '國際主題',
        name: '世界兒歌日'
      },
      {
        tag: '國際主題',
        name: '國際消除種族歧視日'
      }
    ],
    '0322': {
      tag: ['國際主題', 'environment'],
      name: '世界水日'
    },
    '0323': {
      tag: '國際主題',
      name: '世界氣象日'
    },
    '0324': {
      tag: ['國際主題', 'health'],
      name: '世界防治結核病日'
    },
    '0327': {
      tag: '國際主題',
      name: '世界戲劇日'
    },
    '0401': [
      {
        tag: ['國際主題', 'health'],
        name: '國際愛鳥日'
      },
      {
        tag: '西方節日',
        name: '愚人節'
      }
    ],
    '0407': {
      tag: '國際主題',
      name: '世界衛生日'
    },
    '0408': {
      tag: ['國際主題', 'environment'],
      name: '國際珍稀動物保護日'
    },
    '0415': {
      tag: '中國主題',
      name: '國家安全教育日'
    },
    '0422': {
      tag: ['國際主題', 'environment'],
      name: '世界地球日'
    },
    '0423': {
      tag: '國際主題',
      name: '世界讀書日'
    },
    '0501': {
      tag: '國際主題',
      name: '國際勞動節'
    },
    '0504': {
      tag: '中國主題',
      name: '中國青年節'
    },
    '0508': {
      tag: ['國際主題', 'health'],
      name: '世界紅十字日'
    },
    '0511': {
      tag: ['國際主題', 'health'],
      name: '防治肥胖日'
    },
    '0512': [
      {
        tag: ['國際主題', 'occupation'],
        name: '國際護士節'
      },
      {
        tag: '中國主題',
        name: '全國防災減災日'
      }
    ],
    '0515': {
      tag: ['國際主題', 'health'],
      name: '全國碘缺乏病日'
    },
    '0517': {
      tag: '國際主題',
      name: '世界電信日'
    },
    '0518': {
      tag: '國際主題',
      name: '國際博物館日'
    },
    '0520': [
      {
        tag: '中國主題',
        name: '全國母乳餵養宣傳日'
      },
      {
        tag: '中國主題',
        name: '中國學生營養日'
      }
    ],
    '0525': {
      tag: ['國際主題', 'health'],
      name: '國際愛膚日'
    },
    '0531': {
      tag: ['國際主題', 'health'],
      name: '世界無煙日'
    },
    '0601': {
      tag: '中國節日',
      name: '兒童節'
    },
    '0605': {
      tag: ['國際主題', 'environment'],
      name: '世界環境日'
    },
    '0606': {
      tag: ['中國主題', 'health'],
      name: '全國愛眼日'
    },
    '0609': {
      tag: '國際主題',
      name: '世界認可日'
    },
    '0623': {
      tag: ['國際主題', 'sport'],
      name: '國際奧林匹克日'
    },
    '0625': {
      tag: '中國主題',
      name: '全國土地日'
    },
    '0626': {
      tag: '國際主題',
      name: '國際反毒品日'
    },
    '0701': [
      {
        tag: ['中國節日', 'commemoration'],
        name: '香港回歸日'
      },
      {
        tag: ['中國節日', 'commemoration'],
        name: '建黨節'
      }
    ],
    '0711': [
      {
        tag: '國際主題',
        name: '世界人口日'
      },
      {
        tag: '中國主題',
        name: '中國航海日'
      }
    ],
    '0801': {
      tag: ['中國節日', 'commemoration'],
      name: '建軍節'
    },
    '0812': {
      tag: '國際主題',
      name: '國際青年節'
    },
    '0819': {
      tag: ['中國節日', 'occupation'],
      name: '中國醫師節'
    },
    '0903': {
      tag: ['中國節日', 'commemoration'],
      name: '中國人民抗日戰爭勝利紀念日'
    },
    '0910': {
      tag: ['中國節日', 'occupation'],
      name: '教師節'
    },
    '0912': {
      tag: ['中國主題', 'health'],
      name: '預防出生缺陷日'
    },
    '0920': {
      tag: ['中國主題', 'health'],
      name: '全國愛牙日'
    },
    '0921': {
      tag: '國際主題',
      name: '國際和平日'
    },
    '0927': {
      tag: '國際主題',
      name: '世界旅遊日'
    },
    '0930': {
      tag: ['中國節日', 'commemoration'],
      name: '列士纪念日'
    },
    '1001': [
      {
        tag: '國際主題',
        name: '國際音樂節'
      },
      {
        tag: '中國節日',
        name: '國慶節'
      }
    ],
    '1004': {
      tag: ['國際主題', 'environment'],
      name: '世界動物日'
    },
    '1007': {
      tag: '國際主題',
      name: '國際住房日'
    },
    '1009': {
      tag: '國際主題',
      name: '世界郵政日'
    },
    '1010': {
      tag: ['國際主題', 'health'],
      name: '世界精神衛生日'
    },
    '1013': {
      tag: ['國際主題', 'health'],
      name: '世界保健日'
    },
    '1015': {
      tag: '國際主題',
      name: '國際盲人節'
    },
    '1016': {
      tag: '國際主題',
      name: '世界糧食日'
    },
    '1017': {
      tag: '國際主題',
      name: '世界消除貧困日'
    },
    '1024': [
      {
        tag: '國際主題',
        name: '聯合國日'
      },
      {
        tag: ['國際主題', 'occupation'],
        name: '程序員节'
      }
    ],
    '1101': {
      tag: '西方節日',
      name: '萬聖節'
    },
    '1108': {
      tag: ['中國主題', 'occupation'],
      name: '中國記者日'
    },
    '1109': {
      tag: ['中國主題'],
      name: '消防宣傳日'
    },
    '1114': {
      tag: ['國際主題', 'health'],
      name: '世界糖尿病日'
    },
    '1117': {
      tag: ['國際主題', 'occupation'],
      name: '國際大學生節'
    },
    '1201': {
      tag: ['國際主題', 'health'],
      name: '世界愛滋病日'
    },
    '1203': {
      tag: ['國際主題', 'health'],
      name: '世界殘疾人日'
    },
    '1204': [
      {
        tag: ['中國主題'],
        name: '國家憲法日'
      },
      {
        tag: ['中國主題'],
        name: '全國法制宣傳日'
      }
    ],
    '1209': {
      tag: ['國際主題', 'sport'],
      name: '世界足球日'
    },
    '1213': {
      tag: ['中國主題', 'commemoration'],
      name: '南京大屠殺死難者國家公鎮祭日'
    },
    '1220': {
      tag: ['中國主題', 'commemoration'],
      name: '澳門回歸紀念日'
    },
    '1221': {
      tag: ['國際主題', 'sport'],
      name: '國際籃球日'
    },
    '1224': {
      tag: ['西方節日'],
      name: '平安夜'
    },
    '1225': {
      tag: ['西方節日'],
      name: '聖誕節'
    }
  },
  {
    format: 'M,d,dR',
    map: {
      '3,4,2': {
        tag: ['國際主題', 'health'],
        name: '世界腎臟日'
      },
      '3,2,3': {
        tag: '國際主題',
        name: '世界社會工作日'
      },
      '5,2,1': {
        tag: ['國際主題', 'health'],
        name: '世界防治哮喘日'
      },
      '5,0,2': {
        tag: '西方節日',
        name: '母親節'
      },
      '5,0,3': {
        tag: ['中國主題', 'health'],
        name: '全國助殘日'
      },
      '6,0,3': {
        tag: '西方節日',
        name: '父親節'
      },
      // '9,0,3': {
      //   tag: '中國主題', //TODO: 待檢查
      //   name: '全國科普日'
      // },
      '9,0,4': {
        tag: ['國際主題', 'health'],
        name: '國際聾人節'
      },
      '10,4,2': {
        tag: ['國際主題', 'health'],
        name: '世界視力日'
      },
      '11,4,4': {
        tag: '西方節日',
        name: '感恩節'
      }
    }
  },
  {
    format: 'M,d,dRr',
    map: {
      '1,0,1': {
        tag: ['國際主題', 'health'],
        name: '國際麻風節'
      },
      '3,1,1': {
        tag: '中國主題',
        name: '中小學安全教育日'
      }
    }
  },
  {
    format: 'lMn,lDn',
    map: {
      '1,1': {
        tag: '傳統節日',
        name: '春節'
      },
      '2,2': {
        tag: '傳統節日',
        name: '龍抬頭'
      },
      '5,5': {
        tag: '傳統節日',
        name: '端午節'
      },
      '7,7': {
        tag: '傳統節日',
        name: '七夕節'
      },
      '7,14': {
        tag: '傳統節日',
        name: '中元節'
      },
      '8,15': {
        tag: '傳統節日',
        name: '中秋節'
      },
      '9,9': {
        tag: '傳統節日',
        name: '重陽節'
      },
      '12,8': {
        tag: '傳統節日',
        name: '腊八节'
      }
    }
  },
  {
    format: function (lsr: Lunisolar) {
      // 检查是否2月的最后一天
      return lsr.add(1, 'day').day === 1 && lsr.month === 2 ? 't' : 'f'
    },
    map: {
      t: {
        tag: ['國際主題', 'health'],
        name: '國際罕見病日'
      }
    }
  }
]
