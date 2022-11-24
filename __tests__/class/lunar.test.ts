import { Lunar } from '../../src/class/lunar'

describe('test lunar class', () => {
  it('1901-02-19', () => {
    const lunar = new Lunar('1901-02-19')
    expect(lunar.month).toBe(1)
    expect(lunar.day).toBe(1)
  })

  it('1901-02-19 23:10', () => {
    const lunar = new Lunar('1901-02-19 23:10')
    expect(lunar.month).toBe(1)
    expect(lunar.day).toBe(2)
  })

  it('1903-06-27', () => {
    const lunar = new Lunar('1903-06-27')
    expect(lunar.month).toBe(105)
    expect(lunar.day).toBe(3)
    expect(lunar.toString()).toBe('一九〇三年閏五月初三子時')
  })

  it('1951-12-31', () => {
    const lunar = new Lunar('1951-12-31')
    expect(lunar.month).toBe(12)
    expect(lunar.day).toBe(4)
    expect(lunar.toString()).toBe('一九五一年十二月初四子時')
  })

  it('1952-01-06', () => {
    const lunar = new Lunar('1952-01-06')
    expect(lunar.month).toBe(12)
    expect(lunar.day).toBe(10)
  })

  it('1901-02-18', () => {
    try {
      new Lunar('1901-02-18')
    } catch (error: any) {
      console.log(error)
      expect(error.message).toBe('Invalid lunar year: out of range')
    }
  })

  it('2022-10-22', () => {
    const lunar = new Lunar('2022-10-22')
    const ldoy = lunar.lastDayOfYear
    expect(ldoy.getFullYear()).toBe(2023)
    expect(ldoy.getMonth()).toBe(0)
    expect(ldoy.getDate()).toBe(21)
  })

  it('2017-08-21', () => {
    for (let i = 1; i <= 31; i++) {
      const lr = new Lunar(`2017/08/${i}`)
      // console.log(lr.toString())
      expect(lr.day).toBe((i + 9) % 30 || 30)
    }
  })

  it('2022/11/23', () => {
    let lastLr
    for (let i = 1; i <= 23; i++) {
      const lr = new Lunar(`2022/11/${i}`)
      // console.log(`2022/11/${i}`, lr.toString())
      expect(lr.day).toBe(i + 7)
      lastLr = lr
    }
    expect(lastLr?.isBigMonth).toBe(true)
  })
})
