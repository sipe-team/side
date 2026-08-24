---
"@sipe-team/chip": patch
---

Normalize `@sipe-team/chip` package.json to match the canonical structure used across other `@sipe-team/*` packages. Adds `publishConfig` with `access`/`registry`/`exports`, moves source `exports` to `./src/index.ts`, adds `type: "module"`, `repository`, `sideEffects: ["**/*.css"]`, and aligns scripts/dependencies. Consumer module resolution now uses the `import`/`require` branches declared under `publishConfig.exports`.
