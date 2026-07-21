---
'@sipe-team/avatar': patch
---

Fix two rendering bugs.

- **`onError` loop**: when a broken `src` fell back to `fallback` and that URL also failed, the
  handler reassigned the same URL endlessly. It now clears itself (`onerror = null`) before
  swapping, so a failing fallback stops cleanly.
- **`asChild` sizing**: the `image` style (`width/height: 100%`) was declared after `size`, so
  when `asChild` merged both onto the same `<img>` the `100%` won and the avatar filled its parent
  instead of keeping its size. `image` is now declared first, so `size` wins the tie.
