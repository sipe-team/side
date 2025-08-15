import { color } from '@sipe-team/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const whiteColor = color.white;
const backgroundColor = '#1a202c';
const sipeAccordionBackGroundColor = '#2d3748';

export const accordionRoot = style({
  width: '100%',
  borderRadius: '12px',
  overflow: 'hidden',
  padding: '20px',
  backgroundColor: backgroundColor,
  border: `1px solid ${sipeAccordionBackGroundColor}`,
});

export const accordionItem = style({
  borderBottom: `1px solid ${backgroundColor}`,
  ':last-child': {
    borderBottom: 'none',
  },
});

export const accordionTrigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px',
  backgroundColor: backgroundColor,
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  color: whiteColor,
});

export const accordionContentWrapper = recipe({
  base: {
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: sipeAccordionBackGroundColor,
  },
  variants: {
    shouldTransition: {
      true: {
        transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      false: {
        transition: 'none',
      },
    },
  },
  defaultVariants: {
    shouldTransition: false,
  },
});

export const accordionContentInner = style({
  padding: '12px 16px',
});

export const chevron = recipe({
  base: {
    transition: 'transform 0.3s ease',
  },
  variants: {
    isOpen: {
      true: {
        transform: 'rotate(0deg)',
      },
      false: {
        transform: 'rotate(180deg)',
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});
