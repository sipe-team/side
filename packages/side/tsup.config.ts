import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  noExternal: [/@sipe-team\//],
  esbuildPlugins: [vanillaExtractPlugin()],
});
