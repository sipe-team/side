import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    css: true,
    environment: 'happy-dom',
    globals: true,
    passWithNoTests: true,
    watch: false,
    coverage: {
      include: ['**/src'],
      exclude: ['.templates', '**/src/*.stories.tsx', '**/src/index.ts', 'www/**'],
    },
  },
});
