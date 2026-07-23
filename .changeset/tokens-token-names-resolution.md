---
"@sipe-team/tokens": patch
---

Fix `@sipe-team/tokens/token-names` failing to resolve under node16 ESM. The generated barrel declaration re-exported `./primitive` and `./semantic` without runtime extensions, and the types-only semantic layer had no runtime module behind it, so TypeScript could not resolve the sibling declarations. The barrel now emits extension-qualified specifiers and a runtime stub for the semantic layer.
