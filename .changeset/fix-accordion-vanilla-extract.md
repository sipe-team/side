---
'@sipe-team/accordion': patch
---

Fix the missing vanilla-extract build plugin.

`packages/accordion/tsup.config.ts` did not inherit the root tsup config, so the vanilla-extract esbuild plugin never ran for it. This is a residual case of the same defect #291 fixed for `@sipe-team/tokens`.

As a result:

- `Accordion.css.ts` bundled as ordinary TypeScript, so importing `dist` threw at runtime (`Styles were unable to be assigned to a file`).
- `dist/index.css` was never emitted, so the `./styles.css` entrypoint advertised by `publishConfig` pointed at a file that did not exist. Consumers importing `@sipe-team/accordion/styles.css` got `ERR_MODULE_NOT_FOUND`.

**Changes**

- `tsup.config.ts` now inherits the root config (the same pattern as the other 15 packages).

`publishConfig.exports` and `sideEffects` were already declared correctly and are left untouched — they simply start being honoured.
