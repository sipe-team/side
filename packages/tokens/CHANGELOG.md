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

- 0b02738: 토큰 CSS 체인을 복구하고 `./styles.css` 진입점을 추가합니다.

  `packages/tokens/tsup.config.ts`가 21개 패키지 중 유일하게 루트 tsup 설정을 상속하지 않아 vanilla-extract esbuild 플러그인이 누락돼 있었습니다. 그 결과:
  - `contract.css.ts`가 일반 TS로 번들되어 **`dist`를 import하면 런타임 예외**가 발생했습니다 (`Styles were unable to be assigned to a file`). `@sipe-team/tokens`를 re-export하는 `@sipe-team/side`도 함께 영향받았습니다.
  - `createGlobalTheme` 호출이 `sideEffects: false`로 트리셰이킹되어 `--side-*` 브릿지 CSS가 방출되지 않았습니다.
  - 소비자가 토큰 CSS를 가져갈 진입점이 없어, `vars.*`를 쓰는 컴포넌트(Button)의 padding·radius·font-size·font-family·gap이 전부 무효화됐습니다.

  **변경 사항**
  - `tsup.config.ts`가 루트 설정을 상속합니다 (다른 20개 패키지와 동일한 패턴).
  - `sideEffects`를 `["**/*.css"]`로 변경해 소비자의 CSS import가 번들러에 제거되지 않게 합니다.
  - `./styles.css` 진입점을 추가합니다. Style Dictionary 값층(`--color-*`, `--spacing-*`)과 vanilla-extract 브릿지(`--side-*`)를 **한 파일로** 제공합니다 — 둘 중 하나만 로드하면 체인이 조용히 끊기기 때문입니다.

  **소비자 액션 필요:** 개별 패키지를 사용한다면 `import '@sipe-team/tokens/styles.css'`를 추가해야 컴포넌트 스타일이 적용됩니다.

- 1e7bb22: Replace brand-color ThemeProvider with light/dark mode toggle and align design tokens with SSOT.
  - `ThemeProvider` now applies themes via `data-theme` attribute instead of `assignInlineVars`
  - `theme` prop changed from brand-color objects to `'light' | 'dark'` string union
  - `ThemeMode` type is now exported from `@sipe-team/tokens`
  - VE contract structure for `color`, `spacing`, and `radius` reorganized into semantic token hierarchy
  - Token values in `themes.css.ts` now reference Style Dictionary CSS variables instead of hardcoded JS constants
  - Removed `@vanilla-extract/dynamic` dependency from `@sipe-team/theme`

### Patch Changes

- 0b02738: Fix `@sipe-team/tokens/token-names` failing to resolve under node16 ESM. The generated barrel declaration re-exported `./primitive` and `./semantic` without runtime extensions, and the types-only semantic layer had no runtime module behind it, so TypeScript could not resolve the sibling declarations. The barrel now emits extension-qualified specifiers and a runtime stub for the semantic layer.

## 0.1.0

### Minor Changes

- 9c93399: feat(tokens): add tokens package
  fix(typography): reuse `@sipe-team/tokens`
