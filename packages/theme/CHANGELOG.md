# @sipe-team/theme

## 1.0.0

### Major Changes

- 1e7bb22: Replace brand-color ThemeProvider with light/dark mode toggle and align design tokens with SSOT.
  - `ThemeProvider` now applies themes via `data-theme` attribute instead of `assignInlineVars`
  - `theme` prop changed from brand-color objects to `'light' | 'dark'` string union
  - `ThemeMode` type is now exported from `@sipe-team/tokens`
  - VE contract structure for `color`, `spacing`, and `radius` reorganized into semantic token hierarchy
  - Token values in `themes.css.ts` now reference Style Dictionary CSS variables instead of hardcoded JS constants
  - Removed `@vanilla-extract/dynamic` dependency from `@sipe-team/theme`

### Patch Changes

- 1e7bb22: Align existing `@sipe-team/*` `package.json` metadata with the canonical shape. Adds `publishConfig.registry` to divider/radio/side/switch, unifies `lint` scripts on `pnpm exec biome lint`, normalizes `workspace:^` → `workspace:*` in avatar/switch/typography, and moves accordion/theme/checkbox direct `react`, `@types/react`, `react-dom`, and `@vanilla-extract/css` specifiers to the pnpm catalog.
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
  - @sipe-team/tokens@1.0.0
