const locale: LocaleData = {
  name: 'zh',
  leap: '閏',
  year: '年',
  hour: '時',
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  weekdaysShort: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
  weekdaysMin: ['日', '一', '二', '三', '四', '五', '六'],
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  lunarMonths: '正月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  lunarMonthsAlias: '正月_二月_三月_四月_五月_六月_七月_八月_九月_十月_冬月_腊月'.split('_'),
  lunarDays:
    '初一_初二_初三_初四_初五_初六_初七_初八_初九_初十_十一_十二_十三_十四_十五_十六_十七_十八_十九_二十_廿一_廿二_廿三_廿四_廿五_廿六_廿七_廿八_廿九_三十'.split(
      '_'
    ),

  numberString: '〇一二三四五六七八九十'.split(''),
  constellationName:
    '白羊座_金牛座_雙子座_巨蟹座_狮子座_處女座_天秤座_天蝎座_射手座_摩羯座_水瓶座_雙魚座'.split(
      '_'
    ),
  // 二十四节气
  solarTerm:
    '小寒_大寒_立春_雨水_驚蟄_春分_清明_穀雨_立夏_小滿_芒種_夏至_小暑_大暑_立秋_處暑_白露_秋分_寒露_霜降_立冬_小雪_大雪_冬至'.split(
      '_'
    ),
  // 天干   0     1    2     3     4     5     6     7     8     9
  stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  //地支
  branchs: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
  // 五行
  fiveElements: ['木', '火', '土', '金', '水'],
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日Ah点mm分',
    LLLL: 'YYYY年M月D日ddddAh点mm分',
    l: 'YYYY/M/D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  meridiem: (hour: number, minute: number) => {
    const hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1100) {
      return '上午'
    } else if (hm < 1300) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    }
    return '晚上'
  }
}

export default locale
