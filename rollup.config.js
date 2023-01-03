import fs from 'fs'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
import clear from 'rollup-plugin-clear'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

// plugins
const tsPlugin = ts({ extensions })
const terserPlugin = terser()

// fileName： pkg.module,
const configFactory = config => {
  const { input, fileName, filePath, name, isClear, createEs, copyFile } = config
  // load rollup plugins
  const plugins = [resolve(), commonjs(), tsPlugin, terserPlugin]
  if (isClear) plugins.unshift(clear({ targets: ['dist', 'plugins', 'locale'] }))
  if (copyFile) plugins.push(copy(copyFile))
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
          src: 'typings/locale/**/*',
          dest: 'locale'
        },
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
  for (const dirName of dirNames) {
    const config = configFactory({
      name: dirName,
      input:
        dir === 'locale' ? path.join(dirPath, dirName) : path.join(dirPath, dirName, 'index.ts'),
      filePath: path.join(__dirname, dir),
      fileName: /\.(js|ts)$/.test(dirName) ? dirName.slice(0, -3) : dirName
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
      const config = configFactory({
        name: localeName,
        input: path.join(localePath, localeName),
        filePath: path.join(__dirname, 'plugins', dirName, 'locale'),
        fileName: /\.(js|ts)$/.test(localeName) ? localeName.slice(0, -3) : localeName
      })
      configs.push(config)
    }
  }
}

configDir('plugins')
configDir('locale')
configPluginLocaleDir()

export default configs
