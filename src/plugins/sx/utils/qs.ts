import { SUO_KB, QI_KB, SUO_S, QI_S } from '../constants/qs'
import { J2000 } from '../constants/'
import { S_aLonT2, S_aLonT, MS_aLonT, MS_aLonT2 } from './xl'
import { dtT } from './deltaT'

const { floor } = Math

/************************
  实气实朔计算器
  适用范围 -722年2月22日——1959年12月
  平气平朔计算使用古历参数进行计算
  定朔、定气计算使用开普勒椭圆轨道计算，同时考虑了光行差和力学时与UT1的时间差
  古代历算仅在晚期才使用开普勒方法计算，此前多采用一些修正表并插值得到，精度很低，与本程序中
的开普勒方法存在误差，造成朔日计算错误1千多个，这些错误使用一个修正表进行订正。同样，定气部分
也使用了相同的方法时行订正。
  平气朔表的算法(线性拟合)：
  气朔日期计算公式：D = k*n + b  , 式中n=0,1,2,3,...,N-1, N为该式适用的范围
  h表示k不变b允许的误差,如果b不变则k许可误差为h/N
  每行第1个参数为k,第2参数为b
  public中定义的成员可以直接使用
*************************/

/**
 * 气朔解压缩
 */
function uncompressQS(s: string) {
  var o = '0000000000',
    o2 = o + o
  s = s.replace(/J/g, '00')
  s = s.replace(/I/g, '000')
  s = s.replace(/H/g, '0000')
  s = s.replace(/G/g, '00000')
  s = s.replace(/t/g, '02')
  s = s.replace(/s/g, '002')
  s = s.replace(/r/g, '0002')
  s = s.replace(/q/g, '00002')
  s = s.replace(/p/g, '000002')
  s = s.replace(/o/g, '0000002')
  s = s.replace(/n/g, '00000002')
  s = s.replace(/m/g, '000000002')
  s = s.replace(/l/g, '0000000002')
  s = s.replace(/k/g, '01')
  s = s.replace(/j/g, '0101')
  s = s.replace(/i/g, '001')
  s = s.replace(/h/g, '001001')
  s = s.replace(/g/g, '0001')
  s = s.replace(/f/g, '00001')
  s = s.replace(/e/g, '000001')
  s = s.replace(/d/g, '0000001')
  s = s.replace(/c/g, '00000001')
  s = s.replace(/b/g, '000000001')
  s = s.replace(/a/g, '0000000001')
  s = s.replace(/A/g, o2 + o2 + o2)
  s = s.replace(/B/g, o2 + o2 + o)
  s = s.replace(/C/g, o2 + o2)
  s = s.replace(/D/g, o2 + o)
  s = s.replace(/E/g, o2)
  s = s.replace(/F/g, o)
  return s
}

