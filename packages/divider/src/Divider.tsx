import { clsx as cx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';
import * as styles from './Divider.css';

interface DividerProps extends ComponentProps<'hr'> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef(function Divider({ orientation = 'horizontal', ...props }: DividerProps) {
  return (
    <hr
      {...props}
      aria-orientation={orientation}
      className={cx(styles.orientation[orientation], styles.divider, props.className)}
    />
  );
});

Divider.displayName = 'Divider';
