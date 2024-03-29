/* eslint-disable prettier/prettier */

const locale: LsrLocale = {
  name: 'zh',
  /**
  逐月胎神起例
  正十二月在床房，
  二三九十門户中，
  四六十一灶勿犯，
  五甲七子八廁凶。
  */

  /**
  ----天干六甲胎神歌----
  甲己之日占在門，乙庚碓磨休移动。
  丙辛廚灶莫相干，丁壬倉庫忌修弄。
  戊癸房床若移整，犯之孕妇堕孩童。
  */
  stemFetalGodPlace: ['門', '碓磨', '廚灶', '倉庫', '房床'],

  /**
  ----地支六甲胎神歌----
  子午二日碓须忌，丑未廁道莫修移。
  寅申火爐休要动，卯酉大門修当避。
  辰戌雞棲巳亥床，犯着六甲身堕胎。
  */
  branchFetalGodPlace: ['碓', '廁', '爐', '門', '雞棲', '床'],

  //                   0      1     2      3    4       5     6       7     8
  fetalGodDirection: ['中', '東', '東南', '南', '西南', '西', '西北', '北', '東北'],

  fetalGodDayDesc: [
    // 甲            乙             丙             丁            戊             己              庚             辛             壬             癸
    '占門碓外東南', '碓磨廁外東南', '廚灶爐外正南', '倉庫門外正南', '房床棲外正南', '占門床外正南', '占碓磨外正南', '廚灶廁外西南', '倉庫爐外西南', '房床門外西南',
    '門雞棲外西南', '碓磨床外西南', '廚灶碓外西南', '倉庫廁外正西', '房床爐外正西', '占大門外正西', '碓磨棲外正西', '廚灶床外正西', '倉庫碓外西北', '房床廁外西北',
    '占門爐外西北', '門碓磨外西北', '廚灶棲外西北', '倉庫床外西北', '房床碓外正北', '占門廁外正北', '碓磨爐外正北', '廚灶門外正北', '倉庫棲外正北', '占房床房内北',
    '占門碓房内北', '碓磨廁房内北', '廚灶爐房内北', '門倉庫房内北', '房床棲房內中', '占門床房內中', '占碓磨房内南', '廚灶廁房内南', '倉庫爐房内南', '房床門房内西',
    '門雞棲房内東', '碓磨床房内東', '廚灶碓房内東', '倉庫廁房内東', '房床爐房内中', '占大門外東北', '碓磨棲外東北', '廚灶床外東北', '倉庫碓外東北', '房床廁外東北',
    '占門爐外東北', '門碓磨外正東', '廚灶棲外正東', '倉庫床外正東', '房床碓外正東', '占門廁外正東', '碓磨爐外東南', '廚灶門外東南', '倉庫棲外東南', '占房床外東南'
  ],

  fetalGodInsideDesc: '内',
  fetalGodOutsideDesc: '外',

}

export default locale