export const J2000 = 2451545

/**
 * 每弧度的角秒数
 */
export const RAD = (180 * 3600) / Math.PI
/**
 * 每弧度的度数
 */
export const RADD = 180 / Math.PI
export const PI2 = Math.PI * 2
export const PI_2 = Math.PI / 2

/**
 * 行星星历修正表
 */
export const XL0_xzb = [
  //经(角秒),纬(角秒), 距(10-6AU)
  // eslint-disable-next-line prettier/prettier
  -0.08631, +0.00039, -0.00008,  //水星
  // eslint-disable-next-line prettier/prettier
  -0.07447, +0.00006, +0.00017,  //金星
  // eslint-disable-next-line prettier/prettier
  -0.07135, -0.00026, -0.00176,  //火星
  // eslint-disable-next-line prettier/prettier
  -0.20239, +0.00273, -0.00347,  //木星
  // eslint-disable-next-line prettier/prettier
  -0.25486, +0.00276, +0.42926,  //土星
  // eslint-disable-next-line prettier/prettier
  +0.24588, +0.00345, -14.46266, //天王星
  // eslint-disable-next-line prettier/prettier
  -0.95116, +0.02481, +58.30651  //海王星
]

/**
 * 中精度章动计算表
 */
export const nutB = [
  2.1824, -33.75705, 36e-6, -1720, 920, 3.5069, 1256.66393, 11e-6, -132, 57, 1.3375, 16799.4182,
  -51e-6, -23, 10, 4.3649, -67.5141, 72e-6, 21, -9, 0.04, -628.302, 0, -14, 0, 2.36, 8328.691, 0, 7,
  0, 3.46, 1884.966, 0, -5, 2, 5.44, 16833.175, 0, -4, 2, 3.69, 25128.11, 0, -3, 0, 3.55, 628.362,
  0, 2, 0
]
