# Repository Guidelines

## Project Structure & Module Organization

`packages/*` contains the publishable components and utilities. Each package keeps implementation in `src/`, package-level build config in `tsup.config.ts`, and tests/stories next to the component files. `packages/tokens` defines shared design tokens, and `packages/side` aggregates exports. `www/` hosts the Docusaurus docs app, while `docs/` and `www/docs/` store MDX content. Shared static assets live in `public/` and `www/static/`. Use `.templates/component` and `scripts/createComponent.ts` for scaffolding instead of copying folders by hand. Add release notes in `.changeset/` when a published package changes.

## Build, Test, and Development Commands

- `pnpm install`: install the workspace on Node `22`.
- `pnpm create:component`: scaffold a new component package from the template.
- `pnpm dev:storybook`: run Storybook at `http://localhost:6006`.
- `pnpm test`: run the Vitest workspace for `packages/*`.
- `pnpm --filter ./packages/button build`: build one package with `tsup`; swap the path for the package you are editing.
- `pnpm --filter ./www dev`: start the docs site locally.
- `pnpm format` and `pnpm lint`: apply Biome formatting and lint fixes.

## Coding Style & Naming Conventions

Use strict TypeScript and keep public APIs explicit in each package `src/index.ts`. Biome is the source of truth for formatting: spaces for indentation, single quotes, and a `120` character line width. Follow existing naming patterns: package folders in kebab-case, React components in PascalCase, tests as `*.test.tsx`, stories as `*.stories.tsx`, and vanilla-extract styles as `*.css.ts`. Prefer values from `packages/tokens` over hard-coded colors, spacing, or radius values.

## Testing Guidelines

Add or update Vitest coverage for every behavior change. Tests run in `happy-dom` and should live beside the component they verify. Cover accessibility states, variant rendering, and controlled/uncontrolled behavior where applicable. Storybook stories help manual review, but they do not replace tests. For docs changes, run `pnpm --filter ./www build`; for component work, verify the affected story in Storybook.

## Commit & Pull Request Guidelines

Use Conventional Commits such as `feat(chip): add removable variant`. Keep scopes short, subjects in English, and subjects under 50 characters to satisfy `commitlint.config.ts`. PRs should follow `.github/PULL_REQUEST_TEMPLATE.md`: summarize the change, attach visuals for UI updates, and confirm whether specs and tests were added. If the change affects a published package, include a `.changeset` entry and call out release impact in the PR description.
