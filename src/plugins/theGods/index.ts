import zh from './locale/zh'
import { TheGods } from './class/theGods'
import { God } from './class/god'
import { setTheGodsLocales } from './utils'

const theGods: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh, true)
  setTheGodsLocales(lsFactory._globalConfig.locales)
  const lsProto = lsClass.prototype
  Object.defineProperty(lsProto, 'theGods', {
    get(): TheGods {
      if (this.cache.has('theGods')) {
        const cacheData = this.cache.get('theGods')
        if (cacheData instanceof TheGods) return cacheData
      }
      const theGods = new TheGods(this)
      this.cache.set('theGods', theGods)
      return theGods
    }
  })
}

theGods.TheGods = TheGods
theGods.God = God
export default theGods
