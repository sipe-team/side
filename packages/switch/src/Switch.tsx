import { clsx as cx } from 'clsx';
import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';
import * as styles from './Switch.css';
import type { SwitchSize } from './constants/size';
import useCheckedController from './hooks/useCheckedController';

export interface SwitchProps extends Omit<ComponentProps<'input'>, 'size'> {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Switch = forwardRef(function Switch(
  { className, defaultChecked, checked, disabled, onChange, size = 'md', ...props }: SwitchProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { checked: overrideChecked, onChange: overrideOnChange } = useCheckedController({
    defaultChecked,
    checked,
    onChange,
  });

  const state = overrideChecked ? 'checked' : 'unchecked';

  return (
    <label className={styles.wrapper}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        aria-checked={overrideChecked}
        className={cx(styles.input, className)}
        checked={overrideChecked}
        disabled={disabled}
        onChange={overrideOnChange}
        {...props}
      />
      <span
        className={styles.track({ size, disabled, checked: overrideChecked })}
        data-disabled={disabled}
        data-state={state}
      >
        <span className={styles.thumb({ size, checked: overrideChecked })} data-state={state} />
      </span>
    </label>
  );
});
