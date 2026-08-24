---
"@sipe-team/radio": patch
---

Apply the `radioGroupLegend` style to the `RadioGroup` legend. The style was
defined but never wired to the `<legend>` element, so the group label rendered
with browser-default styling instead of the intended weight, size, spacing, and
token color.
