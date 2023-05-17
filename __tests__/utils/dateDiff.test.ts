import { dateDiff, lunarDateDiff } from '../../src/utils/dateDiff'
import { Lunisolar } from '../../src/class/lunisolar'

describe('test dateDiff', () => {
  it('test dateDiff', () => {
    const date1 = new Date('2020/01/01 00:00:00')
    const date2 = new Date('2020/01/02 00:00:00')
    expect(dateDiff(date1, date2)).toBe(-86400000)
    expect(dateDiff(date1, date2, 'ms')).toBe(-86400000)
    expect(dateDiff(date1, date2, 's')).toBe(-86400)
    expect(dateDiff(date1, date2, 'm')).toBe(-86400 / 60)
    expect(dateDiff(date1, date2, 'h')).toBe(-24)
  })

  it('test dateDiff month', () => {
    const m1 = new Lunisolar('2021/01/01 00:00:00')
    const m2 = new Lunisolar('2021/02/02 00:00:00')
    // expect(dateDiff(m1, m2, 'M')).toBe(1)
    expect(dateDiff(m1, m2, 'M', true)).toBe(-1.032258064516129)
  })

  it('test lunarDateDiff', () => {
    const lsr1 = new Lunisolar('2018/01/01 00:00:00') // 2017十一月十五 大
    const lsr2 = new Lunisolar('2022/02/02 00:00:00') // 2022正月初二 大
    expect(lunarDateDiff(lsr1, lsr2, 'ly')).toBe(-5)
    expect(lunarDateDiff(lsr1, lsr2, 'lM')).toBe(-51)

    const lsr3 = new Lunisolar('2018/02/10 00:00:00') // 2017十二月廿五 大
    expect(lunarDateDiff(lsr3, lsr2, 'lM')).toBe(-50)
    expect(lunarDateDiff(lsr3, lsr2, 'lM', true).toFixed(3)).toBe('-49.233')
    expect(lunarDateDiff(lsr2, lsr3, 'lM', true).toFixed(3)).toBe('49.233')

    const lsr4 = new Lunisolar('2018/02/16 00:00:00') // 2018正月初一 小
    expect(lunarDateDiff(lsr3, lsr4, 'ly')).toBe(-1)
    expect(lunarDateDiff(lsr3, lsr4, 'ly', true).toFixed(3)).toBe('-0.016')
    expect(lunarDateDiff(lsr3, lsr4, 'ld')).toBe(-6)
    expect(lunarDateDiff(lsr3, lsr4, 'lh')).toBe(-72)
  })
})
