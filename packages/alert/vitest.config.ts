import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    css: true,
    environment: 'happy-dom',
    globals: true,
    passWithNoTests: true,
    setupFiles: './vitest.setup.ts',
    watch: false,
  },
});
