import fs from 'fs'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import clear from 'rollup-plugin-clear'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

// plugins
const tsPlugin = ts({ extensions })
const terserPlugin = terser({ format: { comments: false } })

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

const configDir = dir => {
  const dirPath = path.join(__dirname, 'src', dir)
  const dirNames = fs.readdirSync(dirPath)
  console.log('dirname', dirNames)
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

configDir('plugins')
configDir('locale')

export default configs
