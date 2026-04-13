import { defineConfig } from 'tsup';

import defaultConfig from '../../tsup.config';

export default defineConfig({
  ...defaultConfig,
  external: ['react', '@radix-ui/react-slot', 'clsx'],
});
