---
"@sipe-team/theme": major
"@sipe-team/tokens": minor
---

Replace brand-color ThemeProvider with light/dark mode toggle and align design tokens with SSOT.

- `ThemeProvider` now applies themes via `data-theme` attribute instead of `assignInlineVars`
- `theme` prop changed from brand-color objects to `'light' | 'dark'` string union
- `ThemeMode` type is now exported from `@sipe-team/tokens`
- VE contract structure for `color`, `spacing`, and `radius` reorganized into semantic token hierarchy
- Token values in `themes.css.ts` now reference Style Dictionary CSS variables instead of hardcoded JS constants
- Removed `@vanilla-extract/dynamic` dependency from `@sipe-team/theme`
