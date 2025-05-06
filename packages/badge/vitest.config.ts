import { defineProject, mergeConfig } from 'vitest/config';
import defaultConfig from '../../vitest.config';

export default mergeConfig(
  defaultConfig,
  defineProject({
    test: {
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }, { browser: 'webkit' }],
      },
    },
  }),
);
