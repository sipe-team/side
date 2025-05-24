import { clsx as cx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';
import * as styles from './Divider.css';
import type { ColorType, OrientationType } from './constants';

export interface DividerProps extends ComponentProps<'hr'> {
  orientation?: OrientationType;
  color?: ColorType;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { orientation = 'horizontal', color = 'default', className, ...props }: DividerProps,
  ref,
) {
  return (
    <hr
      ref={ref}
      aria-orientation={orientation}
      className={cx(styles.base, styles.orientations[orientation], styles.colors[color], className)}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
