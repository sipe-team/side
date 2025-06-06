import { color, radius } from '@sipe-team/tokens';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

//FIXME : background color 바꿔야함. 지금 x-lay 같음...

const fadeInOut = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.8 },
  '100%': { opacity: 1 },
});

export const SkeletonVariant = {
  rectangular: 'rectangular',
  circle: 'circle',
  text: 'text',
  rounded: 'rounded',
} as const;

export type SkeletonVariant = (typeof SkeletonVariant)[keyof typeof SkeletonVariant];

const baseSkeletonStyle = style({
  backgroundColor: color.gray200,
  backgroundImage: 'none',
  backgroundClip: 'border-box',
  border: 'none',
  boxShadow: 'none',
  color: 'transparent',
  outline: 'none',
  pointerEvents: 'none',
  userSelect: 'none',
  cursor: 'default',
  overflow: 'hidden',
  position: 'relative',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(90deg, transparent, ${color.gray200}, transparent)`,
    animation: `${fadeInOut} 1.5s ease-in-out infinite`,
  },
});

export const skeleton = recipe({
  base: baseSkeletonStyle,

  variants: {
    variant: {
      [SkeletonVariant.rectangular]: {
        borderRadius: radius.sm,
      },
      [SkeletonVariant.circle]: {
        borderRadius: radius.full,
        aspectRatio: '1',
      },
      [SkeletonVariant.text]: {
        borderRadius: radius.sm,
        height: '1em',
        width: '100%',
      },
      [SkeletonVariant.rounded]: {
        borderRadius: radius.md,
      },
    },

    loading: {
      true: {},
      false: {
        animation: 'none',
        backgroundColor: 'transparent',

        '::before': {
          display: 'none',
        },
      },
    },

    pulse: {
      true: {
        '::before': {
          animation: `${fadeInOut} 1.2s ease-in-out infinite`,
        },
      },
      false: {
        '::before': {
          animation: `${fadeInOut} 2s ease-in-out infinite`,
        },
      },
    },
  },

  defaultVariants: {
    variant: SkeletonVariant.rectangular,
    loading: true,
    pulse: false,
  },
});

export const shimmer = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(100%)' },
});

export const shimmerEffect = style({
  '::before': {
    background: `linear-gradient(90deg, transparent, ${color.white}, transparent)`,
    animation: `${shimmer} 2s infinite`,
  },
});
