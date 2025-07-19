import { useLayoutEffect, useRef, useState } from 'react';

export const useAccordionAnimation = (isOpen: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>('0px');
  const [shouldTransition, setShouldTransition] = useState<boolean>(false);

  useLayoutEffect(() => {
    const el = ref.current;

    if (isOpen) {
      setHeight(`${el?.scrollHeight}px`);
      setShouldTransition(true);

      const handleTransitionEnd = () => {
        if (isOpen) setHeight('auto');
      };
      el?.addEventListener('transitionend', handleTransitionEnd, { once: true });
      return () => el?.removeEventListener('transitionend', handleTransitionEnd);
    }

    if (el?.style.height === 'auto') {
      setHeight(`${el?.scrollHeight}px`);
      requestAnimationFrame(() => {
        setShouldTransition(true);
        setHeight('0px');
      });
    } else {
      setShouldTransition(true);
      setHeight('0px');
    }

    return () => {};
  }, [isOpen]);

  return { ref, height, shouldTransition };
};
