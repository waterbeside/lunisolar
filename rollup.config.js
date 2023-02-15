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
  const plugins = [resolve(), commonjs(), tsPlugin, terserPlugin]
  if (isClear) plugins.unshift(clear({ targets: ['dist', 'plugins', 'locale'] }))
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
    createEs: true,
    copyFile: {
      targets: [
        {
          src: 'typings/plugins/**/*',
          dest: 'plugins'
        }
      ]
    }
  })
]

// 对指定dir打包的配置
const configDir = dir => {
  const dirPath = path.join(__dirname, 'src', dir)
  const dirNames = fs.readdirSync(dirPath)
  const namePrefix = dir === 'plugins' ? 'lunisolarPlugin' : null
  for (const dirName of dirNames) {
    const fixDirName = namePrefix ? namePrefix + upCaseFirst(dirName) : dirName
    const config = configFactory({
      name:
        dir === 'locale'
          ? `lunisolarLocale${upCaseFirst(formatName(dirName))}`
          : formatName(fixDirName),
      input:
        dir === 'locale' ? path.join(dirPath, dirName) : path.join(dirPath, dirName, 'index.ts'),
      filePath: path.join(__dirname, dir),
      fileName: dirName.replace(/\.(js|ts)$/, '')
    })
    configs.push(config)
  }
}

// 对插件语言包进行打包的配置
const configPluginLocaleDir = () => {
  const dirPath = path.join(__dirname, 'src', 'plugins')
  const dirNames = fs.readdirSync(dirPath)
  for (const dirName of dirNames) {
    const localePath = path.join(dirPath, dirName, 'locale')
    const localeNames = fs.readdirSync(localePath)
    for (const localeName of localeNames) {
      const filePath = path.join(__dirname, 'plugins', dirName, 'locale')
      const fileName = localeName.replace(/\.(js|ts)$/, '')
      const config = configFactory({
        name: dirName + '_' + formatName(localeName),
        input: path.join(localePath, localeName),
        filePath,
        fileName
      })
      configs.push(config)
      configs.push({
        input: path.join(localePath, localeName),
        output: {
          file: path.join(filePath, `${fileName}.d.ts`),
          format: 'es'
        },
        plugins: [dtsPlugin]
      })
    }
  }
}

configDir('plugins')
configDir('locale')
configPluginLocaleDir()

export default configs
