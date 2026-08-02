---
"@sipe-team/accordion": patch
---

Fix Accordion accessibility: link Trigger and Content via generated `id`/`aria-controls`/`aria-labelledby` (now sourced from `@sipe-team/hooks`'s `useId`) so assistive tech can associate each panel with its trigger, expose each panel as an `aria-labelledby`-named `<section>` (implicit `role="region"`), and mark closed panels `inert` so their focusable descendants are removed from the tab order and accessibility tree instead of merely being visually clipped. The generated `id`/`aria-controls` on Trigger now always take precedence over any `id`/`aria-controls` passed via props, since they are managed internally to keep Trigger and Content in sync.
