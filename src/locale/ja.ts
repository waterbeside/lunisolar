const lunarMonths = (() => {
  const res = []
  for (let i = 1; i < 13; i++) {
    res.push(`${i}月`)
  }
  return res
})()

const ja = {
  name: 'ja',
  leap: '閏',
  lunarYearUnit: '',
  lunarHourUnit: '',
  bigMonth: '大',
  smallMonth: '小',
  weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  months: (() => {
    const res = []
    for (let i = 1; i < 13; i++) {
      res.push(`${i}月`)
    }
    return res
  })(),
  lunarMonths,
  lunarMonthsAlias: [...lunarMonths],
  lunarDays: (() => {
    const res = []
    for (let i = 1; i < 31; i++) {
      res.push(`${i}日`)
    }
    return res
  })(),
  numerals: '0123456789'.split(''),
  constellationName:
    '牡羊座_牡牛座_双子座_蟹座_獅子座_乙女座_天秤座_射手座_蠍座_山羊座_水瓶座_魚座'.split('_'),
  // 二十四节气
  solarTerm:
    '小寒_大寒_立春_雨水_啓蟄_春分_清明_穀雨_立夏_小満_芒種_夏至_小暑_大暑_立秋_処暑_白露_秋分_寒露_霜降_立冬_小雪_大雪_冬至'.split(
      '_'
    ),
  // 季节
  seasonName: '春夏秋冬'.split(''),
  // 天干   0     1    2     3     4     5     6     7     8     9
  stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  //地支
  branchs: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
  stemBranchSeparator: '',
  chineseZodiac: ['鼠', '牛', '虎', '兎', '竜', '蛇', '馬', '羊', '猿', '鶏', '犬', '猪'],
  // 五行
  fiveElements: ['木', '火', '土', '金', '水'],
  // 八卦        0 1 2 3 4 5 6 7
  eightTrigram: '坤震坎兌艮離巽乾'.split(''),
  // 方向       0    1      2     3     4       5     6     7      8     9
  directions: ['', '北', '南西', '東', '南東', '中', '北西', '西', '北東', '南'],
  meridiem: null
}

export default ja
