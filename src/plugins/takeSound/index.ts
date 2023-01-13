import { TAKE_SOUND_ELEMENT5 } from './constants'

import zh from './locale/zh'

interface SB extends lunisolar.SB {
  _takeSoundValue: string
  takeSound: string
  takeSoundE5: lunisolar.Lunisolar
}

interface LocaleDataEx extends LocaleData {
  takeSound: string[]
}

interface LunisolarEx extends lunisolar.Lunisolar {
  takeSound: string
}

const takeSoundPlugin: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh, true)
  const lsProto = lsClass.prototype as unknown as LunisolarEx
  // **** 纳音 ****
  const sbProto = lsFactory.SB.prototype as unknown as SB
  // takeSound
  Object.defineProperty(sbProto, 'takeSound', {
    get(): string {
      const locale = lsFactory.getLocale(this._config.lang)
      if (this._takeSoundValue === undefined) {
        this._takeSoundValue = ((this as lunisolar.SB).value >> 1) % 30
      }
      return (locale as LocaleDataEx).takeSound[this._takeSoundValue]
    }
  })
  // takeSoundE5
  Object.defineProperty(sbProto, 'takeSoundE5', {
    get(): lunisolar.Element5 {
      if (this._takeSoundValue === undefined) {
        this._takeSoundValue = ((this as lunisolar.SB).value >> 1) % 30
      }
      return new lsFactory.Element5(TAKE_SOUND_ELEMENT5[this._takeSoundValue], {
        lang: this._config.lang
      })
    }
  })
  // 加到Lunisolar对象中
  Object.defineProperty(lsProto, 'takeSound', {
    get(): string {
      return this.char8.day.takeSound
    }
  })

  lsFactory
}
export default takeSoundPlugin
