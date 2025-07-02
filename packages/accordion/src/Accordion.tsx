import { Slot } from '@radix-ui/react-slot';
import { AccordionArrowIcon } from '@sipe-team/icon';
import { clsx as cx } from 'clsx';
import {
  type ComponentProps,
  type ForwardedRef,
  createContext,
  forwardRef,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import * as styles from './Accordion.css';
import type { AccordionContentProps, AccordionItemProps, AccordionRootProps } from './types';

interface AccordionItemContextValue {
  isOpen: boolean;
  toggleAccordion: () => void;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('useAccordionItemContext는 AccordionItem 내부에서 사용되어야 합니다');
  }
  return context;
};

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
  const [isOpen, setIsOpen] = useState(defaultOpen);

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
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');
  const [shouldTransition, setShouldTransition] = useState(false);

  const Comp = asChild ? Slot : 'div';

  // 높이 측정 및 트랜지션 처리
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return () => {};

    if (isOpen) {
      // 열릴 때: 실제 높이로 트랜지션 → 트랜지션 끝나면 auto로 변경
      setHeight(`${el.scrollHeight}px`);
      setShouldTransition(true);

      const handleTransitionEnd = () => {
        if (isOpen) setHeight('auto');
      };
      el.addEventListener('transitionend', handleTransitionEnd, { once: true });
      return () => el.removeEventListener('transitionend', handleTransitionEnd);
    }

    // 닫힐 때: auto → 실제 높이로 세팅 후 → 0으로 트랜지션
    if (el.style.height === 'auto') {
      setHeight(`${el.scrollHeight}px`);
      // 다음 프레임에 0으로 변경(트랜지션 적용)
      requestAnimationFrame(() => {
        setShouldTransition(true);
        setHeight('0px');
      });
    } else {
      setShouldTransition(true);
      setHeight('0px');
    }

    // clean-up
    return () => {};
  }, [isOpen]);

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
