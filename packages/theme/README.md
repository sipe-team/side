# @sipe-team/theme

A type-safe theme system built with vanilla-extract for runtime theme switching in the SIPE Design System.

## Features

- 🌓 Light and dark mode support 
- 🎨 CSS variables for colors, typography, spacing and interactive states
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
import { theme } from '@sipe-team/theme';

export const button = style({
  backgroundColor: theme.color.primary,
  color: theme.color.text,
  border: `1px solid ${theme.color.border}`,
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  borderRadius: '4px',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize.medium,
  fontWeight: theme.typography.fontWeight.medium,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: theme.state.hover,
  },
  ':focus': {
    outline: `2px solid ${theme.state.focus}`,
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

## Available Theme Variables

The theme contract provides access to the following variables:

```tsx
// Colors
theme.color.primary    // Primary brand color
theme.color.black      // Black color
theme.color.white      // White color
theme.color.background // Background color
theme.color.text       // Text color
theme.color.border     // Border color

// Spacing
theme.spacing.xs       // Extra small spacing
theme.spacing.sm       // Small spacing
theme.spacing.md       // Medium spacing
theme.spacing.lg       // Large spacing
theme.spacing.xl       // Extra large spacing

// Typography
theme.typography.fontFamily                // Base font family
theme.typography.fontSize.small           // Small font size
theme.typography.fontSize.medium          // Medium font size 
theme.typography.fontSize.large           // Large font size
theme.typography.lineHeight.default       // Default line height
theme.typography.lineHeight.heading       // Heading line height
theme.typography.fontWeight.regular       // Regular font weight
theme.typography.fontWeight.medium        // Medium font weight
theme.typography.fontWeight.bold          // Bold font weight

// Interactive states
theme.state.hover      // Hover state color
theme.state.focus      // Focus state color
theme.state.active     // Active state color

// Current theme mode
theme.mode             // Current theme mode ('light' or 'dark')
```

## Extending the Theme

You can extend or modify the theme by creating your own theme contract and layers based on this package. 