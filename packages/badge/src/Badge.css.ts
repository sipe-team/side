import { style, styleVariants } from '@vanilla-extract/css';
import { color as colorToken, fontSize as fontSizeToken } from '@sipe-team/tokens';

// Define the types for our component
export const BadgeSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const BadgeVariant = {
  filled: 'filled',
  outline: 'outline',
  weak: 'weak',
} as const;

// Base styles for the badge
export const root = style({
  borderRadius: 8,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Size variants
export const size = styleVariants({
  [BadgeSize.small]: {
    padding: '4px 8px',
  },
  [BadgeSize.medium]: {
    padding: '8px 16px',
  },
  [BadgeSize.large]: {
    padding: '12px 24px',
  },
});

// Font size by badge size
export const fontSize = styleVariants({
  [BadgeSize.small]: {
    fontSize: fontSizeToken[12],
  },
  [BadgeSize.medium]: {
    fontSize: fontSizeToken[14],
  },
  [BadgeSize.large]: {
    fontSize: fontSizeToken[18],
  },
});

// Variant styles
export const variant = styleVariants({
  [BadgeVariant.filled]: {
    backgroundColor: colorToken.cyan900,
    border: 'none',
  },
  [BadgeVariant.outline]: {
    backgroundColor: 'transparent',
    border: `2px solid ${colorToken.cyan900}`,
  },
  [BadgeVariant.weak]: {
    backgroundColor: colorToken.gray200,
    border: 'none',
  },
});

// Text style
export const text = style({
  color: colorToken.cyan300,
  fontWeight: 600,
});
