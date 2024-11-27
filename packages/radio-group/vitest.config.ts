import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    passWithNoTests: true,
    watch: false,
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