var SSQ = {
  //实朔实气计算器
  //private成员定义
  SB: uncompressQS(SUO_S), //朔修正表
  QB: uncompressQS(QI_S), //气修正表
  //朔直线拟合参数
  suoKB: SUO_KB,
  qiKB: QI_KB,
  soLow: function (W: number) {
    //低精度定朔计算,在2000年至600，误差在2小时以内(仍比古代日历精准很多)
    var v = 7771.37714500204
    var t = (W + 1.08472) / v,
      L
    t -=
      (-0.0000331 * t * t +
        0.10976 * Math.cos(0.785 + 8328.6914 * t) +
        0.02224 * Math.cos(0.187 + 7214.0629 * t) -
        0.03342 * Math.cos(4.669 + 628.3076 * t)) /
        v +
      (32 * (t + 1.8) * (t + 1.8) - 20) / 86400 / 36525
    return t * 36525 + 8 / 24
  },
  qiLow: function (W: number) {
    //最大误差小于30分钟，平均5分
    var t,
      L,
      v = 628.3319653318
    t = (W - 4.895062166) / v //第一次估算,误差2天以内
    t -=
      (53 * t * t +
        334116 * Math.cos(4.67 + 628.307585 * t) +
        2061 * Math.cos(2.678 + 628.3076 * t) * t) /
      v /
      10000000 //第二次估算,误差2小时以内

    L =
      48950621.66 +
      6283319653.318 * t +
      53 * t * t + //平黄经
      334166 * Math.cos(4.669257 + 628.307585 * t) + //地球椭圆轨道级数展开
      3489 * Math.cos(4.6261 + 1256.61517 * t) + //地球椭圆轨道级数展开
      2060.6 * Math.cos(2.67823 + 628.307585 * t) * t - //一次泊松项
      994 -
      834 * Math.sin(2.1824 - 33.75705 * t) //光行差与章动修正

    t -= (L / 10000000 - W) / 628.332 + (32 * (t + 1.8) * (t + 1.8) - 20) / 86400 / 36525
    return t * 36525 + 8 / 24
  },
  qiHigh: function (W: number) {
    //较高精度气
    var t = S_aLonT2(W) * 36525
    t = t - dtT(t) + 8 / 24
    var v = ((t + 0.5) % 1) * 86400
    if (v < 1200 || v > 86400 - 1200) t = S_aLonT(W) * 36525 - dtT(t) + 8 / 24
    return t
  },
  soHigh: function (W: number) {
    //较高精度朔
    var t = MS_aLonT2(W) * 36525
    t = t - dtT(t) + 8 / 24
    var v = ((t + 0.5) % 1) * 86400
    if (v < 1800 || v > 86400 - 1800) t = MS_aLonT(W) * 36525 - dtT(t) + 8 / 24
    return t
  },

  /**
   * 气朔解压缩
   */
  uncompress: uncompressQS,

  /**
   * public公有成员定义
   * @param jd jd应靠近所要取得的气朔日
   * @param qs qs='气'时，算节气的儒略日
   */
  calc: function (jd: number, qs: string) {
    jd += 2451545
    let i, D, n
    let B = this.suoKB,
      pc = 14
    if (qs == '气') (B = this.qiKB), (pc = 7)
    let f1 = B[0] - pc,
      f2 = B[B.length - 1] - pc,
      f3 = 2436935

    if (jd < f1 || jd >= f3) {
      //平气朔表中首个之前，使用现代天文算法。1960.1.1以后，使用现代天文算法 (这一部分调用了qi_high和so_high,所以需星历表支持)
      if (qs == '气')
        return Math.floor(
          this.qiHigh((Math.floor(((jd + pc - 2451259) / 365.2422) * 24) * Math.PI) / 12) + 0.5
        )
      //2451259是1999.3.21,太阳视黄经为0,春分.定气计算
      else
        return Math.floor(
          this.soHigh(Math.floor((jd + pc - 2451551) / 29.5306) * Math.PI * 2) + 0.5
        ) //2451551是2000.1.7的那个朔日,黄经差为0.定朔计算
    } else if (jd >= f1 && jd < f2) {
      //平气或平朔
      for (i = 0; i < B.length; i += 2) if (jd + pc < B[i + 2]) break
      D = B[i] + B[i + 1] * Math.floor((jd + pc - B[i]) / B[i + 1])
      D = Math.floor(D + 0.5)
      if (D == 1683460) D++ //如果使用太初历计算-103年1月24日的朔日,结果得到的是23日,这里修正为24日(实历)。修正后仍不影响-103的无中置闰。如果使用秦汉历，得到的是24日，本行D不会被执行。
      return D - 2451545
      // } else if (jd >= f2 && jd < f3) {
    } else {
      //定气或定朔
      if (qs == '气') {
        D = Math.floor(
          this.qiLow((Math.floor(((jd + pc - 2451259) / 365.2422) * 24) * Math.PI) / 12) + 0.5
        ) //2451259是1999.3.21,太阳视黄经为0,春分.定气计算
        n = this.QB.substr(Math.floor(((jd - f2) / 365.2422) * 24), 1) //找定气修正值
      } else {
        D = Math.floor(this.soLow(Math.floor((jd + pc - 2451551) / 29.5306) * Math.PI * 2) + 0.5) //2451551是2000.1.7的那个朔日,黄经差为0.定朔计算
        n = this.SB.substr(Math.floor((jd - f2) / 29.5306), 1) //找定朔修正值
      }
      if (n == '1') return D + 1
      if (n == '2') return D - 1
      return D
    }
    // return D
  },

  //排月序(生成实际年历),在调用calcY()后得到以下数据
  //时间系统全部使用北京时，即使是天象时刻的输出，也是使用北京时
  //如果天象的输出不使用北京时，会造成显示混乱，更严重的是无法与古历比对
  leap: 0, //闰月位置
  ym: new Array(), // 用于存放各个月份（用数字表示）
  ZQ: new Array(), //中气表,其中.liqiu是节气立秋的儒略日,计算三伏时用到
  ZQ_PE1: NaN,
  ZQ_PE2: NaN,
  HS: new Array(), //合朔表
  dx: new Array(), //各月大小
  Yn: new Array(), //年计数

  /**
   * 农历排月序计算,可定出农历,有效范围：两个冬至之间(冬至一 <= d < 冬至二)
   */
  calcY: function (jd: number) {
    var A = this.ZQ,
      B = this.HS //中气表,日月合朔表(整日)
    var i, k, W, w

    //该年的气
    W = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355 //355是2000.12冬至,得到较靠近jd的冬至估计值
    if (this.calc(W, '气') > jd) W -= 365.2422
    for (i = 0; i < 25; i++) A[i] = this.calc(W + 15.2184 * i, '气') //25个节气时刻(北京时间),从冬至开始到下一个冬至以后
    this.ZQ_PE1 = this.calc(W - 15.2, '气')
    this.ZQ_PE2 = this.calc(W - 30.4, '气') //补算二气,确保一年中所有月份的“气”全部被计算在内

    //今年"首朔"的日月黄经差w
    w = this.calc(A[0], '朔') //求较靠近冬至的朔日
    if (w > A[0]) w -= 29.53

    //该年所有朔,包含14个月的始末
    for (i = 0; i < 15; i++) B[i] = this.calc(w + 29.5306 * i, '朔')

    //月大小
    this.leap = 0
    for (i = 0; i < 14; i++) {
      this.dx[i] = this.HS[i + 1] - this.HS[i] //月大小
      this.ym[i] = i //月序初始化
    }

    //-721年至-104年的后九月及月建问题,与朔有关，与气无关
    var YY = floor((this.ZQ[0] + 10 + 180) / 365.2422) + 2000 //确定年份
    if (YY >= -721 && YY <= -104) {
      var ns = new Array(),
        yy
      for (i = 0; i < 3; i++) {
        yy = YY + i - 1
        //颁行历年首, 闰月名称, 月建
        if (yy >= -721)
          (ns[i] = this.calc(
            1457698 - J2000 + floor(0.342 + (yy + 721) * 12.368422) * 29.5306,
            '朔'
          )),
            (ns[i + 3] = 13), // 十三月为闰月
            (ns[i + 6] = 2) //春秋历,ly为-722.12.17
        if (yy >= -479)
          (ns[i] = this.calc(
            1546083 - J2000 + floor(0.5 + (yy + 479) * 12.368422) * 29.5306,
            '朔'
          )),
            (ns[i + 3] = 13), // 十三月为闰月
            (ns[i + 6] = 2) //战国历,ly为-480.12.11
        if (yy >= -220)
          (ns[i] = this.calc(1640641 - J2000 + floor(0.866 + (yy + 220) * 12.369) * 29.5306, '朔')),
            (ns[i + 3] = 209), // 后九用209表示
            (ns[i + 6] = 11) //秦汉历,ly为-221.10.31
      }
      var nn, f1
      for (i = 0; i < 14; i++) {
        for (nn = 2; nn >= 0; nn--) if (this.HS[i] >= ns[nn]) break
        f1 = floor((this.HS[i] - ns[nn] + 15) / 29.5306) //该月积数
        if (f1 < 12) this.ym[i] = (f1 + ns[nn + 6] + 10) % 12 // 用数字表示月份名称
        else this.ym[i] = ns[nn + 3]
      }
      return
    }

    //无中气置闰法确定闰月,(气朔结合法,数据源需有冬至开始的的气和朔)
    if (B[13] <= A[24]) {
      //第13月的月末没有超过冬至(不含冬至),说明今年含有13个月
      for (i = 1; B[i + 1] > A[2 * i] && i < 13; i++); //在13个月中找第1个没有中气的月份
      this.leap = i
      for (; i < 14; i++) this.ym[i]--
    }

    //名称转换(月建别名)
    for (i = 0; i < 14; i++) {
      const Dm = this.HS[i] + J2000,
        v2 = this.ym[i] //Dm初一的儒略日,v2为月建序号
      let mc = (v2 + 10) % 12 //月建对应的默认月名称：建子十一,建丑十二,建寅为正……
      if (Dm >= 1724360 && Dm <= 1729794)
        mc = (mc + 1) % 12 //  8.01.15至 23.12.02 建子为十二,其它顺推
      else if (Dm >= 1807724 && Dm <= 1808699)
        mc = (mc + 1) % 12 //237.04.12至239.12.13 建子为十二,其它顺推
      else if (Dm >= 1999349 && Dm <= 1999467) mc = (mc + 2) % 12 //761.12.02至762.03.30 建子为正月,其它顺推
      // 由于改用数字表示，所以下边注释
      // else if (Dm >= 1973067 && Dm <= 1977052) {
      //   if (v2 % 12 == 0) mc = '正'
      //   if (v2 == 2) mc = '一'
      // } //689.12.18至700.11.15 建子为正月,建寅为一月,其它不变
      // if (Dm == 1729794 || Dm == 1808699) mc = '拾贰' //239.12.13及23.12.02均为十二月,为避免两个连续十二月，此处改名
      this.ym[i] = mc
    }
  }
}
