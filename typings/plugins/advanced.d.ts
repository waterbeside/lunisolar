import { PluginFunc } from 'lunisolar'

declare module 'lunisolar' {
  interface Lunisolar {
    tireGod: string
    tireGodData: TireGodData
  }
}

declare const plugin: PluginFunc
export = plugin
