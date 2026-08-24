---
"@sipe-team/tooltip": patch
---

Source Tooltip's internal `id` from `@sipe-team/hooks`'s `useId` instead of calling React's `useId` directly. Behavior is unchanged aside from the generated id now carrying a `side-` prefix.
