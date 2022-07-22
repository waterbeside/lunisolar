import { Lunisolar } from '../../src/class/lunisolar'
import lunisolar from '../../src/index'
import {
  FIRST_YEAR,
  TERM_MINIMUM_DATES,
  TERM_SAME_HEX,
  TERM_LIST
} from '../../src/constants/lunarData'
import { _GlobalConfig } from '../../src/config'
import solarTermDateList from '../datas/solarTermDateList'

export function reduceTermList(year: number) {
  const binData = TERM_SAME_HEX[TERM_LIST[year - FIRST_YEAR]].toString(2)
  const res = []
  const res2 = []
  let temp = binData.padStart(48, '0')
  while (res.length < 24) {
    const currDate = parseInt(temp.slice(temp.length - 2), 2)
    const minDate = TERM_MINIMUM_DATES[res.length]
    res.push(currDate)
    res2.push(currDate + minDate)
    temp = temp.slice(0, temp.length - 2)
  }
  return [res, res2]
}

// 测试节气
describe('test Term', () => {
  for (const yearOffset in solarTermDateList) {
    const year = FIRST_YEAR + Number(yearOffset)
    it(`${year}`, () => {
      for (const i in solarTermDateList[yearOffset]) {
        const month = ('0' + ((Number(i) >> 1) + 1)).slice(-2)
        const date = ('0' + solarTermDateList[yearOffset][i]).slice(-2)
        const lun = new Lunisolar(`${year}-${month}-${date}`)
        let res = lun.solarTerm
        if (res instanceof Array) res = null
        expect(res?.toString() || null).toBe(_GlobalConfig.locales['zh'].solarTerm[Number(i)])
      }
    })
  }
})

describe('test Lunisolar', () => {
  it('1986-10-19 18:20:00', () => {
    const lun = lunisolar('1986-10-19 19:20:00')
    expect(lun.char8.toString()).toBe('丙寅 戊戌 丙申 戊戌')
  })
  it('1990-1-27 15:20:00', () => {
    const lun = lunisolar('1990-1-27 15:20:00')
    expect(lun.char8.toString()).toBe('己巳 丁丑 壬辰 戊申')
  })
})

describe('test Lunar', () => {
  it('1901-02-19', () => {
    const lun = lunisolar('1901-02-19')
    expect(lun.lunar.month).toBe(1)
    expect(lun.lunar.day).toBe(1)
  })

  it('1901-02-19 23:10', () => {
    const lun = lunisolar('1901-02-19 23:10')
    expect(lun.lunar.month).toBe(1)
    expect(lun.lunar.day).toBe(2)
  })
})

describe('test format', () => {
  it('2022/07/18 14:40', () => {
    const lsr = lunisolar('2022/07/18 14:40')
    expect(lsr.format('YYYY/MM/DD HH:mm:ss SSS')).toBe('2022/07/18 14:40:00 000')
    expect(lsr.format('lY年 lMlD lH時')).toBe('二〇二二年 六月二十 未時')
    expect(lsr.format('lY年 lM(lL)lD lH時')).toBe('二〇二二年 六月(大)二十 未時')
    expect(lsr.format('lYn年 農歷lMn月lDn日 第lHn個時辰')).toBe('2022年 農歷6月20日 第8個時辰')
    expect(lsr.format('cY cM cD cH')).toBe('壬寅 丁未 壬申 丁未')
    expect(lsr.format('zo年')).toBe('虎年')
    expect(lsr.format('cYs-cYb cMs-cMb cDs-cDb cHs-cHb')).toBe('壬-寅 丁-未 壬-申 丁-未')
  })
})
