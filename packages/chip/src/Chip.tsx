import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import { ChipColor, ChipSize, ChipState, ChipVariant } from './Chip.constants';
import * as styles from './Chip.css';

export interface ChipProps extends ComponentProps<'button'> {
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
  state?: ChipState;
  asChild?: boolean;
}

export const Chip = forwardRef(function Chip(
  {
    color = ChipColor.primary,
    variant = ChipVariant.filled,
    size = ChipSize.medium,
    state = ChipState.default,
    asChild,
    disabled,
    className: _className,
    children,
    ...props
  }: ChipProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const Component = asChild ? Slot : 'button';
  const className = cx(styles.chip({ color, variant, size, state }), { [styles.disabled]: disabled }, _className);

  return (
    <Component ref={ref} className={className} disabled={disabled} {...props}>
      {children}
    </Component>
  );
});
