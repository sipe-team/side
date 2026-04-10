import { useCallback, useEffect, useRef, useState } from 'react';

type UseControllableStateParams<T> = {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: NonNullable<T>) => void;
};

function useControllableState<T>({ prop, defaultProp, onChange = () => {} }: UseControllableStateParams<T>) {
  const [uncontrolledState, setUncontrolledState] = useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledState;

  const callbackRef = useRef(onChange);
  useEffect(() => {
    callbackRef.current = onChange;
  });

  const setValue = useCallback(
    (nextValue: T | ((prevValue: T) => T)) => {
      const newValue = typeof nextValue === 'function' ? (nextValue as (prevValue: T) => T)(value as T) : nextValue;

      if (isControlled) {
        if (newValue !== prop) callbackRef.current(newValue as NonNullable<T>);
      } else {
        setUncontrolledState(newValue);
      }
    },
    [isControlled, prop, value],
  );

  const prevValueRef = useRef(value);
  useEffect(() => {
    if (!isControlled && prevValueRef.current !== value) {
      callbackRef.current(value as NonNullable<T>);
      prevValueRef.current = value;
    }
  }, [value, isControlled]);

  return [value, setValue] as const;
}

export { useControllableState };
