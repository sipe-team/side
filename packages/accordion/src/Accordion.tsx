import type { ReactNode } from 'react';
import { type ComponentProps, type ForwardedRef, forwardRef, useState } from 'react';

import { AccordionArrowIcon } from '@sipe-team/icon';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Accordion.css';
import { AccordionItemContext, useAccordionItemContext } from './context/AccordionItemContext';
import { AccordionRootContext, useAccordionRootContext } from './context/AccordionRootContext';
import { useAccordionAnimation } from './hooks/useAccordionAnimation';

export interface AccordionRootProps extends ComponentProps<'div'> {
  children: ReactNode;
  asChild?: boolean;
  type?: 'single' | 'multiple';
  initialValue?: string | null;
  value?: string | null;
  onValueChange?: (value: string | null) => void;
}
export interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  value?: string;
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
  {
    children,
    asChild,
    className,
    type = 'multiple',
    initialValue = null,
    value,
    onValueChange,
    ...props
  }: AccordionRootProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [internalValue, setInternalValue] = useState<string | null>(initialValue);
  const activeValue = value !== undefined ? value : internalValue;

  const onItemToggle = (itemValue: string) => {
    const newValue = activeValue === itemValue ? null : itemValue;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const Component = asChild ? Slot : 'div';
  return (
    <AccordionRootContext.Provider value={{ type, activeValue, onItemToggle }}>
      <Component ref={ref} className={cx(styles.accordionRoot, className)} {...props}>
        {children}
      </Component>
    </AccordionRootContext.Provider>
  );
});

export const AccordionItem = forwardRef(function AccordionItem(
  { children, className, defaultOpen = false, value, ...props }: AccordionItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const rootContext = useAccordionRootContext();
  const isSingleMode = rootContext?.type === 'single' && value !== undefined;

  const [localIsOpen, setLocalIsOpen] = useState<boolean>(defaultOpen);

  const isOpen = isSingleMode ? rootContext.activeValue === value : localIsOpen;

  const toggleAccordion = () => {
    if (isSingleMode) {
      rootContext.onItemToggle(value);
    } else {
      setLocalIsOpen((prev) => !prev);
    }
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
