import zh from './locale/zh'
import { TheGods } from './class/theGods'
import { setTheGodsLocales } from './locale'

export interface LunisolarEx extends lunisolar.Lunisolar {
  theGods: TheGods
}

const theGods: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh, true)
  setTheGodsLocales(lsFactory._globalConfig.locales)
  const lsProto = lsClass.prototype as unknown as LunisolarEx
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
export default theGods
