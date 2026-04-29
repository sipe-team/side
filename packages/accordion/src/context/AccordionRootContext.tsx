import { createContext, useContext } from 'react';

interface AccordionRootContextValue {
  type: 'single' | 'multiple';
  activeValue: string | null;
  onItemToggle: (value: string) => void;
}

export const AccordionRootContext = createContext<AccordionRootContextValue | null>(null);

export const useAccordionRootContext = () => {
  return useContext(AccordionRootContext);
};
