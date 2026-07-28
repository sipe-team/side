---
"@sipe-team/tooltip": patch
---

Fix two bugs.

- **SSR crash**: `createPortal` ran into `document.body` whenever `isVisible` was true, even on
  the server, where `document` doesn't exist. The portal is now deferred behind a `mounted` flag,
  so it only renders after the client mounts.
- **Broken `ref` when `tooltipContent` is falsy**: the early `return <>{children}</>` skipped the
  `wrapperRef` wiring entirely, leaving the forwarded `ref` permanently `null`. The trigger now
  always renders through the normal `ref` path; only the tooltip markup is skipped when there's no
  content.
