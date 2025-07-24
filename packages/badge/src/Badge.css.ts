import { color as colorToken, fontSize as fontSizeToken } from '@sipe-team/tokens';

import { recipe } from '@vanilla-extract/recipes';

import { BadgeColor, BadgeSize, BadgeVariant } from './Badge.constants';

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease-in-out',
    userSelect: 'none',
    gap: '4px',
  },
  variants: {
    size: {
      [BadgeSize.small]: {
        padding: '2px 8px',
        fontSize: fontSizeToken[12],
        lineHeight: '16px',
        height: '20px',
      },
      [BadgeSize.large]: {
        padding: '4px 12px',
        fontSize: fontSizeToken[14],
        lineHeight: '20px',
        height: '24px',
      },
    },
    color: {
      [BadgeColor.white]: {},
      [BadgeColor.gray]: {},
      [BadgeColor.danger]: {},
      [BadgeColor.general]: {},
      [BadgeColor['1st']]: {},
      [BadgeColor['2nd']]: {},
      [BadgeColor['3rd']]: {},
      [BadgeColor['4th']]: {},
    },
    variant: {
      [BadgeVariant.solid]: {},
      [BadgeVariant.default]: {},
    },
  },
  compoundVariants: [
    // White variants
    {
      variants: { color: BadgeColor.white, variant: BadgeVariant.solid },
      style: {
        backgroundColor: colorToken.white,
        color: colorToken.gray900,
      },
    },
    {
      variants: { color: BadgeColor.white, variant: BadgeVariant.default },
      style: {
        backgroundColor: 'transparent',
        color: colorToken.white,
        border: `1px solid ${colorToken.white}`,
      },
    },
    // Gray variants
    {
      variants: { color: BadgeColor.gray, variant: BadgeVariant.solid },
      style: {
        backgroundColor: colorToken.gray700,
        color: colorToken.white,
      },
    },
    {
      variants: { color: BadgeColor.gray, variant: BadgeVariant.default },
      style: {
        backgroundColor: colorToken.gray100,
        color: colorToken.gray700,
      },
    },
    // Danger variants
    {
      variants: { color: BadgeColor.danger, variant: BadgeVariant.solid },
      style: {
        backgroundColor: colorToken.red500,
        color: colorToken.white,
      },
    },
    {
      variants: { color: BadgeColor.danger, variant: BadgeVariant.default },
      style: {
        backgroundColor: colorToken.red100,
        color: colorToken.red700,
      },
    },
    // General variants
    {
      variants: { color: BadgeColor.general, variant: BadgeVariant.solid },
      style: {
        backgroundColor: colorToken.blue500,
        color: colorToken.white,
      },
    },
    {
      variants: { color: BadgeColor.general, variant: BadgeVariant.default },
      style: {
        backgroundColor: colorToken.blue100,
        color: colorToken.blue700,
      },
    },
    // 1st variants
    {
      variants: { color: BadgeColor['1st'], variant: BadgeVariant.solid },
      style: {
        backgroundColor: colorToken.green500,
        color: colorToken.white,
      },
    },
    {
      variants: { color: BadgeColor['1st'], variant: BadgeVariant.default },
      style: {
        backgroundColor: colorToken.green100,
        color: colorToken.green700,
      },
    },
    // 2nd variants
    {
      variants: { color: BadgeColor['2nd'], variant: BadgeVariant.solid },
      style: {
        backgroundColor: colorToken.purple500,
        color: colorToken.white,
      },
    },
    {
      variants: { color: BadgeColor['2nd'], variant: BadgeVariant.default },
      style: {
        backgroundColor: colorToken.purple100,
        color: colorToken.purple700,
      },
    },
    // 3rd variants
    {
      variants: { color: BadgeColor['3rd'], variant: BadgeVariant.solid },
      style: {
        backgroundColor: colorToken.orange500,
        color: colorToken.white,
      },
    },
    {
      variants: { color: BadgeColor['3rd'], variant: BadgeVariant.default },
      style: {
        backgroundColor: colorToken.orange100,
        color: colorToken.orange700,
      },
    },
    // 4th variants
    {
      variants: { color: BadgeColor['4th'], variant: BadgeVariant.solid },
      style: {
        backgroundColor: colorToken.cyan500,
        color: colorToken.white,
      },
    },
    {
      variants: { color: BadgeColor['4th'], variant: BadgeVariant.default },
      style: {
        backgroundColor: colorToken.cyan100,
        color: colorToken.cyan700,
      },
    },
  ],
  defaultVariants: {
    size: BadgeSize.small,
    color: BadgeColor.gray,
    variant: BadgeVariant.default,
  },
});
