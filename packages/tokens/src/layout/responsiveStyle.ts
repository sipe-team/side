// ? https://seek-oss.github.io/braid-design-system/css/responsiveStyle/

import type { StyleRule } from '@vanilla-extract/css';

import { breakpoints } from './breakpoints';

function mapValues<T extends object, TResult>(obj: T, fn: (value: T[keyof T], key: keyof T) => TResult) {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[key as keyof T] = fn(value, key as keyof T);
      return acc;
    },
    {} as Record<keyof T, TResult>,
  );
}

const { sm: _, ...breakpointsAboveSm } = breakpoints;
export const breakpointQuery = mapValues(breakpointsAboveSm, (bp) => `screen and (min-width: ${bp}px)`);

const makeMediaQuery = (breakpoint: keyof typeof breakpointQuery) => (styles?: CSSProps) =>
  !styles || Object.keys(styles).length === 0
    ? {}
    : {
        [breakpointQuery[breakpoint]]: styles,
      };

const mediaQuery = {
  md: makeMediaQuery('md'),
  lg: makeMediaQuery('lg'),
};

type CSSProps = Omit<StyleRule, '@media' | '@supports'>;
interface ResponsiveStyle {
  sm?: CSSProps;
  md?: CSSProps;
  lg?: CSSProps;
}

export const responsiveStyle = ({ sm, md, lg }: ResponsiveStyle): StyleRule => ({
  ...sm,
  ...(md || lg
    ? {
        '@media': {
          ...mediaQuery.md(md ?? {}),
          ...mediaQuery.lg(lg ?? {}),
        },
      }
    : {}),
});
