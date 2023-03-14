// 全局配置
import zh from './locale/zh'
export const _GlobalConfig: GlobalConfig = {
  isUTC: false, // 是否使用UTC时间，为true时，lunisolar生成的所有时间都是UTC时间，需要用local转为本地时
  offset: 0, // 时间偏移，以分钟为单位
  changeAgeTerm: 2, // 换岁节气, 默认为立春，如果为null刚为正月初一换岁
  locales: { zh }, // 用于記錄語言的具體數據
  lang: 'zh' // 默認語言
}
