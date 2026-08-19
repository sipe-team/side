# @sipe-team/checkbox

## 0.0.2

### Patch Changes

- 0b02738: Fix two issues.
  - **SVG assets**: `Checkbox.css.ts` referenced `url("public/check.svg")` / `url("public/indeterminate.svg")`, which esbuild (tsup) resolved but source-compiling consumers (webpack + `@vanilla-extract/webpack-plugin`, e.g. the Docusaurus docs site) could not, breaking their production build. The icons are now inlined as `data:` URIs so both bundlers render identical marks with no external asset resolution.
  - **`checked` + `defaultChecked` warning**: `Root` did not consume `defaultChecked`, so it leaked through context onto the `<input>` alongside the always-set `checked`, triggering React's "input with both checked and defaultChecked" warning. `Root` now destructures `defaultChecked` (it only seeds the uncontrolled initial state), so the input receives just `checked`.

- 1e7bb22: Align existing `@sipe-team/*` `package.json` metadata with the canonical shape. Adds `publishConfig.registry` to divider/radio/side/switch, unifies `lint` scripts on `pnpm exec biome lint`, normalizes `workspace:^` → `workspace:*` in avatar/switch/typography, and moves accordion/theme/checkbox direct `react`, `@types/react`, `react-dom`, and `@vanilla-extract/css` specifiers to the pnpm catalog.
- 1e7bb22: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.
- Updated dependencies [1e7bb22]
- Updated dependencies [0b02738]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [0b02738]
  - @sipe-team/tokens@1.0.0

## 0.0.2

### Patch Changes

- 38faf10: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.

## 0.0.1

### Patch Changes

- 235be5d: fix: add react-dom into peerDependencies
