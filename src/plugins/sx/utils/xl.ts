import { XL0 } from '../constants/xl0'
import { XL1 } from '../constants/xl1'
import { RAD, XL0_xzb, nutB } from '../constants'
import { gxc_moonLon, gxc_sunLon } from './func'

const { floor, PI, sqrt, abs, sin, cos, tan, asin, acos, atan, atan2 } = Math

/**
 * 行星星历
 * @param xt xt星体
 * @param zn zn坐标号
 * @param t t儒略世纪数
 * @param n n计算项数
 */
function XL0_calc(xt: number, zn: number, t: number, n: number) {
  //xt星体,zn坐标号,t儒略世纪数,n计算项数
  t /= 10 //转为儒略千年数
  var i,
    j,
    v = 0,
    tn = 1,
    c
  var F = XL0[xt],
    n1,
    n2,
    N
  var n0,
    pn = zn * 6 + 1,
    N0 = F[pn + 1] - F[pn] //N0序列总数
  for (i = 0; i < 6; i++, tn *= t) {
    ;(n1 = F[pn + i]), (n2 = F[pn + 1 + i]), (n0 = n2 - n1)
    if (!n0) continue
    if (n < 0) N = n2 //确定项数
    else {
      N = floor((3 * n * n0) / N0 + 0.5) + n1
      if (i) N += 3
      if (N > n2) N = n2
    }
    for (j = n1, c = 0; j < N; j += 3) c += F[j] * cos(F[j + 1] + t * F[j + 2])
    v += c * tn
  }
  v /= F[0]
  if (xt == 0) {
    //地球
    var t2 = t * t,
      t3 = t2 * t //千年数的各次方
    if (zn == 0) v += (-0.0728 - 2.7702 * t - 1.1019 * t2 - 0.0996 * t3) / RAD
    if (zn == 1) v += (+0.0 + 0.0004 * t + 0.0004 * t2 - 0.0026 * t3) / RAD
    if (zn == 2) v += (-0.002 + 0.0044 * t + 0.0213 * t2 - 0.025 * t3) / 1000000
  } else {
    //其它行星
    var dv = XL0_xzb[(xt - 1) * 3 + zn]
    if (zn == 0) v += (-3 * t) / RAD
    if (zn == 2) v += dv / 1000000
    else v += dv / RAD
  }
  return v
}

//=================================月亮星历--=======================================
//==================================================================================

/**
 * 月亮星历
 * @param zn zn坐标号
 * @param t t儒略世纪数
 * @param n n计算项数
 */
function XL1_calc(zn: number, t: number, n: number) {
  //计算月亮
  var ob = XL1[zn]
  var i,
    j,
    F,
    N,
    v = 0,
    tn = 1,
    c
  var t2 = t * t,
    t3 = t2 * t,
    t4 = t3 * t,
    t5 = t4 * t,
    tx = t - 10
  if (zn == 0) {
    v += (3.81034409 + 8399.684730072 * t - 3.319e-5 * t2 + 3.11e-8 * t3 - 2.033e-10 * t4) * RAD //月球平黄经(弧度)
    v += 5028.792262 * t + 1.1124406 * t2 + 0.00007699 * t3 - 0.000023479 * t4 - 0.0000000178 * t5 //岁差(角秒)
    if (tx > 0) v += -0.866 + 1.43 * tx + 0.054 * tx * tx //对公元3000年至公元5000年的拟合,最大误差小于10角秒
  }
  ;(t2 /= 1e4), (t3 /= 1e8), (t4 /= 1e8)
  n *= 6
  if (n < 0) n = ob[0].length
  for (i = 0; i < ob.length; i++, tn *= t) {
    F = ob[i]
    N = floor((n * F.length) / ob[0].length + 0.5)
    if (i) N += 6
    if (N >= F.length) N = F.length
    for (j = 0, c = 0; j < N; j += 6)
      c += F[j] * cos(F[j + 1] + t * F[j + 2] + t2 * F[j + 3] + t3 * F[j + 4] + t4 * F[j + 5])
    v += c * tn
  }
  if (zn != 2) v /= RAD
  return v
}

//物件XL : 日月黄道平分点坐标、视坐标、速度、已知经度反求时间等方面的计算
// export const XL = {
//日月星历基本函数类
//=====================
//星历函数(日月球面坐标计算)

/**
 * 地球经度计算,返回Date分点黄经,传入世纪数、取项数
 */
export const eLon = function (t: number, n: number): number {
  return XL0_calc(0, 0, t, n)
}

/**
 * 月球经度计算,返回Date分点黄经,传入世纪数,n是项数比例
 */
export const mLon = function (t: number, n: number): number {
  return XL1_calc(0, t, n)
}

//=========================
export const eV = function (t: number) {
  //地球速度,t是世纪数,误差小于万分3
  var f = 628.307585 * t
  return (
    628.332 +
    21 * sin(1.527 + f) +
    0.44 * sin(1.48 + f * 2) +
    0.129 * sin(5.82 + f) * t +
    0.00055 * sin(4.21 + f) * t * t
  )
}

