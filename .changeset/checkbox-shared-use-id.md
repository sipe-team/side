---
"@sipe-team/checkbox": patch
---

Source Checkbox's internal `id` from `@sipe-team/hooks`'s `useId` instead of calling React's `useId` directly. The `props.id ?? internalId` fallback pattern is now handled by `useId`'s `deterministicId` argument. Behavior is unchanged aside from the generated id now carrying a `side-` prefix when no `id` prop is passed.
