import { color } from '@sipe-team/tokens';
import { clsx as cx } from 'clsx';
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from 'react';
import styles from './Switch.module.css';
import { type SwitchSize, switchSize } from './constants/size';
import useCheckedController from './hooks/useCheckedController';

export interface SwitchProps extends Omit<ComponentProps<'input'>, 'size'> {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Switch = forwardRef(function Switch(
  {
    className,
    defaultChecked,
    checked,
    disabled,
    onChange,
    size = 'md',
    ...props
  }: SwitchProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { checked: overrideChecked, onChange: overrideOnChange } =
    useCheckedController({
      defaultChecked,
      checked,
      onChange,
    });

  const style = {
    '--switch-width': `${switchSize[size].width}px`,
    '--switch-height': `${switchSize[size].height}px`,
    '--switch-diff': `${switchSize[size].width - switchSize[size].height}px`,
    '--switch-border-radius': '100px',
    '--switch-thumb-color': `${color.white}`,
    '--switch-background-color': `${color.gray300}`,
    '--switch-checked-background-color': `${color.blue500}`,
    '--switch-shadow': `0px 2px 4px color-mix(in srgb, ${color.gray900} 10%, transparent), 0px 0px 1px color-mix(in srgb, ${color.gray900} 30%, transparent)`,
  } as CSSProperties;

  const state = overrideChecked ? 'checked' : 'unchecked';

  return (
    <label className={styles['switch-wrapper']} style={style}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        aria-checked={overrideChecked}
        className={cx(styles['switch-input'], className)}
        checked={overrideChecked}
        disabled={disabled}
        onChange={overrideOnChange}
        {...props}
      />
      <span
        className={styles['switch-track']}
        data-disabled={disabled}
        data-state={state}
      >
        <span className={styles['switch-thumb']} data-state={state} />
      </span>
    </label>
  );
});
