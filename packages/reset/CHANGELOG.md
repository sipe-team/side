# @sipe-team/reset

## 0.1.3

### Patch Changes

- 0b02738: Point the `./reset.css` export at the emitted stylesheet. It referenced `./dist/reset.css`, but the build emits `./dist/index.css`, so importing `@sipe-team/reset/reset.css` failed to resolve.
- 1e7bb22: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.

## 0.1.2

### Patch Changes

- 38faf10: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.

## 0.1.1

### Patch Changes

- 235be5d: fix: add react-dom into peerDependencies

## 0.1.0

### Minor Changes

- 63ab3b2: feat(reset): Create base CSS reset package
