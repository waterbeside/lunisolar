import lunisolar from '../src'
import en from '../src/locale/en'
import ja from '../src/locale/ja'

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

describe('lunisolar.fromLunar', () => {
  lunisolar.locale(ja, true)
  it('阴历反查', () => {
    expect(
      lunisolar
        .fromLunar({
          year: 2022,
          month: 10,
          day: 25
        })
        .format('YYYY-MM-DD')
    ).toBe('2022-11-18')

    expect(
      lunisolar
        .fromLunar({
          year: 2020,
          month: 104,
          day: 24
        })
        .format('YYYY-MM-DD')
    ).toBe('2020-06-15')

    expect(
      lunisolar
        .fromLunar({
          year: '二〇二零',
          month: '閏四月',
          day: '廿四'
        })
        .format('YYYY-MM-DD')
    ).toBe('2020-06-15')

    expect(
      lunisolar
        .fromLunar({
          year: 2020,
          month: 4,
          day: 24,
          isLeapMonth: true
        })
        .format('YYYY-MM-DD')
    ).toBe('2020-06-15')

    expect(
      lunisolar
        .fromLunar({
          year: 2020,
          month: 4,
          day: 24
        })
        .format('YYYY-MM-DD')
    ).toBe('2020-05-16')

    expect(
      lunisolar
        .fromLunar({
          year: 1991,
          month: 10,
          day: 5
        })
        .format('YYYY-MM-DD')
    ).toBe('1991-11-10')

    expect(
      lunisolar
        .fromLunar({
          year: '一九九一',
          month: '十月',
          day: '初五'
        })
        .format('YYYY-MM-DD')
    ).toBe('1991-11-10')

    expect(
      lunisolar
        .fromLunar({
          year: 2022,
          month: 12,
          day: 30
        })
        .format('YYYY-MM-DD')
    ).toBe('2023-01-21')

    expect(
      lunisolar
        .fromLunar({
          year: 2023,
          month: 1,
          day: 1
        })
        .format('YYYY-MM-DD')
    ).toBe('2023-01-22')

    expect(
      lunisolar
        .fromLunar(
          {
            year: '二〇二〇',
            month: '睦月',
            day: '一日'
          },
          {
            lang: 'ja'
          }
        )
        .format('YYYY-MM-DD')
    ).toBe('2020-01-25')
  })
})
