# @sipe-team/theme

A type-safe theme system built with vanilla-extract for runtime theme switching in the SIPE Design System.

## Features

- 🌓 Light and dark mode support 
- 🎨 CSS variables for colors, typography, spacing, and more design tokens
- 🧩 ThemeProvider component with React Context for theme management
- 🔄 Simple theme toggling and control API
- 🔒 Type-safe styling with vanilla-extract

## Installation

```bash
npm install @sipe-team/theme
# or
yarn add @sipe-team/theme
# or
pnpm add @sipe-team/theme
```

## Usage

### Basic Setup

Wrap your application with the ThemeProvider component:

```tsx
import { ThemeProvider } from '@sipe-team/theme';

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using Theme Variables in Styled Components

Use the theme contract in your vanilla-extract styles:

```tsx
import { style } from '@vanilla-extract/css';
import { vars } from '@sipe-team/theme';

export const button = style({
  backgroundColor: vars.color.primary,
  color: vars.color.text,
  border: `1px solid ${vars.color.border}`,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderRadius: vars.radius.md,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.medium,
  fontWeight: vars.typography.fontWeight.medium,
  cursor: 'pointer',
  boxShadow: vars.shadows.sm,
  ':hover': {
    opacity: vars.opacity[90],
  },
  ':focus': {
    outline: `2px solid ${vars.color.primary}`,
  },
});
```

### Accessing Theme in Components

Use the useTheme hook to access and control the theme:

```tsx
import { useTheme } from '@sipe-team/theme';

function ThemeSwitcher() {
  const { mode, setMode, toggleMode } = useTheme();
  
  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={toggleMode}>
        Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}
```

## Responsive Styles Utility

The theme package also includes a utility for creating responsive styles:

```tsx
import { style } from '@vanilla-extract/css';
import { responsiveStyle } from '@sipe-team/theme';

export const container = style({
  ...responsiveStyle({
    mobile: {
      padding: '16px',
      fontSize: '14px',
    },
    tablet: {
      padding: '24px',
      fontSize: '16px',
    },
    desktop: {
      padding: '32px',
      fontSize: '18px',
    },
  }),
});
```

## Extending the Theme

You can extend or modify the theme by creating your own theme contract and layers based on this package. 