import { createContext, type PropsWithChildren, useId } from 'react';

import clsx from 'clsx';

import type { RadioSize } from './constants/sizes';
import { radioGroup } from './Radio.css';

type RadioGroupContext = Omit<RadioGroupProps, 'labelText' | 'children'>;

export const RadioGroupContext = createContext<RadioGroupContext>({});

type RadioGroupProps = PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onChangeValue?: (value: string) => void;
  labelText?: string;
  name?: string;
  size?: RadioSize;
  disabled?: boolean;
  className?: string;
}>;

export function RadioGroup({
  labelText = '',
  size = 'medium',
  disabled = false,
  children,
  name: propName,
  className,
  ...rest
}: RadioGroupProps) {
  const fallbackId = useId();
  const name = propName ?? fallbackId;

  return (
    <fieldset className={clsx(radioGroup, className)} disabled={disabled}>
      {labelText && <legend>{labelText}</legend>}
      <RadioGroupContext.Provider value={{ ...rest, disabled, size, name }}>{children}</RadioGroupContext.Provider>
    </fieldset>
  );
}
