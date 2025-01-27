import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import { type CSSProperties, type ComponentProps, type ReactNode, useEffect, useId, useRef } from 'react';

import styles from './Checkbox.module.css';
import { type CheckStyleConfig, DEFAULT_CHECK_STYLE } from './constants/checkStyle';
import { CHECKBOX_SIZES, type CheckboxSize } from './constants/size';

export interface CheckboxProps extends ComponentProps<'div'> {
  name?: string;
  value?: string;
  size?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
  asChild?: boolean;
  innerRef?: React.RefObject<HTMLDivElement>;
  children?: ReactNode;
  checkStyleConfig?: Partial<CheckStyleConfig>;
}

export const Checkbox = ({
  className,
  name,
  value,
  label,
  asChild = true,
  size = 'medium',
  checked,
  indeterminate = false,
  disabled = false,
  onCheckedChange,
  children,
  style: _style,
  innerRef,
  checkStyleConfig = {},
  ...props
}: CheckboxProps) => {
  const localRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const Component = asChild ? Slot : 'div';

  const handleChange = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const sizeConfig = CHECKBOX_SIZES[size];
  const mergedStyleConfig = { ...DEFAULT_CHECK_STYLE, ...checkStyleConfig };

  const style = {
    '--checkbox-size': `${sizeConfig.checkboxSize}px`,
    '--label-size': `${sizeConfig.labelSize}px`,
    '--checkbox-padding': `${sizeConfig.padding}px`,
    '--checkbox-margin': `${sizeConfig.margin}px`,
    '--border-radius': `${mergedStyleConfig.borderRadius}px`,
    '--border-width': `${mergedStyleConfig.borderWidth}px`,
    '--border-color': mergedStyleConfig.borderColor,
    '--background-color': mergedStyleConfig.backgroundColor,
    '--checked-color': mergedStyleConfig.checkedColor,
    '--disabled-color': mergedStyleConfig.disabledColor,
    '--hover-color': mergedStyleConfig.hoverColor,
    '--checked-icon': `url(${mergedStyleConfig.checkedIcon})`,
    '--indeterminate-icon': `url(${mergedStyleConfig.indeterminateIcon})`,
    '--background-size': mergedStyleConfig.backgroundSize,
    '--background-position': mergedStyleConfig.backgroundPosition,
    '--background-repeat': mergedStyleConfig.backgroundRepeat,
    ..._style,
  } as CSSProperties;

  if (!label && children) {
    return <>{children}</>;
  }

  const content = (
    <div
      className={cx(
        styles.checkbox,
        {
          [styles.indeterminate]: indeterminate,
          [styles.disabled]: disabled,
        },
        className,
      )}
      style={style}
      {...props}
    >
      <input
        ref={inputRef}
        type="checkbox"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles['checkbox-input']}
      />
      {label && (
        <label htmlFor={inputId} className={styles['checkbox-label']} style={{ fontSize: sizeConfig.labelSize }}>
          {label}
        </label>
      )}
    </div>
  );

  return asChild ? <Component ref={localRef}>{content}</Component> : content;
};
