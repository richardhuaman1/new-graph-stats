import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'standard', 'standard-jsx'),
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'space-before-function-paren': 'off',
      'multiline-ternary': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error']
    }
  }
]

export default eslintConfig
