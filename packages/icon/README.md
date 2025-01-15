# @sipe-team/icon

React icon components for Sipe Design System.

## Installation

```bash
pnpm add @sipe-team/icon
```

## Usage

```tsx
import { ArrowRightIcon } from '@sipe-team/icon';

function Example() {
  return (
    <ArrowRightIcon
      size={24} // optional, default: 24
      color="blue" // optional, inherits from SVG's original color
    />
  );
}
```

## Features

- Optimized SVG icons as React components
- TypeScript support
- Customizable size and color
- Preserved original icon colors when no color prop is provided
- Tree-shakeable exports

## Development

### Icon Naming Convention

- Use kebab-case for SVG files: `arrow-right.svg`, `chevron-down.svg`
- Files will be automatically converted to PascalCase components with 'Icon' suffix:

  - `arrow-right.svg` → `ArrowRightIcon`
  - `chevron-down.svg` → `ChevronDownIcon`

### Adding new icons

1. Add SVG file to `icons` directory
2. Run generation script:
```bash
pnpm generate-icons
```

### Preview

Run Storybook to preview all icons:
```bash
pnpm dev:storybook
```