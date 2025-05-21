import { clsx as cx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';
import * as styles from './Divider.css';

export interface DividerProps extends ComponentProps<'hr'> {
  orientation?: styles.Orientation;
  color?: 'default' | 'primary' | 'dark';
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { orientation = 'horizontal', color, className, ...props }: DividerProps,
  ref,
) {
  return (
    <hr
      ref={ref}
      aria-orientation={orientation}
      className={cx(styles.divider({ orientation, color }), className)}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
