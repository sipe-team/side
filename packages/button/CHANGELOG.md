# @sipe-team/button

## 1.0.0

### Major Changes

- 1e7bb22: Redesign Button component based on 5th generation design system
  - **BREAKING**: Rename `ButtonVariant.filled` to `ButtonVariant.fill`
  - **BREAKING**: Expand `ButtonSize` from `sm | lg` to `sm | md | lg | xl`
  - Add `leftIcon` and `rightIcon` props for icon support
  - Apply 5th design colors via `createVar()` (button-scoped CSS variables)
  - Add interaction states: hover (gradient), pressed (`#FE4E07`), disabled (`gray500/600`)
  - Fix disabled CSS specificity bug by moving styles into recipe base selectors
  - Add `theme5th` color token to `@sipe-team/tokens`

### Patch Changes

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

- 1e7bb22: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
  - @sipe-team/tokens@1.0.0
  - @sipe-team/typography@0.0.6

## 0.0.3

### Patch Changes

- 38faf10: Preserve CSS imports in `sideEffects` so consumer bundlers don't tree-shake `./styles.css`.
- Updated dependencies [38faf10]
  - @sipe-team/typography@0.0.6

## 0.0.2

### Patch Changes

- 235be5d: fix: add react-dom into peerDependencies
- Updated dependencies [235be5d]
  - @sipe-team/typography@0.0.5

## 0.0.1

### Patch Changes

- 4c48243: fix(button): handle dynamic styles within typescript
- Updated dependencies [f425309]
- Updated dependencies [f425309]
  - @sipe-team/typography@0.0.4
