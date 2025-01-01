import parser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';

export default [
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      parser,
    },
  },
  { ignores: ['**/dist/'] },
  {
    rules: {
      'no-duplicate-imports': 'error',
    },
  },
] satisfies Linter.Config[];
