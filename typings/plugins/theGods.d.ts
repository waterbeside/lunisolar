import { PluginFunc } from 'lunisolar'

declare module 'lunisolar' {
  interface Lunisolar {
    duty12God: string
  }
}

declare const plugin: PluginFunc
export = plugin
