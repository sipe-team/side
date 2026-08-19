# @sipe-team/avatar

## 0.0.2

### Patch Changes

- 0b02738: Fix two rendering bugs.
  - **`onError` loop**: when a broken `src` fell back to `fallback` and that URL also failed, the
    handler reassigned the same URL endlessly. It now clears itself (`onerror = null`) before
    swapping, so a failing fallback stops cleanly.
  - **`asChild` sizing**: the `image` style (`width/height: 100%`) was declared after `size`, so
    when `asChild` merged both onto the same `<img>` the `100%` won and the avatar filled its parent
    instead of keeping its size. `image` is now declared first, so `size` wins the tie.

- 1e7bb22: Align existing `@sipe-team/*` `package.json` metadata with the canonical shape. Adds `publishConfig.registry` to divider/radio/side/switch, unifies `lint` scripts on `pnpm exec biome lint`, normalizes `workspace:^` → `workspace:*` in avatar/switch/typography, and moves accordion/theme/checkbox direct `react`, `@types/react`, `react-dom`, and `@vanilla-extract/css` specifiers to the pnpm catalog.
- Updated dependencies [1e7bb22]
- Updated dependencies [0b02738]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [0b02738]
  - @sipe-team/tokens@1.0.0
  - @sipe-team/typography@0.0.6

## 0.0.2

### Patch Changes

- Updated dependencies [38faf10]
  - @sipe-team/typography@0.0.6

## 0.0.1

### Patch Changes

- 235be5d: fix: add react-dom into peerDependencies
- Updated dependencies [235be5d]
  - @sipe-team/typography@0.0.5
  - @sipe-team/tokens@0.1.0
