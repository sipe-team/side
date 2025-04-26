import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { ButtonColor, ButtonVariant } from './Button';

const primaryColor = '#00ffff';
const blackColor = 'black';
const whiteColor = 'white';
const transparentColor = 'transparent';

export const disabled = style({
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
});

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 16px',
    borderRadius: 8,
    height: 40,
    fontSize: 22,
    lineHeight: 30.8,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  variants: {
    color: {
      [ButtonColor.primary]: {},
      [ButtonColor.black]: {},
      [ButtonColor.white]: {},
    },
    variant: {
      [ButtonVariant.filled]: {
        border: 'none',
      },
      [ButtonVariant.outline]: {
        backgroundColor: transparentColor,
      },
      [ButtonVariant.weak]: {
        backgroundColor: transparentColor,
        border: 'none',
        ':hover': {
          opacity: 0.1,
        },
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        color: ButtonColor.primary,
        variant: ButtonVariant.filled,
      },
      style: {
        backgroundColor: primaryColor,
        color: blackColor,
        ':hover': {
          backgroundColor: '#00d2d2',
          color: blackColor,
        },
      },
    },
    {
      variants: {
        color: ButtonColor.primary,
        variant: ButtonVariant.outline,
      },
      style: {
        border: `1px solid ${primaryColor}`,
        color: primaryColor,
        ':hover': {
          backgroundColor: primaryColor,
          color: blackColor,
        },
      },
    },
    {
      variants: {
        color: ButtonColor.primary,
        variant: ButtonVariant.weak,
      },
      style: {
        color: primaryColor,
        ':hover': {
          backgroundColor: primaryColor,
          color: primaryColor,
        },
      },
    },
    {
      variants: {
        color: ButtonColor.black,
        variant: ButtonVariant.filled,
      },
      style: {
        backgroundColor: blackColor,
        color: whiteColor,
        ':hover': {
          backgroundColor: '#2d3748',
          color: whiteColor,
        },
      },
    },
    {
      variants: {
        color: ButtonColor.black,
        variant: ButtonVariant.outline,
      },
      style: {
        border: `1px solid ${blackColor}`,
        color: blackColor,
        ':hover': {
          backgroundColor: blackColor,
          color: whiteColor,
        },
      },
    },
    {
      variants: {
        color: ButtonColor.black,
        variant: ButtonVariant.weak,
      },
      style: {
        color: blackColor,
        ':hover': {
          backgroundColor: blackColor,
          color: blackColor,
        },
      },
    },
    {
      variants: {
        color: ButtonColor.white,
        variant: ButtonVariant.filled,
      },
      style: {
        backgroundColor: whiteColor,
        color: blackColor,
        ':hover': {
          backgroundColor: '#cbd5e0',
          color: blackColor,
        },
      },
    },
    {
      variants: {
        color: ButtonColor.white,
        variant: ButtonVariant.outline,
      },
      style: {
        border: `1px solid ${whiteColor}`,
        color: whiteColor,
        ':hover': {
          backgroundColor: whiteColor,
          color: blackColor,
        },
      },
    },
    {
      variants: {
        color: ButtonColor.white,
        variant: ButtonVariant.weak,
      },
      style: {
        color: whiteColor,
        ':hover': {
          backgroundColor: whiteColor,
          color: whiteColor,
        },
      },
    },
  ],
  defaultVariants: {
    color: ButtonColor.primary,
    variant: ButtonVariant.filled,
  },
});
