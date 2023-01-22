// 寿星万年历工具，参考 https://github.com/sxwnl/sxwnl/
// const { PI } = Math
import { XL0 } from '../constants/xl0'
import { XL1 } from '../constants/xl1'
import { RAD, XL0_xzb, nutB } from '../constants'

const { floor, PI, sqrt, abs, sin, cos, tan, asin, acos, atan, atan2 } = Math

/**
 * 求余
 */
export function mod2(v: number, n: number) {
  return ((v % n) + n) % n
}

/**
 * 太阳光行差,t是世纪数
 */
export function gxc_sunLon(t: number) {
  var v = -0.043126 + 628.301955 * t - 0.000002732 * t * t //平近点角
  var e = 0.016708634 - 0.000042037 * t - 0.0000001267 * t * t
  return (-20.49552 * (1 + e * cos(v))) / RAD //黄经光行差
}

/**
 * 黄纬光行差
 */
export function gxc_sunLat(t: number) {
  return 0
}
/**
 * 月球经度光行差,误差0.07"
 */
export function gxc_moonLon(t: number) {
  return -3.4e-6
}
/**
 * 月球纬度光行差,误差0.006"
 */
export function gxc_moonLat(t: number) {
  return (0.063 * Math.sin(0.057 + 8433.4662 * t + 0.000064 * t * t)) / RAD
}
