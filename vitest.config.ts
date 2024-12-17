import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    css: true,
    globals: true,
    passWithNoTests: true,
    watch: false,
    coverage: {
      exclude: [
        '.templates/*',
        '.storybook/*',
        'packages/*/src/*.stories.tsx',
        'packages/*/src/*.test.*',
        'packages/*/src/*.d.ts',
        'packages/*/src/*.ts',
        'packages/*/src/*/*.ts',
        
        'packages/*/.storybook/*',
        'packages/*/coverage/*',
        'packages/*/vitest.setup.ts',
        'packages/*/dist/*',

        'packages/*/*.config.ts',
        'packages/*/*.d.ts',
        '*.ts',
      ],
    },
  },
});
