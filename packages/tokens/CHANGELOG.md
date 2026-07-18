# @sipe-team/tokens

## 1.0.0

### Major Changes

- 1e7bb22: redesign token contract structure with semantic color, spacing, and radius hierarchy

  ## Breaking Changes

  ### `vars` path changes

  | Token   | Before                                                         | After                                                                                                                                                                                                                                                                                    |
  | ------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | color   | `vars.color.primary` `vars.color.background` `vars.color.text` | `vars.color.accent.{default\|hover\|subtle}` `vars.color.background.{base\|subtle\|muted}` `vars.color.foreground.{default\|subtle\|muted\|onAccent}` `vars.color.border.{default\|strong\|focus}` `vars.color.status.{success\|warning\|danger\|info}.{foreground\|background\|border}` |
  | spacing | `vars.spacing.{xs\|sm\|md\|lg\|xl}`                            | `vars.spacing.component.{xs\|sm\|md\|lg\|xl}` `vars.spacing.layout.{sm\|md\|lg\|xl}`                                                                                                                                                                                                     |
  | radius  | `vars.radius.{none\|sm\|md\|lg\|xl\|full}`                     | `vars.radius.component.{sm\|md\|lg\|xl\|full}` `vars.radius.layout.{sm\|md\|lg}`                                                                                                                                                                                                         |

  `vars.color.gradient` and `vars.color.secondary` have been removed.

  ### `defaultTheme` export removed

  `defaultTheme` is no longer exported from `@sipe-team/tokens`. Theme variables are now applied automatically via `createGlobalTheme` on `:root`. Remove any explicit `defaultTheme` import or usage.

  ### Default color mode changed to dark

  The `:root` theme now defaults to `mode: 'dark'` (previously `mode: 'light'`). If your app relied on the light-mode defaults from `:root`, you will need to apply a `[data-theme]` attribute or supply your own light-mode overrides.

  ### Deprecated named exports

  `opacity`, `zIndex`, `borderWidth`, `borderStyle`, `shadows`, `breakpoints`, `breakpointQuery`, `responsiveStyle`, `grid` and their associated types are deprecated and will be removed in a future release.

### Minor Changes

- 1e7bb22: Redesign Button component based on 5th generation design system
  - **BREAKING**: Rename `ButtonVariant.filled` to `ButtonVariant.fill`
  - **BREAKING**: Expand `ButtonSize` from `sm | lg` to `sm | md | lg | xl`
  - Add `leftIcon` and `rightIcon` props for icon support
  - Apply 5th design colors via `createVar()` (button-scoped CSS variables)
  - Add interaction states: hover (gradient), pressed (`#FE4E07`), disabled (`gray500/600`)
  - Fix disabled CSS specificity bug by moving styles into recipe base selectors
  - Add `theme5th` color token to `@sipe-team/tokens`

- 1e7bb22: Replace brand-color ThemeProvider with light/dark mode toggle and align design tokens with SSOT.
  - `ThemeProvider` now applies themes via `data-theme` attribute instead of `assignInlineVars`
  - `theme` prop changed from brand-color objects to `'light' | 'dark'` string union
  - `ThemeMode` type is now exported from `@sipe-team/tokens`
  - VE contract structure for `color`, `spacing`, and `radius` reorganized into semantic token hierarchy
  - Token values in `themes.css.ts` now reference Style Dictionary CSS variables instead of hardcoded JS constants
  - Removed `@vanilla-extract/dynamic` dependency from `@sipe-team/theme`

## 0.1.0

### Minor Changes

- 9c93399: feat(tokens): add tokens package
  fix(typography): reuse `@sipe-team/tokens`
