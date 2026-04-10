import { createContext, useContext } from 'react';

interface AccordionItemContextValue {
  isOpen: boolean;
  toggleAccordion: () => void;
}

export const AccordionItemContext = createContext<AccordionItemContextValue>({
  isOpen: false,
  toggleAccordion: () => {},
});

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('useAccordionItemContext must be used within an AccordionItem');
  }
  return context;
};
