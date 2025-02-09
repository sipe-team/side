import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './Reset.module.css';

export interface ResetProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export const Reset = forwardRef<HTMLDivElement, ResetProps>(
  ({ asChild = false, children, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component ref={ref} className={classNames(styles.reset, className)} {...props}>
        {children}
      </Component>
    );
  },
);

Reset.displayName = 'Reset';
