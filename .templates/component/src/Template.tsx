import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Template.css';

export interface TemplateProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Template = forwardRef(function Template(
  { asChild, className: _className, ...props }: TemplateProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.template(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
