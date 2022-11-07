import lunisolar from '../src'
import en from '../src/locale/en'

describe('lunisolar().char8', () => {
  it('更改换岁时机, 冬至换岁，中气换月', () => {
    const lsr = lunisolar('2022-01-05', { changeAgeTerm: -1 })
    expect(lsr.char8.year.toString()).toBe('壬寅')
    expect(lsr.char8.month.toString()).toBe('庚子')
    expect(lunisolar('2022-01-02', { changeAgeTerm: -1 }).char8.month.toString()).toBe('庚子')
    expect(lunisolar('2022-01-02', { changeAgeTerm: -1 }).char8.month.toString()).toBe('庚子')
    expect(lunisolar('2022-01-20', { changeAgeTerm: -1 }).char8.month.toString()).toBe('辛丑')
    expect(lunisolar('2021-12-21', { changeAgeTerm: -1 }).char8.year.toString()).toBe('壬寅')
    expect(lunisolar('2021-12-20', { changeAgeTerm: -1 }).char8.year.toString()).toBe('辛丑')
  })

  it('更改换岁时机, 大寒换岁，中气换月', () => {
    expect(lunisolar('2022-01-05', { changeAgeTerm: 1 }).char8.year.toString()).toBe('辛丑')
    expect(lunisolar('2022-01-20', { changeAgeTerm: 1 }).char8.year.toString()).toBe('壬寅')
    expect(lunisolar('2022-01-20', { changeAgeTerm: 1 }).char8.month.toString()).toBe('辛丑')
  })

  it('正月初一换岁', () => {
    expect(lunisolar('2022-01-05', { changeAgeTerm: null }).char8.year.toString()).toBe('辛丑')
    expect(lunisolar('2022-01-20', { changeAgeTerm: null }).char8.year.toString()).toBe('辛丑')
    expect(lunisolar('2022-02-1', { changeAgeTerm: null }).char8.year.toString()).toBe('壬寅')
    expect(lunisolar('2022-02-1', { changeAgeTerm: null }).char8.month.toString()).toBe('辛丑')
    expect(lunisolar('2022-02-4', { changeAgeTerm: null }).char8.month.toString()).toBe('壬寅')
    expect(lunisolar('2022-02-4', { changeAgeTerm: null }).format('cY cM cD')).toBe(
      '壬寅 壬寅 戊子'
    )
  })

  it('test 2018-12', () => {
    expect(lunisolar('2018-12-06').char8.month.toString()).toBe('癸亥')
    expect(lunisolar('2018-12-05').char8.month.toString()).toBe('癸亥')
    expect(lunisolar('2018-12-04').char8.month.toString()).toBe('癸亥')
    expect(lunisolar('2018-12-03').format('cM')).toBe('癸亥')
    expect(lunisolar('2018-12-02').format('cM')).toBe('癸亥')
  })

  it('test en', () => {
    lunisolar.locale(en)
    lunisolar.config({
      lang: 'zh'
    })
    expect(lunisolar('2017-12-01', { lang: 'en' }).char8.month.toString()).toBe('Xin-Hai')
  })
})

describe('lunisolar().solarTerm', () => {
  it('节气', () => {
    expect(lunisolar('2022-02-04').solarTerm?.toString()).toBe('立春')
    expect(lunisolar('2022-01-20').solarTerm?.toString()).toBe('大寒')
    expect(lunisolar('2022-02-1').solarTerm?.toString() || null).toBe(null)
  })
  it('最近节气', () => {
    expect(lunisolar('2022-02-06').recentSolarTerm(0)[0].toString()).toBe('立春')
    expect(lunisolar('2022-02-01').recentSolarTerm(0)[0].toString()).toBe('小寒')
    expect(lunisolar('2022-02-01').recentSolarTerm(1)[0].toString()).toBe('大寒')
    expect(lunisolar('2022-02-22').recentSolarTerm(0)[0].toString()).toBe('立春')
    expect(lunisolar('2022-02-22').recentSolarTerm(1)[0].toString()).toBe('雨水')
    expect(lunisolar('2022-02-22').recentSolarTerm(2)[0].toString()).toBe('雨水')
  })
})
