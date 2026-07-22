---
"@sipe-team/input": patch
---

Apply semantic design tokens and field API updates to Input

- Replace local color/spacing/typography with semantic `vars`
- Fix `fontWeight` to regular (prop removed pending design review)
- Move field chrome (border/focus) onto the `input` element; use `span` wrapper
- Add `validation` prop for border-only `error` / `success` states (FormField-ready)
