import { color, opacity, themeColor, vars, zIndex } from '@sipe-team/tokens';

import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const tooltipBackgroundColor = `var(--tooltip-bg-color, ${themeColor['1st'].background})`;
const tooltipArrowSize = `calc(${vars.spacing.component.md} / 2)`;
const tooltipArrowOffset = `calc(${vars.spacing.component.md} / -2)`;
const tooltipShadow = `0 ${vars.spacing.component.xs} ${vars.spacing.component.sm} rgba(0, 0, 0, ${opacity[20]})`;

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const tooltip = recipe({
  base: {
    position: 'fixed',
    backgroundColor: tooltipBackgroundColor,
    color: color.white,
    padding: `${vars.spacing.component.sm} ${vars.spacing.component.md}`,
    borderRadius: vars.radius.component.lg,
    fontSize: vars.typography.fontSize['050'],
    lineHeight: vars.typography.lineHeight.regular,
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    maxWidth: '250px',
    boxShadow: tooltipShadow,
    zIndex: zIndex.dropdown,
    animation: `${fadeIn} 0.15s ease`,
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
    selectors: {
      '&::after': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
  },
  variants: {
    placement: {
      'top-left': {
        selectors: {
          '&::after': {
            bottom: tooltipArrowOffset,
            left: vars.spacing.component.sm,
            borderWidth: `${tooltipArrowSize} ${tooltipArrowSize} 0 ${tooltipArrowSize}`,
            borderColor: `${tooltipBackgroundColor} transparent transparent transparent`,
          },
        },
      },
      'top-right': {
        selectors: {
          '&::after': {
            bottom: tooltipArrowOffset,
            right: vars.spacing.component.sm,
            borderWidth: `${tooltipArrowSize} ${tooltipArrowSize} 0 ${tooltipArrowSize}`,
            borderColor: `${tooltipBackgroundColor} transparent transparent transparent`,
          },
        },
      },
      'bottom-left': {
        selectors: {
          '&::after': {
            top: tooltipArrowOffset,
            left: vars.spacing.component.sm,
            borderWidth: `0 ${tooltipArrowSize} ${tooltipArrowSize} ${tooltipArrowSize}`,
            borderColor: `transparent transparent ${tooltipBackgroundColor} transparent`,
          },
        },
      },
      'bottom-right': {
        selectors: {
          '&::after': {
            top: tooltipArrowOffset,
            right: vars.spacing.component.sm,
            borderWidth: `0 ${tooltipArrowSize} ${tooltipArrowSize} ${tooltipArrowSize}`,
            borderColor: `transparent transparent ${tooltipBackgroundColor} transparent`,
          },
        },
      },
      top: {
        selectors: {
          '&::after': {
            bottom: tooltipArrowOffset,
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: `${tooltipArrowSize} ${tooltipArrowSize} 0 ${tooltipArrowSize}`,
            borderColor: `${tooltipBackgroundColor} transparent transparent transparent`,
          },
        },
      },
      bottom: {
        selectors: {
          '&::after': {
            top: tooltipArrowOffset,
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: `0 ${tooltipArrowSize} ${tooltipArrowSize} ${tooltipArrowSize}`,
            borderColor: `transparent transparent ${tooltipBackgroundColor} transparent`,
          },
        },
      },
      left: {
        selectors: {
          '&::after': {
            right: tooltipArrowOffset,
            top: '50%',
            transform: 'translateY(-50%)',
            borderWidth: `${tooltipArrowSize} 0 ${tooltipArrowSize} ${tooltipArrowSize}`,
            borderColor: `transparent transparent transparent ${tooltipBackgroundColor}`,
          },
        },
      },
      right: {
        selectors: {
          '&::after': {
            left: tooltipArrowOffset,
            top: '50%',
            transform: 'translateY(-50%)',
            borderWidth: `${tooltipArrowSize} ${tooltipArrowSize} ${tooltipArrowSize} 0`,
            borderColor: `transparent ${tooltipBackgroundColor} transparent transparent`,
          },
        },
      },
    },
  },
});

export const button = style({
  padding: `${vars.spacing.component.sm} ${vars.spacing.component.md}`,
  fontSize: vars.typography.fontSize['100'],
  border: '1px solid #ccc',
  borderRadius: vars.radius.component.md,
  backgroundColor: '#f9f9f9',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#e6e6e6',
  },
});
