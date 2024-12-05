import { createContext, useId } from 'react';
import type { PropsWithChildren } from 'react';
import styles from './RadioGroup.module.css';

/**
 * ================================================================
 * RadioGroup Provider
 * ================================================================
 */
type RadioGroupContext = Omit<RadioGroupProps, 'labelText' | 'children'>;

export const RadioGroupContext = createContext<RadioGroupContext>({});

/**
 * ================================================================
 * RadioGroup
 * ================================================================
 */

type RadioSize = 'small' | 'medium' | 'large';

type RadioGroupProps = PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onChangeValue?: (value: string) => void;

  labelText?: string;
  name?: string;

  size?: RadioSize;
  disabled?: boolean;
}>;

export function RadioGroup({
  labelText = '',
  size = 'medium',
  disabled = false,
  children,
  name: propName,
  ...rest
}: RadioGroupProps) {
  const fallbackId = useId();
  const name = propName ?? fallbackId;

  return (
    <fieldset
      className={styles.radioGroup}
      disabled={disabled}
      role={'radiogroup'}
    >
      <legend>{labelText}</legend>

      <RadioGroupContext.Provider value={{ ...rest, disabled, size, name }}>
        {children}
      </RadioGroupContext.Provider>
    </fieldset>
  );
}
