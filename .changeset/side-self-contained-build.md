---
"@sipe-team/side": patch
---

Build a self-contained dist by bundling the workspace components and compiling their vanilla-extract styles, so the umbrella package can be consumed by non-vanilla-extract bundlers. A precompiled `dist/index.css` is emitted alongside the JS bundle.
