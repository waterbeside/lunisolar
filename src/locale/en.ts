const en: ILocale = {
  name: 'en',
  leap: 'leap',
  lunarYearUnit: '',
  lunarHourUnit: '',
  bigMonth: 'big',
  smallMonth: 'small',
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  lunarMonths: (() => {
    const res = []
    for (let i = 1; i < 13; i++) {
      res.push(`${i}st month`)
    }
    return res
  })(),
  lunarMonthsAlias: (() => {
    const res = []
    for (let i = 1; i < 13; i++) {
      res.push(`${i}st`)
    }
    return res
  })(),
  lunarDays: (() => {
    const res = []
    for (let i = 1; i < 31; i++) {
      res.push(`${i}`)
    }
    return res
  })(),
  numerals: '0123456789'.split(''),
  constellationName:
    'Aries_Taurus_Gemini_Cancer_Leo_Virgo_Libra_Scorpio_Sagittarius_Capricorn_Aquarius_Pisces'.split(
      '_'
    ),
  // 二十四节气
  // https://www.hko.gov.hk/en/gts/time/24solarterms.htm
  solarTerm:
    'Moderate Cold,Severe Cold,Spring Commences,Spring Showers,Insects Waken,Vernal Equinox,Bright and Clear,Corn Rain,Summer Commences,Corn Forms,Corn on Ear,Summer Solstice,Moderate Heat,Great Heat,Autumn Commences,End of Heat,White Dew,Autumnal Equinox,Cold Dew,Frost,Winter Commences,Light Snow,Heavy Snow,Heavy Snow'.split(
      ','
    ),
  // 季节
  seasonName: 'Spring,Summer,Autumn,Winter'.split(','),
  seasonShortName: 'Spr.,Sum.,Aut.,Win.'.split(','),
  // https://www.hko.gov.hk/en/gts/time/stemsandbranches.htm
  // 天干   0      1      2       3      4     5      6       7     8     9
  stems: ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'],
  //地支
  branchs: ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'],
  stemBranchSeparator: '-',
  // 生肖 https://en.wikipedia.org/wiki/Sexagenary_cycle
  chineseZodiac: [
    'Rat',
    'Ox',
    'Tiger',
    'Rabbit',
    'Dragon',
    'Snake',
    'Horse',
    'Goat',
    'Monkey',
    'Rooster',
    'Dog',
    'Pig'
  ],
  // 五行
  fiveElements: ['Wood', 'Fire', 'Earth', 'Metal', 'Water'],
  // 八卦           0     1     2     3     4         5    6    7
  eightTrigram: 'Earth_Thunder_Water_Lake_Mountain_Fire_Wind_Heaven'.split(''),
  directions: [
    '',
    'North',
    'Southwest',
    'East',
    'Southeast',
    'Central',
    'Northwest',
    'West',
    'Northeast',
    'South'
  ],
  meridiem: undefined
}

export default en
