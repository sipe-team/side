---
to: <%= path %>/vitest.config.ts
---
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    passWithNoTests: true,
    setupFiles: './vitest.setup.ts',
    watch: false,
    css: true,
  },
});
