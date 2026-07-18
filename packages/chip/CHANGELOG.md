# @sipe-team/chip

## 0.0.2

### Patch Changes

- 1e7bb22: Normalize `@sipe-team/chip` package.json to match the canonical structure used across other `@sipe-team/*` packages. Adds `publishConfig` with `access`/`registry`/`exports`, moves source `exports` to `./src/index.ts`, adds `type: "module"`, `repository`, `sideEffects: ["**/*.css"]`, and aligns scripts/dependencies. Consumer module resolution now uses the `import`/`require` branches declared under `publishConfig.exports`.
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
- Updated dependencies [1e7bb22]
  - @sipe-team/tokens@1.0.0
