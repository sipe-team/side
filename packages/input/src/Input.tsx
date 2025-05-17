import { type ComponentPropsWithoutRef, type CSSProperties, type ElementRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';

import { colors } from './constants/colors';
import { spacing } from './constants/spacing';
import { defaultFontSize, defaultFontWeight, type FontSize, type FontWeight, Weight } from './constants/typhography';
import styles from './Input.module.css';

type AllowedInputTypes = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
type InputFieldElement = ElementRef<'input'>;
interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  type?: AllowedInputTypes;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
}

const Input = forwardRef<InputFieldElement, InputProps>((props, forwardedRef) => {
  const {
    children,
    type = 'text',
    fontWeight = defaultFontWeight,
    fontSize = defaultFontSize,
    className,
    name,
    ...inputProps
  } = props;

  return (
    <div
      role="presentation"
      className={classNames(styles['input-wrapper'], className)}
      style={
        {
          '--input-padding': `${spacing.defaultInputPadding}`,
          '--input-border-radius': `${spacing.defaultBorderRadius}`,
          '--input-ring-color': `${colors.defaultInputOutline}`,
          '--input-disabled-color': `${colors.disabledBackground}`,
          '--action-size': `${spacing.defaultActionSize}`,
          '--font-size': `${fontSize}px`,
          '--font-weight': `${Weight[fontWeight]}`,
        } as CSSProperties
      }
    >
      <input name={name} type={type} spellCheck="false" ref={forwardedRef} className={styles.input} {...inputProps} />
      {children}
    </div>
  );
});
Input.displayName = 'Input';

// * ****************************************
// *               Input Action
// * ****************************************

type InputFieldActionElement = ElementRef<'button'>;
type InputFieldActionType = 'button' | 'reset';

interface InputFieldActionProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type'> {
  asChild?: boolean;
  type?: InputFieldActionType;
}

const InputFieldAction = forwardRef<InputFieldActionElement, InputFieldActionProps>((props, forwardedRef) => {
  const { className, asChild, type = 'button', ...slotProps } = props;

  const Comp = asChild ? Slot : 'button';
  return (
    <Comp type={type} ref={forwardedRef} className={classNames(styles['input-action'], className)} {...slotProps} />
  );
});
InputFieldAction.displayName = 'Input.Action';

export { InputFieldAction as Action, Input };

export type { InputProps, InputFieldActionProps as SlotProps };
