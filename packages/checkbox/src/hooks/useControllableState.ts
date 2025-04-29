import type { Dispatch } from 'react';
import type { SetStateAction } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

/**
 * A custom React hook that provides a controlled or uncontrolled state management solution.
 *
 * @param prop - The controlled prop value
 * @param defaultProp - The default value for uncontrolled state
 * @param onChange - Callback function triggered when state changes
 * @returns [value, setValue] - The current value and function to update it
 */
function useControllableState<T>({ prop, defaultProp, onChange = () => {} }: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
        if (value !== prop) handleChange(value as T);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange],
  );

  return [value, setValue] as const;
}

/**
 * A custom hook that implements a callback ref pattern.
 * This ensures we're always working with the latest callback function.
 */
function useCallbackRef<T>(callback: (value: T) => void): (value: T) => void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((value: T) => callbackRef.current(value), []);
}

/**
 * Internal hook for managing uncontrolled state with change notification.
 */
function useUncontrolledState<T>({ defaultProp, onChange }: Omit<UseControllableStateParams<T>, 'prop'>) {
  const [value, setValue] = useState<T | undefined>(defaultProp);
  const prevValueRef = useRef(value);
  const handleChange = useCallbackRef(onChange || (() => {}));

  useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, handleChange]);

  return [value, setValue] as const;
}

export { useControllableState };
