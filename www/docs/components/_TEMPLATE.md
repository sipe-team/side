---
sidebar_label: ComponentName
---

<!--
  Component documentation template.

  Copy this file to `www/docs/components/<component>.mdx` and fill it in.
  The leading underscore keeps this file out of the generated sidebar; your copy must not have one.

  ── Rules ────────────────────────────────────────────────────────────────────────

  1. THE FIVE CORE SECTIONS ARE FIXED. Keep the five `##` headings below, with these exact
     titles, in this order: Installation, Usage, Examples, Anatomy, API Reference. Do not rename
     or reorder them. Use `###` subsections freely inside a section (e.g. one `###` per example).

  2. OPTIONAL TRAILING SECTIONS. A component may append `## Accessibility` and/or
     `## Known limitations` after API Reference when it has something real to say. Omit them when
     there is nothing worth stating — do not pad the page with empty ceremony.

  3. THE API TABLE IS WRITTEN BY HAND. There is no prop extraction, no generated `docs.json`,
     no `react-docgen-typescript`. Open the component's source and read the prop types.

  4. NEVER DOCUMENT A PROP THAT DOES NOT EXIST. Every row of every table must correspond to a
     real prop in the source. Do not copy rows from another component, and do not infer props
     from what a component "should" have — verify each one. If a part takes no props, say so
     explicitly ("**No props.**") rather than omitting the part or inventing rows for it.

  5. DOCUMENT THE BEHAVIOUR THAT EXISTS, NOT THE BEHAVIOUR YOU EXPECT. If you include an
     Accessibility or Known limitations section, state what the component actually does and
     honestly what it does not — missing props, theme gaps, SSR/hydration defects, accepted bugs.
     Do not claim keyboard support or ARIA wiring that is not implemented.

  ── Examples ─────────────────────────────────────────────────────────────────────

  Render live examples with `<Preview>`. It is registered globally in
  `www/src/theme/MDXComponents.tsx`, so it does not need to be imported — but the component
  you are demonstrating does.

  `children` is rendered live (and server-side, so it lands in the static HTML); `code` is the
  source shown behind the "Show code" toggle. Keep the two in sync by hand.

      import { Thing } from '@sipe-team/thing';

      <Preview code={`<Thing variant="fill">Hello</Thing>`}>
        <Thing variant="fill">Hello</Thing>
      </Preview>

  To use a component on a docs page, add its workspace package to `www/package.json` dependencies
  and import it in the MDX. The `side-vanilla-extract` webpack plugin compiles the package's
  `.css.ts` straight from source, so no dist alias or `customCss` entry is needed. (Only
  `@sipe-team/tokens` is special-cased in `docusaurus.config.ts`, for its Style Dictionary layer.)
-->

# ComponentName

One-sentence description of what the component is for.

## Installation

```sh
npm install @sipe-team/component-name
```

```ts
import '@sipe-team/component-name/styles.css';
```

## Usage

The smallest example that does something real. Render it with `<Preview>`.

## Examples

One `###` subsection per meaningful axis of the API (variants, sizes, controlled vs.
uncontrolled, `asChild`, …). Each one gets a `<Preview>`. Keep the prose to a one-line caption.

## Anatomy

A JSX skeleton showing how the parts nest. For a single-element component, show its typical use
with the props that matter. Note any part that must be rendered inside another.

## API Reference

One `###` subsection per exported part. For each, state what element it renders and whether it
forwards a `ref`, then a hand-written table:

| Prop       | Type        | Default | Description  |
| ---------- | ----------- | ------- | ------------ |
| `children` | `ReactNode` | —       | Required. …  |

Note separately if the part also spreads the intrinsic props of its element
(e.g. "Also accepts every `ComponentProps<'button'>`"). A part with no props gets
"**No props.**" — not an empty table.
