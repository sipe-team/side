import { createContext, useContext } from 'react';

interface AccordionItemContextValue {
  isOpen: boolean;
  toggleAccordion: () => void;
  triggerId: string;
  contentId: string;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('useAccordionItemContext must be used within an AccordionItem');
  }
  return context;
};
