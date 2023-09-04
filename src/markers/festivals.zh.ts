import type { Lunisolar } from '../class/lunisolar'

export const festivals = [
  {
    format: 'MMDD',
    map: {
      '0101': {
        tag: '傳統節日',
        desc: '元旦'
      },
      '0110': {
        tag: '中國主題',
        desc: '中国人民警察节'
      },
      '0121': {
        tag: '國際主題',
        desc: '國際擁抱日'
      }
    }
  },
  {
    format: 'lMn-lDn',
    map: {
      '1-1': {
        tag: '傳統節日',
        desc: '春節'
      },
      '12-8': {
        tag: '傳統節日',
        desc: '腊八节'
      }
    }
  },
  {
    format: [
      'MM-d',
      function (lsr: Lunisolar): boolean {
        return true
      }
    ]
  }
]
