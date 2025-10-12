//  @ts-check

import { defineConfig, globalIgnores } from 'eslint/config'
import { tanstackConfig } from '@tanstack/eslint-config'

export default defineConfig([
  globalIgnores(['**/_generated/**', 'eslint.config.js', 'prettier.config.js']),
  ...tanstackConfig,
  {
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
])
