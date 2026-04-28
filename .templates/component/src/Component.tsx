import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Component.css';

export interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Component = forwardRef(function Component(
  { asChild, className: _className, ...props }: ComponentProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.component(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
