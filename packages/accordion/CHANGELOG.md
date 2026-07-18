# @sipe-team/accordion

## 0.2.0

### Minor Changes

- 1e7bb22: Add single/multiple open mode support to Accordion component. When `type="single"` is set on `Accordion.Root`, only one item can be open at a time. Also supports controlled mode via `value` and `onValueChange` props.

### Patch Changes

- 1e7bb22: Align existing `@sipe-team/*` `package.json` metadata with the canonical shape. Adds `publishConfig.registry` to divider/radio/side/switch, unifies `lint` scripts on `pnpm exec biome lint`, normalizes `workspace:^` → `workspace:*` in avatar/switch/typography, and moves accordion/theme/checkbox direct `react`, `@types/react`, `react-dom`, and `@vanilla-extract/css` specifiers to the pnpm catalog.
- 1e7bb22: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
  - @sipe-team/tokens@1.0.0

## 0.1.1

### Patch Changes

- 38faf10: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.
