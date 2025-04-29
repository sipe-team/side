import { useEffect, useRef } from 'react';

export function useIndeterminateCheckbox(indeterminate = false) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return inputRef;
}
