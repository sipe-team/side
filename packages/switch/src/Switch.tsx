import clsx from 'clsx';
import { type CSSProperties, type ComponentProps, type ForwardedRef, forwardRef, useMemo } from 'react';
import * as styles from './Switch.css';
import { SWITCH_SIZES, SwitchSize } from './constants/size';
import useCheckedController from './hooks/useCheckedController';

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
    checked,
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
  const { checked: controlledChecked, onChange: controlledOnChange } = useCheckedController({
    defaultChecked,
    checked,
    onChange,
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
      const target = e.currentTarget.cloneNode(true) as HTMLInputElement;
      target.checked = !controlledChecked;

      const syntheticEvent = {
        ...e,
        target,
        currentTarget: target,
      } as unknown as React.KeyboardEvent<HTMLInputElement> & {
        target: HTMLInputElement;
        currentTarget: HTMLInputElement;
      };

      controlledOnChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    }

    onKeyDown?.(e);
  };

  return (
    <label className={clsx(styles.wrapper, className)} data-disabled={disabled} style={combinedStyle}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={controlledChecked}
        disabled={disabled}
        onChange={controlledOnChange}
        onKeyDown={handleKeyDown}
        aria-checked={controlledChecked}
        {...accessibilityProps}
        {...props}
      />

      <span
        className={styles.track({ size })}
        data-checked={controlledChecked}
        data-disabled={disabled}
        aria-hidden="true"
      >
        <span className={styles.thumb({ size })} data-checked={controlledChecked} />
      </span>

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});

Switch.displayName = 'Switch';
