# @sipe-team/grid

## 0.1.2

### Patch Changes

- 0b02738: Compile vanilla-extract styles so `./styles.css` resolves. Both packages declared a local `tsup` config without the vanilla-extract plugin, so their `.css.ts` styles were never compiled and the `dist/index.css` referenced by `publishConfig.exports["./styles.css"]` was absent from the published tarball. They now reuse the shared root config like every other component package, and shipped without styles until now.
- 1e7bb22: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.

## 0.1.2

### Patch Changes

- 38faf10: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.

## 0.1.1

### Patch Changes

- 235be5d: fix: add react-dom into peerDependencies

## 0.1.0

### Minor Changes

- 08121f0: feat(grid): create grid component
