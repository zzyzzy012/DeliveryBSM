import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // 自定义规则
    /*
    * "off" 或 0    ==>  关闭规则
    * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
    * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
    */
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      'no-console': 'off', // 禁止使用console
      'no-unused-vars': 'off', // 禁止定义未使用的变量
      'no-debugger': 'error', // 禁止使用debugger
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
])
