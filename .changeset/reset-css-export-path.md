---
"@sipe-team/reset": patch
---

Point the `./reset.css` export at the emitted stylesheet. It referenced `./dist/reset.css`, but the build emits `./dist/index.css`, so importing `@sipe-team/reset/reset.css` failed to resolve.
