const locale = {
  name: 'zh-cn',
  leap: '闰',
  lunarYearUnit: '年',
  lunarHourUnit: '时',
  bigMonth: '大',
  smallMonth: '小',
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  constellationName:
    '白羊座_金牛座_双子座_巨蟹座_狮子座_处女座_天秤座_天蝎座_射手座_摩羯座_水瓶座_双鱼座'.split(
      '_'
    ),
  // 二十四节气
  solarTerm:
    '小寒_大寒_立春_雨水_惊蛰_春分_清明_谷雨_立夏_小满_芒种_夏至_小暑_大暑_立秋_处暑_白露_秋分_寒露_霜降_立冬_小雪_大雪_冬至'.split(
      '_'
    ),

  chineseZodiac: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
  // 八卦        0 1 2 3 4 5 6 7
  eightTrigram: '坤震坎兑艮离巽乾'.split('')
}

export default locale
