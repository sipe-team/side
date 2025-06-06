import clsx from 'clsx';
import { type PropsWithChildren, createContext, useId } from 'react';
import { radioGroup, radioGroupLegend } from './Radio.css';
import type { RadioSize } from './constants/sizes';

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
    <fieldset className={clsx(radioGroup, className)} disabled={disabled} role="radiogroup">
      {labelText && <legend className={radioGroupLegend}>{labelText}</legend>}

      <RadioGroupContext.Provider value={{ ...rest, disabled, size, name }}>{children}</RadioGroupContext.Provider>
    </fieldset>
  );
}
