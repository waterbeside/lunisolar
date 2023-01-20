import takeSound from '../takeSound'
import { setLocales } from './utils'
import zh from './locale/zh'
import { Char8Ex } from './class/char8ex'

const char8ex: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh, true)
  setLocales(lsFactory._globalConfig.locales)
  // 加載纳音功能
  lsFactory.extend(takeSound)
  const lsPrototype = lsClass.prototype
  Object.defineProperty(lsPrototype, 'char8ex', {
    value: function (sex: 0 | 1) {
      const cacheKey = `char8ex:sex_${sex}`
      if (this.cache.has(cacheKey)) {
        const cacheData = this.cache.get(cacheKey)
        if (cacheData instanceof Char8Ex) return cacheData
      }
      const char8ex = new Char8Ex(this, sex)
      this.cache.set(cacheKey, char8ex)
      return char8ex
    }
  })
}
export default char8ex
