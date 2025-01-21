import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { color, fontSize } from '@sipe-team/tokens';
import { Typography } from '@sipe-team/typography';
import { Check } from 'lucide-react';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, useId, Children, isValidElement, cloneElement } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
    extends Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'asChild'> {
  label?: string;
  size?: CheckboxSize;
  value?: string;
}

export interface CheckboxGroupProps {
  children: React.ReactNode;
  defaultValue?: string[];
  name?: string;
  onChange?: (value: string[]) => void;
  value?: string[];
}

const getSizeStyles = (size: CheckboxSize) => {
  switch (size) {
    case 'sm':
      return {
        checkboxSize: '16px',
        indicatorSize: '12px',
        fontSize: fontSize[12],
        padding: '4px',
      };
    case 'lg':
      return {
        checkboxSize: '24px',
        indicatorSize: '18px',
        fontSize: fontSize[16],
        padding: '8px',
      };
    default:
      return {
        checkboxSize: '20px',
        indicatorSize: '14px',
        fontSize: fontSize[14],
        padding: '6px',
      };
  }
};

export const Checkbox = forwardRef<
    ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, size = 'md', label, style, id: providedId, ...props }, ref) => {
  const generatedId = useId();
  const id = providedId || generatedId;
  const { checkboxSize, indicatorSize, fontSize, padding } = getSizeStyles(size);

  return (
      <div
          className={styles.root}
          style={
            {
              '--margin': '4px',
              '--padding': padding,
              '--size': checkboxSize,
              '--indicator-size': indicatorSize,
              '--border-color': color.gray400,
              '--background-color': color.white,
              '--checked-border-color': color.cyan300,
              '--checked-background-color': color.cyan300,
              '--indicator-color': color.white,
              ...style,
            } as React.CSSProperties
          }
      >
        <CheckboxPrimitive.Root
            className={styles.checkbox}
            ref={ref}
            id={id}
            {...props}
        >
          <CheckboxPrimitive.Indicator className={styles.indicator}>
            <Check size={indicatorSize} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
            <Typography asChild size={fontSize}>
              <label htmlFor={id} className={styles.label}>
                {label}
              </label>
            </Typography>
        )}
      </div>
  );
});

Checkbox.displayName = 'Checkbox';

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
    ({ children, name, onChange, value }, ref) => {
      const handleCheckedChange = (checked: CheckboxPrimitive.CheckedState, itemValue: string | undefined) => {
        if (!onChange || !itemValue || typeof checked !== 'boolean') return;

        const newValues = checked
            ? [...(value || []), itemValue]
            : (value || []).filter((v) => v !== itemValue);

        onChange(newValues);
      };

      const mappedChildren = Children.map(children, (child) => {
        if (!isValidElement<CheckboxProps>(child)) return child;

        const checked = value?.includes(child.props.value || '') || false;

        return cloneElement(child, {
          checked,
          name,
          onCheckedChange: (state: CheckboxPrimitive.CheckedState) => {
            handleCheckedChange(state, child.props.value);
            child.props.onCheckedChange?.(state);
          },
        } as Partial<CheckboxProps>);
      });

      return (
          <div className={styles.group} ref={ref}>
            {mappedChildren}
          </div>
      );
    }
);

CheckboxGroup.displayName = 'CheckboxGroup';