export const mV = function (t: number) {
  //月球速度计算,传入世经数
  var v = 8399.71 - 914 * sin(0.7848 + 8328.691425 * t + 0.0001523 * t * t) //误差小于5%
  v -=
    179 * sin(2.543 + 15542.7543 * t) + //误差小于0.3%
    160 * sin(0.1874 + 7214.0629 * t) +
    62 * sin(3.14 + 16657.3828 * t) +
    34 * sin(4.827 + 16866.9323 * t) +
    22 * sin(4.9 + 23871.4457 * t) +
    12 * sin(2.59 + 14914.4523 * t) +
    7 * sin(0.23 + 6585.7609 * t) +
    5 * sin(0.9 + 25195.624 * t) +
    5 * sin(2.32 - 7700.3895 * t) +
    5 * sin(3.88 + 8956.9934 * t) +
    5 * sin(0.49 + 7771.3771 * t)
  return v
}

//=========================
/**
 * 月日视黄经的差值
 */
export const MS_aLon = function (t: number, Mn: number, Sn: number) {
  return mLon(t, Mn) + gxc_moonLon(t) - (eLon(t, Sn) + gxc_sunLon(t) + Math.PI)
}

/**
 * 太阳视黄经
 */
export const S_aLon = function (t: number, n: number) {
  return eLon(t, n) + nutationLon2(t) + gxc_sunLon(t) + Math.PI //注意，这里的章动计算很耗时
}

// 天文学公式
/**
 * 已知地球真黄经求时间
 */
export const eLonT = function (W: number) {
  var t,
    v = 628.3319653318
  t = (W - 1.75347) / v
  v = eV(t) //v的精度0.03%，详见原文
  t += (W - eLon(t, 10)) / v
  v = eV(t) //再算一次v有助于提高精度,不算也可以
  t += (W - eLon(t, -1)) / v
  return t
}

/**
 * 已知真月球黄经求时间
 */
export const mLonT = function (W: number) {
  var t,
    v = 8399.70911033384
  t = (W - 3.81034) / v
  t += (W - mLon(t, 3)) / v
  v = mV(t) //v的精度0.5%，详见原文
  t += (W - mLon(t, 20)) / v
  t += (W - mLon(t, -1)) / v
  return t
}

export const MS_aLonT = function (W: number) {
  //已知月日视黄经差求时间
  var t,
    v = 7771.37714500204
  t = (W + 1.08472) / v
  t += (W - MS_aLon(t, 3, 3)) / v
  v = mV(t) - eV(t) //v的精度0.5%，详见原文
  t += (W - MS_aLon(t, 20, 10)) / v
  t += (W - MS_aLon(t, -1, 60)) / v
  return t
}

export const S_aLonT = function (W: number) {
  //已知太阳视黄经反求时间
  var t,
    v = 628.3319653318
  t = (W - 1.75347 - Math.PI) / v
  v = eV(t) //v的精度0.03%，详见原文
  t += (W - S_aLon(t, 10)) / v
  v = eV(t) //再算一次v有助于提高精度,不算也可以
  t += (W - S_aLon(t, -1)) / v
  return t
}

/**
 * 已知月日视黄经差求时间,高速低精度,误差不超过600秒(只验算了几千年)
 */
export const MS_aLonT2 = function (W: number) {
  var t,
    v = 7771.37714500204
  t = (W + 1.08472) / v
  var L,
    t2 = t * t
  t -=
    (-0.00003309 * t2 +
      0.10976 * cos(0.784758 + 8328.6914246 * t + 0.000152292 * t2) +
      0.02224 * cos(0.1874 + 7214.0628654 * t - 0.00021848 * t2) -
      0.03342 * cos(4.669257 + 628.307585 * t)) /
    v
  L =
    mLon(t, 20) -
    (4.8950632 +
      628.3319653318 * t +
      0.000005297 * t * t +
      0.0334166 * cos(4.669257 + 628.307585 * t) +
      0.0002061 * cos(2.67823 + 628.307585 * t) * t +
      0.000349 * cos(4.6261 + 1256.61517 * t) -
      20.5 / RAD)
  v =
    7771.38 -
    914 * sin(0.7848 + 8328.691425 * t + 0.0001523 * t * t) -
    179 * sin(2.543 + 15542.7543 * t) -
    160 * sin(0.1874 + 7214.0629 * t)
  t += (W - L) / v
  return t
}

/**
 * 已知太阳视黄经反求时间,高速低精度,最大误差不超过600秒
 */
export const S_aLonT2 = function (W: number) {
  var t,
    v = 628.3319653318
  t = (W - 1.75347 - Math.PI) / v
  t -=
    (0.000005297 * t * t +
      0.0334166 * cos(4.669257 + 628.307585 * t) +
      0.0002061 * cos(2.67823 + 628.307585 * t) * t) /
    v
  t += (W - eLon(t, 8) - Math.PI + (20.5 + 17.2 * sin(2.1824 - 33.75705 * t)) / RAD) / v
  return t
}

/**
 * 只计算黄经章动
 */
export function nutationLon2(t: number) {
  var i,
    a,
    t2 = t * t,
    dL = 0,
    B = nutB
  for (i = 0; i < B.length; i += 5) {
    if (i == 0) a = -1.742 * t
    else a = 0
    dL += (B[i + 3] + a) * sin(B[i] + B[i + 1] * t + B[i + 2] * t2)
  }
  return dL / 100 / RAD
}
