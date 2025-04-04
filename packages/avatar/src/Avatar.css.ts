import { style, styleVariants } from '@vanilla-extract/css';
import { AvatarShape, AvatarSize } from './Avatar';

export const root = style({
  alignItems: 'center',
  backgroundColor: '#e2e8f0',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const size = styleVariants({
  [AvatarSize.xs]: {
    height: 24,
    width: 24,
  },
  [AvatarSize.sm]: {
    height: 32,
    width: 32,
  },
  [AvatarSize.md]: {
    height: 40,
    width: 40,
  },
  [AvatarSize.lg]: {
    height: 70,
    width: 70,
  },
  [AvatarSize.xl]: {
    height: 96,
    width: 96,
  },
});

export const shape = styleVariants({
  [AvatarShape.circle]: {
    borderRadius: '50%',
  },
  [AvatarShape.rounded]: {
    borderRadius: 4,
  },
  [AvatarShape.square]: {
    borderRadius: 0,
  },
});

export const image = style({
  height: '100%',
  objectFit: 'cover',
  width: '100%',
});

export const fallback = style({
  color: '#2d3748',
  fontSize: '0.8rem',
  textAlign: 'center',
});
