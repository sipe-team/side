import { createContext, useContext } from 'react';

interface AccordionItemContextValue {
  isOpen: boolean;
  toggleAccordion: () => void;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('useAccordionItemContext는 AccordionItem 내부에서 사용되어야 합니다');
  }
  return context;
};
