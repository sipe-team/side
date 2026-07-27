# @sipe-team/accordion

## 0.2.0

### Minor Changes

- 1e7bb22: Add single/multiple open mode support to Accordion component. When `type="single"` is set on `Accordion.Root`, only one item can be open at a time. Also supports controlled mode via `value` and `onValueChange` props.

### Patch Changes

- 0b02738: Compile vanilla-extract styles so `./styles.css` resolves. Both packages declared a local `tsup` config without the vanilla-extract plugin, so their `.css.ts` styles were never compiled and the `dist/index.css` referenced by `publishConfig.exports["./styles.css"]` was absent from the published tarball. They now reuse the shared root config like every other component package, and shipped without styles until now.
- 1e7bb22: Align existing `@sipe-team/*` `package.json` metadata with the canonical shape. Adds `publishConfig.registry` to divider/radio/side/switch, unifies `lint` scripts on `pnpm exec biome lint`, normalizes `workspace:^` → `workspace:*` in avatar/switch/typography, and moves accordion/theme/checkbox direct `react`, `@types/react`, `react-dom`, and `@vanilla-extract/css` specifiers to the pnpm catalog.
- 1e7bb22: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.
- Updated dependencies [1e7bb22]
- Updated dependencies [0b02738]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [0b02738]
  - @sipe-team/tokens@1.0.0

## 0.1.1

### Patch Changes

- 38faf10: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.
