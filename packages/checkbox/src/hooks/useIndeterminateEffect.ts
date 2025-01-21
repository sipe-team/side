// hooks/useIndeterminateEffect.ts
import { type RefObject, useEffect } from 'react';

export const useIndeterminateEffect = (
  inputRef: RefObject<HTMLInputElement>,
  indeterminate: boolean,
) => {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [inputRef, indeterminate]);
};
