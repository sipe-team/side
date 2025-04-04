import { style, styleVariants } from '@vanilla-extract/css';

export const root = style({
  alignItems: 'center',
  backgroundColor: '#e2e8f0',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
});

/**
 * Avatar 컴포넌트의 크기 옵션
 * @type {AvatarSize}
 * - xs: 24px
 * - sm: 32px
 * - md: 40px (기본값)
 * - lg: 70px
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const size = styleVariants({
  xs: {
    height: 24,
    width: 24,
  },
  sm: {
    height: 32,
    width: 32,
  },
  md: {
    height: 40,
    width: 40,
  },
  lg: {
    height: 70,
    width: 70,
  },
  xl: {
    height: 96,
    width: 96,
  },
});

/**
 * Avatar 컴포넌트의 모양 옵션
 * @type {AvatarShape}
 * - circle: 원형 (50% border-radius)
 * - rounded: 둥근 모서리 (4px border-radius)
 * - square: 정사각형 (0px border-radius)
 */
export type AvatarShape = 'circle' | 'rounded' | 'square';

export const shape = styleVariants({
  circle: {
    borderRadius: '50%',
  },
  rounded: {
    borderRadius: 4,
  },
  square: {
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
