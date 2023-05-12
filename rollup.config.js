import fs from 'fs'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
import clear from 'rollup-plugin-clear'
import pkg from './package.json'
import dts from 'rollup-plugin-dts'
import filesize from 'rollup-plugin-filesize'

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const upCaseFirst = str => (str[0] ? str[0].toUpperCase() + str.slice(1) : '')
const formatName = n => {
  return n
    .trim()
    .replace(/\.(js|ts)$/, '')
    .split('-')
    .map((v, i) => (i === 0 ? v.trim() : upCaseFirst(v.trim())))
    .join('')
}

// plugins
const tsPlugin = ts({ extensions })
const terserPlugin = terser()
const dtsPlugin = dts()

// fileName： pkg.module,
const configFactory = config => {
  const { input, fileName, filePath, name, isClear, createEs, copyFile, pluginsPush } = config
  // load rollup plugins
  const plugins = [resolve(), commonjs(), tsPlugin, terserPlugin, filesize()]
  if (isClear) plugins.unshift(clear({ targets: ['dist', 'plugins', 'locale', 'markers'] }))
  if (copyFile) plugins.push(copy(copyFile))
  if (pluginsPush) {
    plugins.push(...pluginsPush)
  }
  // output
  const output = [
    {
      // UMD for browser-friendly build
      name: name || 'lunisolar',
      file: filePath && fileName ? path.join(filePath, `${fileName}.js`) : pkg.main,
      format: 'umd'
    }
  ]
  if (createEs) {
    output.push({
      // ES module for bundlers build
      file: fileName ? path.join(filePath, `${fileName}.esm.js`) : pkg.module,
      format: 'es'
    })
  }

  return {
    input,
    output,
    plugins
  }
}

const configs = [
  configFactory({
    input: 'src/index.ts',
    isClear: true,
    createEs: true
  })
]

// 对指定dir打包的配置
const configDir = (dir, config) => {
  const dirPath = path.join(__dirname, 'src', dir)
  const dirNames = fs.readdirSync(dirPath)
  const namePrefix = config?.namePrefix ?? null
  const inputName = config?.inputName ?? ''
  const useDts = config?.useDts ?? false
  for (const dirName of dirNames) {
    const fixDirName = namePrefix ? namePrefix + upCaseFirst(dirName) : dirName
    const input = path.join(dirPath, dirName, inputName)
    const filePath = path.join(__dirname, dir)
    const fileName = dirName.replace(/\.(js|ts)$/, '')
    const config = configFactory({
      name: formatName(fixDirName),
      input,
      filePath,
      fileName
    })
    configs.push(config)
    if (useDts) {
      configs.push({
        input,
        output: {
          file: path.join(filePath, `${fileName}.d.ts`),
          format: 'es'
        },
        plugins: [dtsPlugin]
      })
    }
  }
}

configDir('plugins', { namePrefix: 'lunisolarPlugin', inputName: 'index.ts' })
configDir('locale', { namePrefix: 'lunisolarLocale' })
configDir('markers', { namePrefix: 'lunisolarMarkers', useDts: true })

export default configs
