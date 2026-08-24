---
"@sipe-team/radio": patch
---

Source Radio's and RadioGroup's internal `id`/`name` fallback from `@sipe-team/hooks`'s `useId` instead of calling React's `useId` directly. Behavior is unchanged aside from the generated id now carrying a `side-` prefix.
