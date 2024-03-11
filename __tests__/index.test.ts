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
        .fromLunar({
          year: 2022,
          month: 10,
          day: 30
        })
        .format('YYYY-MM-DD')
    ).toBe('2022-11-23')

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

describe('lunisolar utc', () => {
  it('lunisolar.utc', () => {
    const utcLsr = lunisolar('2023-03-13 18:23', { isUTC: true })
    const lsr = lunisolar('2023-03-13 18:23')
    expect(utcLsr.format('YYYY-MM-DD HH:mm')).toBe('2023-03-13 18:23')
    expect(lunisolar.utc('2023-03-13 18:23').format('YYYY-MM-DD HH:mm')).toBe('2023-03-13 18:23')
    expect(lsr.utc().format('YYYY-MM-DD HH:mm')).toBe('2023-03-13 10:23')
    expect(lsr.utc().utcOffset(60).format('YYYY-MM-DD HH:mm')).toBe('2023-03-13 11:23')
    expect(
      lunisolar('2023-03-13 10:23', { isUTC: true, offset: 60 }).format('YYYY-MM-DD HH:mm')
    ).toBe('2023-03-13 11:23')
  })
  it('lunisolar.utc.offset.utc', () => {
    const lsr = lunisolar('2023/03/14 09:32')
    expect(lsr.utc().utcOffset(-60).format('YYYY-MM-DD HH:mm')).toBe('2023-03-14 00:32')
    expect(lsr.utc().utcOffset(-60).utc().format('YYYY-MM-DD HH:mm')).toBe('2023-03-14 01:32')
  })
  it('lunisolar.utc.local', () => {
    const lsr = lunisolar('2023/03/14 10:22')
    expect(lsr.format('YYYY/MM/DD HH:mm')).toBe('2023/03/14 10:22')
    expect(lsr.utc().format('YYYY/MM/DD HH:mm')).toBe('2023/03/14 02:22')
    expect(lsr.utc().local().format('YYYY/MM/DD HH:mm')).toBe('2023/03/14 10:22')
    expect(
      lunisolar.utc('2023-03-14 10:57').utcOffset(60).local().format('YYYY-MM-DD HH:mm:ss')
    ).toBe('2023-03-14 18:57:00')
    expect(lunisolar.utc('2023-03-14 10:57').local().format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2023-03-14 18:57:00'
    )
  })
  it('lunisolar utc clone', () => {
    expect(lunisolar('2023/04/09', { offset: 60 }).valueOf()).toBe(1680969600000)
    expect(lunisolar('2023/04/09').valueOf()).toBe(1680969600000)
    expect(lunisolar('2023/04/09', { offset: 60 }).format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2023-04-09 01:00:00'
    )
    expect(lunisolar('2023/04/09').utcOffset(60).clone().format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2023-04-08 17:00:00'
    )
  })
  it('lunisolar.utc.toDate', () => {
    const utcLst = lunisolar.utc('2023-03-14 10:57')
    expect(lunisolar.utc('2023-03-14 10:57').toDate().valueOf()).toBe(
      1678762620000 + 8 * 3600 * 1000
    )
    expect(lunisolar('2023-03-14 10:57').utc().toDate().valueOf()).toBe(1678762620000)
    expect(lunisolar('2023-03-14 10:57').toDate().valueOf()).toBe(1678762620000)
    expect(utcLst.toDate().valueOf()).toBe(1678791420000)
    expect(utcLst.valueOf()).toBe(1678791420000)
    expect(lunisolar('2023-03-14 11:57:00:000').toDate().valueOf()).toBe(1678766220000)
    expect(utcLst.utcOffset(60).format('YYYY-MM-DD HH:mm:ss')).toBe('2023-03-14 11:57:00')
    expect(utcLst.utcOffset(60).valueOf()).toBe(1678791420000)
    expect(utcLst.utcOffset(60).toDate().valueOf()).toBe(1678791420000)
    expect((utcLst.utcOffset(60).toDate().valueOf() - 1678791420000) / 3600000).toBe(0)
    expect(utcLst.valueOf()).toBe(1678791420000)
  })

  it('lunisolar lunar', () => {
    const utcLst = lunisolar.utc('2023-03-14 14:44')
    expect(utcLst.lunar.toString()).toBe('二〇二三年二月廿三未時')
    expect(lunisolar('2023-03-14 14:44').lunar.toString()).toBe('二〇二三年二月廿三未時')
    expect(lunisolar('2023-03-14 14:44').utc().lunar.toString()).toBe('二〇二三年二月廿三卯時')
    expect(lunisolar('2023-03-14 14:44', { offset: -120 }).lunar.toString()).toBe(
      '二〇二三年二月廿三午時'
    )
    expect(lunisolar('2023-03-14 14:44', { offset: -120 }).char8.hour.branch.name).toBe('午')
    expect(lunisolar('2023-03-14 14:44').add(-2, 'h').char8.hour.branch.name).toBe('午')
    expect(lunisolar('2023-03-14 14:44').utcOffset(6).char8.hour.branch.name).toBe('午')
  })

  it('lunisolar lunar 22 23', () => {
    // Time:  2024/3/6 22:00
    const ten = '2024/3/6 10:00'
    const tenChar8 = lunisolar(ten).char8

    console.log(lunisolar(ten).add(12, 'h').format('YYYY-MM-DD HH:mm:ss'))
    const res = `${ten}: ${tenChar8.year.stem.toString()}, ${tenChar8.year.branch.toString()} \
    ${tenChar8.month.stem.toString()}, ${tenChar8.month.branch.toString()} \
    ${tenChar8.day.stem.toString()}, ${tenChar8.day.branch.toString()}`
    expect(res).toBe('2024/3/6 10:00: 甲, 辰     丁, 卯     己, 巳')

    // Time: 2024/3/6 23:00
    const eleven = '2024/3/6 23:00'
    const elevenChar8 = lunisolar(eleven).add(12, 'h').char8
    const res2 = `${eleven}: ${elevenChar8.year.stem.toString()}, ${elevenChar8.year.branch.toString()} \
    ${elevenChar8.month.stem.toString()}, ${elevenChar8.month.branch.toString()} \
    ${elevenChar8.day.stem.toString()}, ${elevenChar8.day.branch.toString()}`
    expect(res2).toBe('2024/3/6 23:00: 甲, 辰     丁, 卯     庚, 午')
  })
})
