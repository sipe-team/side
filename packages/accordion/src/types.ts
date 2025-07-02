import type { ComponentProps, ReactNode } from 'react';

export interface AccordionRootProps extends ComponentProps<'div'> {
  children: ReactNode;
  asChild?: boolean;
}
export interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}
