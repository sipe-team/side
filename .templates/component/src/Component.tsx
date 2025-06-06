import { clsx as cx } from 'clsx';
import type { ComponentProps } from 'react';
import * as styles from './Component.css';

export function Component({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cx(styles.root, className)} {...props} />;
}
