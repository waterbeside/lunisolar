import zh from './locale/zh'

const sx: lunisolar.PluginFunc = async (options, lsClass, lsFactory) => {
  lsFactory.locale(zh, true)
}
export default sx
