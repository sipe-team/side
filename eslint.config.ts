import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

// ? https://typescript-eslint.io/getting-started#step-2-configuration
export default tseslint.config(
  // * Base ESLint recommended configuration
  eslint.configs.recommended,
  // * TypeScript ESLint recommended configuration
  tseslint.configs.recommended,
  // * Custom rules configuration
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-duplicate-imports': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTernary: true,
        },
      ],
    },
  },

  // * React plugin configuration
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  // * React Hooks plugin configuration
  ...compat.extends('plugin:react-hooks/recommended'),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  },

  // * Storybook plugin configuration
  ...compat.extends('plugin:storybook/recommended'),
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {},
  },

  // Ignore files configuration
  {
    ignores: ['**/*/dist/', '**/node_modules/', '*.config.*'],
  },
);
