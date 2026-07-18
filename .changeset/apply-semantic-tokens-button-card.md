---
"@sipe-team/button": patch
"@sipe-team/card": patch
---

Apply new semantic design tokens to Button and Card

- Button: replace hardcoded brand colors and primitive `color.gray*` with `vars.color.accent.*`, `vars.color.foreground.{onAccent,subtle}`, `vars.color.background.muted`, and `vars.color.border.focus`; unify size padding/radius via `vars.spacing.component.*` and `vars.radius.component.*`; add `opacity: 0.9` on fill `:active` for hover/press hierarchy
- Card: replace primitive `color.gray50/100/200` and `color.cyan300` with `vars.color.background.{base,subtle}` and `vars.color.border.{default,strong}`; standardize hardcoded `borderRadius: 12px` / `padding: 20px` to `vars.radius.component.lg` / `vars.spacing.component.lg`; outline border uses `border.strong` to separate divider semantics from the interactive `accent` scale
- Split `border` shorthand into `borderWidth/Style/Color` on both components to work around a vanilla-extract parsing issue when CSS custom properties are used inside the `border` shorthand
