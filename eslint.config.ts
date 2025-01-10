import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

// @ts-ignore
import hooksPlugin from 'eslint-plugin-react-hooks';

// ? https://typescript-eslint.io/getting-started#step-2-configuration
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'no-duplicate-imports': 'off',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  ...(storybook.configs['flat/recommended'] as any),
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
  },

  // ignore files
  {
    ignores: ['**/*/dist/', '**/node_modules/', '*.config.*'],
  },
);
