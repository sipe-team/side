import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  esbuildPlugins: [vanillaExtractPlugin()],
  format: ['esm', 'cjs'],
});
