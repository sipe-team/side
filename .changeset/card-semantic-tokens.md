---
"@sipe-team/card": patch
---

Apply new semantic design tokens to Card

- Replace primitive `color.gray50/100/200` and `color.cyan300` with `vars.color.background.{base,subtle}` and `vars.color.border.{default,strong}`
- outline variant border uses `border.strong` instead of `accent.default` to separate divider semantics from the interactive `accent` scale
- Standardize hardcoded `borderRadius: 12px` and `padding: 20px` to `vars.radius.component.lg` and `vars.spacing.component.lg` per token spec ("카드 모서리" / "카드 내부 패딩")
- Split the `border` shorthand into `borderWidth/Style/Color` to work around a vanilla-extract parsing issue with CSS custom properties in the `border` shorthand
