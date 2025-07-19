import { type ComponentProps, type CSSProperties, type ForwardedRef, forwardRef, useMemo } from 'react';

import { useControllableState } from '@radix-ui/react-use-controllable-state';

import clsx from 'clsx';

import { SWITCH_SIZES, SwitchSize } from './constants/size';
import * as styles from './Switch.css';

export type { SwitchSize } from './constants/size';

export interface SwitchProps extends Omit<ComponentProps<'input'>, 'size'> {
  size?: SwitchSize;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  label?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const Switch = forwardRef(function Switch(
  {
    className,
    size = SwitchSize.md,
    defaultChecked,
    checked: checkedProp,
    disabled = false,
    onChange,
    onKeyDown,
    label,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    style,
    ...props
  }: SwitchProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [checked = false, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked,
  });

  const accessibilityProps = useMemo(() => {
    if (ariaLabel) {
      return { 'aria-label': ariaLabel };
    }
    if (ariaLabelledby) {
      return { 'aria-labelledby': ariaLabelledby };
    }
    if (label) {
      return { 'aria-label': label };
    }
    return {};
  }, [ariaLabel, ariaLabelledby, label]);

  const cssVariables = useMemo(() => {
    const sizeConfig = SWITCH_SIZES[size];
    const translateDistance = sizeConfig.width - sizeConfig.thumbSize;

    return {
      '--switch-translate-distance': `${translateDistance}px`,
    } as CSSProperties;
  }, [size]);

  const combinedStyle = {
    ...cssVariables,
    ...style,
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      setChecked((prev) => !prev);
    }
    onKeyDown?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.(e);
  };

  return (
    <label className={clsx(styles.wrapper, className)} data-disabled={disabled} style={combinedStyle}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-checked={checked}
        {...accessibilityProps}
        {...props}
      />

      <span className={styles.track({ size })} data-checked={checked} data-disabled={disabled} aria-hidden="true">
        <span className={styles.thumb({ size })} data-checked={checked} />
      </span>

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});

Switch.displayName = 'Switch';
