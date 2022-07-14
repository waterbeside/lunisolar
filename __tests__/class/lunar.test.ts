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
    expect(lunar.toString()).toBe('一九五一年腊月初四子時')
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
})
