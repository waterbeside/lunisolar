import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

// plugins
const tsPlugin = ts({ extensions })
const terserPlugin = terser({ format: { comments: false } })

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        // UMD for browser-friendly build
        name: 'lunisolar',
        file: pkg.browser,
        format: 'umd'
      },
      {
        // ES module for bundlers build
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [clear({ targets: ['dist'] }), resolve(), commonjs(), tsPlugin, terserPlugin]
  }
]
