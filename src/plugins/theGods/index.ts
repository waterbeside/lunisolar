import zh from './locale/zh'

export interface LunisolarEx extends lunisolar.Lunisolar {
  duty12God: string
}

const dayGods: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh)
  const lsProto = lsClass.prototype as unknown as LunisolarEx

  // **** 建除十二神 ****
  Object.defineProperty(lsProto, 'duty12God', {
    get(): string {
      const locale = this.getLocale() as typeof zh
      const char8 = this.char8 as lunisolar.Char8
      const godIdx = (char8.day.branch.value + 12 - char8.month.branch.value) % 12
      console.log('m', char8.month.branch.value)
      console.log('d', char8.day.branch.value)
      console.log('godIdx', godIdx)
      return locale.duty12God[godIdx]
    }
  })
}
export default dayGods
