---
"@sipe-team/button": patch
---

Apply new semantic design tokens to Button

- Replace hardcoded brand colors (`#FF7C27`, gradient, `#FE4E07`, `#000`) with `vars.color.accent.{default,hover,subtle}` and `vars.color.foreground.onAccent`
- Replace primitive `color.gray500/600` used for disabled state with `vars.color.background.muted` and `vars.color.foreground.subtle` (`foreground.muted` is reserved for non-readable text per token spec)
- Use `vars.color.border.focus` for the focus-visible outline color
- Unify size padding/radius via `vars.spacing.component.*` and `vars.radius.component.md|lg`
- Add `opacity: 0.9` to fill `:active` for hover/press visual hierarchy
- Split the `border` shorthand into `borderWidth/Style/Color` to work around a vanilla-extract parsing issue with CSS custom properties in the `border` shorthand
