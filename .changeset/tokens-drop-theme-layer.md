---
"@sipe-team/tokens": patch
---

Drop the `@layer theme` wrapper from the generated theme CSS so the token variables resolve as plain `:root` declarations. The cascade layer was unused by any consumer, and the wrapper prevented non-vanilla-extract bundlers from preserving the variables. The variable contract is unchanged; theme switching via `[data-theme]` and runtime `assignInlineVars` are unaffected.
