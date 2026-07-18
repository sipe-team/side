---
"@sipe-team/accordion": patch
"@sipe-team/avatar": patch
"@sipe-team/checkbox": patch
"@sipe-team/divider": patch
"@sipe-team/radio": patch
"@sipe-team/side": patch
"@sipe-team/switch": patch
"@sipe-team/theme": patch
"@sipe-team/typography": patch
---

Align existing `@sipe-team/*` `package.json` metadata with the canonical shape. Adds `publishConfig.registry` to divider/radio/side/switch, unifies `lint` scripts on `pnpm exec biome lint`, normalizes `workspace:^` → `workspace:*` in avatar/switch/typography, and moves accordion/theme/checkbox direct `react`, `@types/react`, `react-dom`, and `@vanilla-extract/css` specifiers to the pnpm catalog.
