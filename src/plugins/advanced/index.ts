import fetalGodPlugin from '../fetalGod'
import takeSound from '../takeSound'

const advanced: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  fetalGodPlugin(options, lsClass, lsFactory)
  takeSound(options, lsClass, lsFactory)
}
export default advanced
