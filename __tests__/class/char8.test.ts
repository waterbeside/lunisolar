import { Char8 } from '../../src/class/char8'
import * as U from '../../src/utils'

describe('Char8', () => {
  it('Test Char8.computeSBYear', () => {
    const config = {
      changeEgeTrem: 2
    }
    expect(Char8.computeSBYear(U.parseDate('2022-02-04'), config).toString()).toBe('壬寅')
    expect(Char8.computeSBYear(U.parseDate('2022-02-03'), config).toString()).toBe('辛丑')
    expect(Char8.computeSBYear(U.parseDate('2022-02-03'), { changeEgeTrem: -1 }).toString()).toBe(
      '壬寅'
    )
    expect(Char8.computeSBYear(U.parseDate('2021-10-03'), config).toString()).toBe('辛丑')
    expect(Char8.computeSBYear(U.parseDate('2016-4-3'), config).toString()).toBe('丙申')
    expect(Char8.computeSBYear(U.parseDate('1904-10-4'), config).toString()).toBe('甲辰')
    expect(Char8.computeSBYear(U.parseDate('2020-01-25'), config).toString()).toBe('己亥')
    expect(Char8.computeSBYear(U.parseDate('2020-02-03 23:00:01'), config).toString()).toBe('庚子')
    expect(Char8.computeSBYear(U.parseDate('2020-02-03 22:59:59'), config).toString()).toBe('己亥')
    expect(Char8.computeSBYear(U.parseDate('2020-01-25'), { changeEgeTrem: null }).toString()).toBe(
      '庚子'
    )
  })

  it('Test Char8.computeSBMonth', () => {
    expect(Char8.computeSBMonth(U.parseDate('2017-12-01')).toString()).toBe('辛亥')
    expect(Char8.computeSBMonth(U.parseDate('2017-12-08')).toString()).toBe('壬子')
    expect(Char8.computeSBMonth(U.parseDate('2019-06-08')).toString()).toBe('庚午')
    expect(Char8.computeSBMonth(U.parseDate('2022-02-03')).toString()).toBe('辛丑')
    expect(Char8.computeSBMonth(U.parseDate('2022-02-03 23:00:00')).toString()).toBe('壬寅')
    expect(Char8.computeSBMonth(U.parseDate('2022-02-04')).toString()).toBe('壬寅')
  })

  it('Test Char8.computeSBDay', () => {
    expect(Char8.computeSBDay(U.parseDate('2022-03-11')).toString()).toBe('癸亥')
    expect(Char8.computeSBDay(U.parseDate('2022-03-12')).toString()).toBe('甲子')
    expect(Char8.computeSBDay(U.parseDate('2022-03-13')).toString()).toBe('乙丑')
    expect(Char8.computeSBDay(U.parseDate('2017-11-30 23:00:00')).toString()).toBe('壬戌')
    expect(Char8.computeSBDay(U.parseDate('2017-12-01')).toString()).toBe('壬戌')
    expect(Char8.computeSBDay(U.parseDate('2017-12-08')).toString()).toBe('己巳')
    expect(Char8.computeSBDay(U.parseDate('2019-06-08')).toString()).toBe('丙子')
    expect(Char8.computeSBDay(U.parseDate('1991-02-15')).toString()).toBe('丙辰')
    expect(Char8.computeSBDay(U.parseDate('2031-08-22')).toString()).toBe('甲午')
    expect(Char8.computeSBDay(U.parseDate('2031-08-22 23:00:00')).toString()).toBe('乙未')
    expect(Char8.computeSBDay(U.parseDate('2022-06-23 8:32:00')).toString()).toBe('丁未')
  })

  it('Test Char8.computeSBHour', () => {
    expect(Char8.computeSBHour(U.parseDate('2022-03-10 23:00:00')).toString()).toBe('壬子')
    expect(Char8.computeSBHour(U.parseDate('2022-03-11')).toString()).toBe('壬子')
    expect(Char8.computeSBHour(U.parseDate('2022-06-23 20:32:00')).toString()).toBe('庚戌')
    expect(Char8.computeSBHour(U.parseDate('2022-06-23 23:32:00')).toString()).toBe('壬子')
    expect(Char8.computeSBHour(U.parseDate('2005-12-23 8:00:00')).toString()).toBe('壬辰')
  })
})
