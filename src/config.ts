// 全局配置
import zh from './locale/zh'
export const _GlobalConfig: GlobalConfig = {
  changeEgeTerm: 2, // 换岁节气, 默认为立春，如果为null刚为正月初一换岁
  locales: { zh }, // 用于記錄語言的具體數據
  lang: 'zh' // 默認語言
}
