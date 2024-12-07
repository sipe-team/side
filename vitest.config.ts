import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    css: true,
    globals: true,
    passWithNoTests: true,
    watch: false,
  },
});
