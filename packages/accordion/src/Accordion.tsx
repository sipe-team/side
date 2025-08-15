import type { ReactNode } from 'react';
import { type ComponentProps, type ForwardedRef, forwardRef, useState } from 'react';

import { AccordionArrowIcon } from '@sipe-team/icon';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Accordion.css';
import { AccordionItemContext, useAccordionItemContext } from './context/AccordionItemContext';
import { useAccordionAnimation } from './hooks/useAccordionAnimation';
export interface AccordionRootProps extends ComponentProps<'div'> {
  children: ReactNode;
  asChild?: boolean;
}
export interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export interface AccordionTriggerProps extends ComponentProps<'button'> {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export const AccordionRoot = forwardRef(function AccordionRoot(
  { children, asChild, className, ...props }: AccordionRootProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Component = asChild ? Slot : 'div';
  return (
    <Component ref={ref} className={cx(styles.accordionRoot, className)} {...props}>
      {children}
    </Component>
  );
});

export const AccordionItem = forwardRef(function AccordionItem(
  { children, className, defaultOpen = false, ...props }: AccordionItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  const contextValue = { isOpen, toggleAccordion };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div ref={ref} className={cx(styles.accordionItem, className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});

export const AccordionTrigger = forwardRef(function AccordionTrigger(
  { children, className, asChild, ...props }: AccordionTriggerProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { isOpen, toggleAccordion } = useAccordionItemContext();
  const Component = asChild ? Slot : 'button';
  const buttonProps = asChild ? {} : { type: 'button' as const };

  return (
    <Component
      ref={ref}
      {...buttonProps}
      className={cx(styles.accordionTrigger, className)}
      onClick={toggleAccordion}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
    </Component>
  );
});

export const AccordionIndicator = () => {
  const { isOpen } = useAccordionItemContext();
  return <AccordionArrowIcon className={styles.chevron({ isOpen })} />;
};

export const AccordionContent = ({ children, asChild, className, ...props }: AccordionContentProps) => {
  const { isOpen } = useAccordionItemContext();
  const { ref, height, shouldTransition } = useAccordionAnimation(isOpen);

  const Component = asChild ? Slot : 'div';

  return (
    <div
      ref={ref}
      className={cx(styles.accordionContentWrapper({ shouldTransition }))}
      style={{
        height,
      }}
      aria-hidden={!isOpen}
    >
      <Component className={cx(styles.accordionContentInner, className)} {...props}>
        {children}
      </Component>
    </div>
  );
};

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Indicator: AccordionIndicator,
  Content: AccordionContent,
});

Accordion.displayName = 'Accordion';
