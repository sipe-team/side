import { type CSSProperties, type ComponentProps, type PropsWithChildren, useContext } from 'react';
import { RadioGroupContext } from './RadioGroup';
import styles from './RadioGroup.module.css';

type RadioProps = PropsWithChildren<
  ComponentProps<'input'> & {
    size?: 'small' | 'medium' | 'large';
  }
>;

export function Radio({ value, defaultChecked, disabled = false, children }: RadioProps) {
  const groupContext = useContext(RadioGroupContext);

  const sizeMap = {
    small: '12px',
    medium: '16px',
    large: '20px',
  };

  const style = {
    width: sizeMap[groupContext.size ?? 'medium'],
    height: sizeMap[groupContext.size ?? 'medium'],
  } as CSSProperties;

  return (
    <label className={styles.radioContainer}>
      <input
        className={styles.radioIndicator}
        type="radio"
        value={value}
        name={groupContext.name}
        defaultChecked={groupContext.defaultValue === value || defaultChecked}
        disabled={groupContext.disabled || disabled}
        checked={groupContext.value !== undefined ? groupContext.value === value : undefined}
        onChange={(e) => groupContext.onChangeValue?.(e.target.value)}
        style={style}
      />
      <span className={styles.radioLabelText}>{children}</span>
    </label>
  );
}
