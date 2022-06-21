import { Char8 } from '../../src/class/char8'
import * as U from '../../src/utils'

describe('Char8', () => {
  it('Test Char8.computeSBYear', () => {
    expect(Char8.computeSBYear(U.toDate('2022-02-04'), 2).toString()).toBe('壬寅')
    expect(Char8.computeSBYear(U.toDate('2022-02-03'), 2).toString()).toBe('辛丑')
    expect(Char8.computeSBYear(U.toDate('2022-02-03'), -1).toString()).toBe('壬寅')
    expect(Char8.computeSBYear(U.toDate('2021-10-03'), 2).toString()).toBe('辛丑')
    expect(Char8.computeSBYear(U.toDate('2016-4-3'), 2).toString()).toBe('丙申')
    expect(Char8.computeSBYear(U.toDate('1904-10-4'), 2).toString()).toBe('甲辰')
    expect(Char8.computeSBYear(U.toDate('2020-01-25'), 2).toString()).toBe('己亥')
    expect(Char8.computeSBYear(U.toDate('2020-02-03 23:00:01'), 2).toString()).toBe('庚子')
    expect(Char8.computeSBYear(U.toDate('2020-02-03 22:59:59'), 2).toString()).toBe('己亥')
    expect(Char8.computeSBYear(U.toDate('2020-01-25')).toString()).toBe('庚子')
  })

  it('Test Char8.computeSBMonth', () => {
    expect(Char8.computeSBMonth(U.toDate('2017-12-01')).toString()).toBe('辛亥')
    expect(Char8.computeSBMonth(U.toDate('2017-12-08')).toString()).toBe('壬子')
    expect(Char8.computeSBMonth(U.toDate('2019-06-08')).toString()).toBe('庚午')
    expect(Char8.computeSBMonth(U.toDate('2022-02-03')).toString()).toBe('辛丑')
    expect(Char8.computeSBMonth(U.toDate('2022-02-03 23:00:00')).toString()).toBe('壬寅')
    expect(Char8.computeSBMonth(U.toDate('2022-02-04')).toString()).toBe('壬寅')
  })
})
