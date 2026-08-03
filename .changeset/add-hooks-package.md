---
"@sipe-team/hooks": minor
---

Add `@sipe-team/hooks`, a shared package for cross-component React hooks. Starts with `useId()`, a thin wrapper around React's `useId()` that prefixes generated ids with `side-` for consistent, brand-namespaced DOM ids across Sipe Design System components. Accepts an optional `deterministicId` argument that passes through as-is, matching the `useId(props.id)` pattern already used ad hoc in components like Checkbox.
