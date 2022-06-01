import { Lunar } from '../src/lunar.class'

describe('test lunar class', () => {
  it('1901-02-19', () => {
    const lunar = new Lunar('1901-02-19')
    expect(lunar.getMonth()).toBe(1)
    expect(lunar.getDate()).toBe(1)
  })

  it('1901-02-19 23:10', () => {
    const lunar = new Lunar('1901-02-19 23:10')
    expect(lunar.getMonth()).toBe(1)
    expect(lunar.getDate()).toBe(2)
  })

  it('1903-06-27', () => {
    const lunar = new Lunar('1903-06-27')
    expect(lunar.getMonth()).toBe(105)
    expect(lunar.getDate()).toBe(3)
  })

  it('1951-12-31', () => {
    const lunar = new Lunar('1951-12-31')
    expect(lunar.getMonth()).toBe(12)
    expect(lunar.getDate()).toBe(4)
  })

  it('1952-01-06', () => {
    const lunar = new Lunar('1952-01-06')
    expect(lunar.getMonth()).toBe(12)
    expect(lunar.getDate()).toBe(10)
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
