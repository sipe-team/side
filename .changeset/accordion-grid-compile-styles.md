---
"@sipe-team/accordion": patch
"@sipe-team/grid": patch
---

Compile vanilla-extract styles so `./styles.css` resolves. Both packages declared a local `tsup` config without the vanilla-extract plugin, so their `.css.ts` styles were never compiled and the `dist/index.css` referenced by `publishConfig.exports["./styles.css"]` was absent from the published tarball. They now reuse the shared root config like every other component package, and shipped without styles until now.
