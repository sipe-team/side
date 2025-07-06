import { Slot } from '@radix-ui/react-slot';
import { AccordionArrowIcon } from '@sipe-team/icon';
import { clsx as cx } from 'clsx';
import { type ComponentProps, type ForwardedRef, forwardRef, useState } from 'react';
import * as styles from './Accordion.css';
import { AccordionItemContext, useAccordionItemContext } from './context/AccordionItemContext';
import { useAccordionAnimation } from './hooks/useAccordionAnimation';
import type { AccordionContentProps, AccordionItemProps, AccordionRootProps } from './types';

export const AccordionRoot = forwardRef(function AccordionRoot(
  { children, asChild, className, ...props }: AccordionRootProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp ref={ref} className={cx(styles.accordionRoot, className)} {...props}>
      {children}
    </Comp>
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
  { children, className, ...props }: ComponentProps<'button'>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { isOpen, toggleAccordion } = useAccordionItemContext();

  return (
    <button
      ref={ref}
      type="button"
      className={cx(styles.accordionTrigger, className)}
      onClick={toggleAccordion}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <AccordionArrowIcon className={styles.chevron({ isOpen })} />
    </button>
  );
});

export const AccordionContent = ({ children, asChild, className, ...props }: AccordionContentProps) => {
  const { isOpen } = useAccordionItemContext();
  const { ref, height, shouldTransition } = useAccordionAnimation(isOpen);

  const Comp = asChild ? Slot : 'div';

  return (
    <div
      ref={ref}
      className={cx(styles.accordionContentWrapper({ shouldTransition }))}
      style={{
        height,
      }}
      aria-hidden={!isOpen}
    >
      <Comp className={cx(styles.accordionContentInner, className)} {...props}>
        {children}
      </Comp>
    </div>
  );
};

export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

Accordion.displayName = 'Accordion';
