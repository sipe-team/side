---
"@sipe-team/checkbox": patch
---

Fix two issues.

- **SVG assets**: `Checkbox.css.ts` referenced `url("public/check.svg")` / `url("public/indeterminate.svg")`, which esbuild (tsup) resolved but source-compiling consumers (webpack + `@vanilla-extract/webpack-plugin`, e.g. the Docusaurus docs site) could not, breaking their production build. The icons are now inlined as `data:` URIs so both bundlers render identical marks with no external asset resolution.
- **`checked` + `defaultChecked` warning**: `Root` did not consume `defaultChecked`, so it leaked through context onto the `<input>` alongside the always-set `checked`, triggering React's "input with both checked and defaultChecked" warning. `Root` now destructures `defaultChecked` (it only seeds the uncontrolled initial state), so the input receives just `checked`.
