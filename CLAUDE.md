# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Side (Sipe Design System)** — a pnpm monorepo of React component packages published to GitHub Package Registry under `@sipe-team/*`.

## Commands

```bash
pnpm install                        # Install dependencies (pnpm 9.7.1, Node v22)
pnpm dev:storybook                  # Run Storybook dev server on :6006
pnpm build:storybook                # Build Storybook
pnpm lint                           # Biome lint + fix (changed packages)
pnpm format                         # Biome format
pnpm test                           # Vitest (changed packages)
pnpm create:component               # Scaffold new component from template
pnpm cz                             # Interactive conventional commit

# Per-package
pnpm --filter @sipe-team/button test
pnpm --filter @sipe-team/button build
pnpm --filter @sipe-team/button typecheck

# Run a single test file
pnpm --filter @sipe-team/button vitest run src/Button.test.tsx
```

## Architecture

- **`packages/*`** — Individual component packages (button, input, card, chip, skeleton, etc.)
- **`packages/tokens`** — Design tokens (colors, spacing, typography, radius, shadows, z-index) exported as vanilla-extract contract vars
- **`packages/theme`** — ThemeProvider using vanilla-extract `assignInlineVars` for runtime theme switching (4 themes, light mode default)
- **`packages/typography`** — Typography component system
- **`www/`** — Docusaurus documentation site

## Component Pattern

Every component follows this structure:

1. **`Component.tsx`** — `forwardRef` wrapper, extends `ComponentProps<'element'>`, defines variant enums as `const` objects with matching types, supports `asChild` via Radix `Slot`
2. **`Component.css.ts`** — Vanilla Extract `recipe()` with variant maps keyed by the enum values, uses `vars` from `@sipe-team/tokens`
3. **`Component.stories.tsx`** — Storybook using `Meta`/`StoryObj` types
4. **`Component.test.tsx`** — Vitest + `@testing-library/react` (happy-dom environment)
5. **`index.ts`** — Re-exports

Variant enum pattern (value object + type union):
```ts
export const ButtonSize = { sm: 'sm', lg: 'lg' } as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
```

Class composition: `clsx(styles.recipe({ variant, size }), conditionalStyles, className)`

## Styling Rules

- All styles use **vanilla-extract** with `recipe()` for variants
- Always import design tokens via `import { vars } from '@sipe-team/tokens'` — never hardcode colors, spacing, or typography values
- Each package exports `./styles.css` for consumers

## Linting & Formatting

- **Biome** (not ESLint/Prettier) — single quotes, spaces, 120 char line width
- Import order enforced: node → react → @sipe-team/* → @vanilla-extract/* → @radix-ui/* → external packages → relative paths (with blank lines between groups)
- Pre-commit hook runs `biome check --write --unsafe` via lint-staged

## Commit Conventions

Format: `type(scope): subject` — English only, subject max 50 chars, scope max 20 chars.
Types: feat, fix, hotfix, chore, refactor, release, test, docs, ci, build.

## Branch Naming

`<CATEGORY>/<ISSUENUMBER>-<SUBJECT>` (issue number optional)

## Publishing

Changesets-based releases to GitHub Package Registry. Packages export ESM + CJS with types. Include a `.changeset` file for any public API changes.
