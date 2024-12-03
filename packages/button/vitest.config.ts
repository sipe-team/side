import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['./src/**/*.{ts,tsx}'],
      exclude: ['./src/**/*.stories.tsx', './src/env.d.ts', './src/index.ts'],
    },
    css: true,
    environment: 'happy-dom',
    globals: true,
    passWithNoTests: true,
    setupFiles: './vitest.setup.ts',
    watch: false,
  },
});
