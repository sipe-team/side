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

### Deprecated named exports

`opacity`, `zIndex`, `borderWidth`, `borderStyle`, `shadows`, `breakpoints`, `breakpointQuery`, `responsiveStyle`, `grid` and their associated types are deprecated and will be removed in a future release.
