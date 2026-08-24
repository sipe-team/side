---
"@sipe-team/button": major
"@sipe-team/tokens": minor
---

Redesign Button component based on 5th generation design system

- **BREAKING**: Rename `ButtonVariant.filled` to `ButtonVariant.fill`
- **BREAKING**: Expand `ButtonSize` from `sm | lg` to `sm | md | lg | xl`
- Add `leftIcon` and `rightIcon` props for icon support
- Apply 5th design colors via `createVar()` (button-scoped CSS variables)
- Add interaction states: hover (gradient), pressed (`#FE4E07`), disabled (`gray500/600`)
- Fix disabled CSS specificity bug by moving styles into recipe base selectors
- Add `theme5th` color token to `@sipe-team/tokens`
