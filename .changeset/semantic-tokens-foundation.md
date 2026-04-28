---
"@sipe-team/tokens": major
"@sipe-team/button": patch
---

redesign token contract structure with semantic color, spacing, and radius hierarchy

## Breaking Changes

### `vars` path changes

| Token | Before | After |
|-------|--------|-------|
| color | `vars.color.primary` `vars.color.background` `vars.color.text` | `vars.color.accent.{default\|hover\|subtle}` `vars.color.background.{base\|subtle\|muted}` `vars.color.foreground.{default\|subtle\|muted\|onAccent}` `vars.color.border.{default\|strong\|focus}` `vars.color.status.{success\|warning\|danger\|info}.{foreground\|background\|border}` |
| spacing | `vars.spacing.{xs\|sm\|md\|lg\|xl}` | `vars.spacing.component.{xs\|sm\|md\|lg\|xl}` `vars.spacing.layout.{sm\|md\|lg\|xl}` |
| radius | `vars.radius.{none\|sm\|md\|lg\|xl\|full}` | `vars.radius.component.{sm\|md\|lg\|xl\|full}` `vars.radius.layout.{sm\|md\|lg}` |

`vars.color.gradient` and `vars.color.secondary` have been removed.

### `defaultTheme` export removed

`defaultTheme` is no longer exported from `@sipe-team/tokens`. Theme variables are now applied automatically via `createGlobalTheme` on `:root`. Remove any explicit `defaultTheme` import or usage.

### Default color mode changed to dark

The `:root` theme now defaults to `mode: 'dark'` (previously `mode: 'light'`). If your app relied on the light-mode defaults from `:root`, you will need to apply a `[data-theme]` attribute or supply your own light-mode overrides.

### Deprecated named exports

`opacity`, `zIndex`, `borderWidth`, `borderStyle`, `shadows`, `breakpoints`, `breakpointQuery`, `responsiveStyle`, `grid` and their associated types are deprecated and will be removed in a future release.
