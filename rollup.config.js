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
  if (isClear) plugins.unshift(clear({ targets: ['dist', 'plugins'] }))
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
        // {
        //   src: path.join(__dirname, 'typings', 'plugins', '*.d.ts'),
        //   dest: path.join(__dirname, 'plugins', '*.d.ts')
        // }
        {
          src: 'typings/plugins/**/*',
          dest: 'plugins'
        }
      ]
    }
  })
]

const configPlugins = () => {
  const pluginPath = path.join(__dirname, 'src', 'plugins')
  const pluginNames = fs.readdirSync(pluginPath)
  for (const pName of pluginNames) {
    configs.push(
      configFactory({
        name: pName,
        input: path.join(pluginPath, pName, 'index.ts'),
        filePath: path.join(__dirname, 'plugins'),
        fileName: pName
      })
    )
  }
}

configPlugins()

export default configs
