import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import cx from 'clsx';

import { defaultFontSize, defaultFontWeight, inputAction, inputElement, inputWrapper, type weight } from './Input.css';

export type InputFontSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 48;
export type InputFontWeight = keyof typeof weight;
type AllowedInputTypes = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
type InputFieldElement = ElementRef<'input'>;

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  type?: AllowedInputTypes;
  fontSize?: InputFontSize;
  fontWeight?: InputFontWeight;
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
    <div role="presentation" className={cx(inputWrapper({ fontSize, fontWeight }), className)}>
      <input name={name} type={type} spellCheck="false" ref={forwardedRef} className={inputElement} {...inputProps} />
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
  return <Comp ref={forwardedRef} className={cx(inputAction, className)} type={type} {...slotProps} />;
});
InputFieldAction.displayName = 'Input.Action';

export { InputFieldAction as Action, Input };
export type { InputProps, InputFieldActionProps as SlotProps };
