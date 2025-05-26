import clsx from 'clsx';
import { type ComponentProps, type PropsWithChildren, useContext, useId } from 'react';
import * as styles from './Radio.css';
import { RadioGroupContext } from './RadioGroup';
import type { RadioSize } from './constants/sizes';

type RadioProps = PropsWithChildren<
  Omit<ComponentProps<'input'>, 'size'> & {
    size?: RadioSize;
    className?: string;
  }
>;

export function Radio({
  value,
  defaultChecked,
  disabled = false,
  children,
  className,
  size: propSize,
  ...inputProps
}: RadioProps) {
  const groupContext = useContext(RadioGroupContext);
  const radioId = useId();

  // Context에서 오는 값들과 props 값들을 합성
  const isDisabled = groupContext.disabled || disabled;
  const radioSize = propSize || groupContext.size || 'medium';
  const isChecked = groupContext.value !== undefined ? groupContext.value === value : defaultChecked || false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      groupContext.onChangeValue?.(e.target.value);
    }
    inputProps.onChange?.(e);
  };

  return (
    <label
      className={clsx(
        styles.radioContainer({
          size: radioSize,
          disabled: isDisabled,
        }),
        className,
      )}
      htmlFor={radioId}
    >
      <input
        {...inputProps}
        id={radioId}
        className={styles.radioInput({
          size: radioSize,
          checked: isChecked,
          disabled: isDisabled,
        })}
        type="radio"
        value={value}
        name={groupContext.name}
        defaultChecked={groupContext.defaultValue === value || defaultChecked}
        disabled={isDisabled}
        checked={isChecked}
        onChange={handleChange}
      />

      {children && (
        <span
          className={styles.radioLabel({
            size: radioSize,
            disabled: isDisabled,
          })}
        >
          {children}
        </span>
      )}
    </label>
  );
}
