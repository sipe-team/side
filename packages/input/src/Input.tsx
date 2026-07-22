import { Children, type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import cx from 'clsx';

import { defaultFontSize, inputAction, inputElement, inputElementWithAction, inputWrapper } from './Input.css';

// TODO(design): fontSize API naming (px vs sm/md/lg) — pending designer sync
export type InputFontSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 48;

// TODO(design): confirm with design whether to expose fontWeight as a prop; currently fixed to regular
type AllowedInputTypes = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
type InputFieldElement = ElementRef<'input'>;

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  type?: AllowedInputTypes;
  fontSize?: InputFontSize;
}

const Input = forwardRef<InputFieldElement, InputProps>((props, forwardedRef) => {
  const { children, type = 'text', fontSize = defaultFontSize, className, name, ...inputProps } = props;
  const hasAction = Children.count(children) > 0;

  return (
    <span role="presentation" className={cx(inputWrapper({ fontSize }), className)}>
      <input
        name={name}
        type={type}
        spellCheck="false"
        ref={forwardedRef}
        className={cx(inputElement, hasAction && inputElementWithAction)}
        {...inputProps}
      />
      {children}
    </span>
  );
});
Input.displayName = 'Input';

type InputFieldActionElement = ElementRef<'button'>;
type InputFieldActionType = 'button' | 'reset';

interface InputFieldActionProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type'> {
  asChild?: boolean;
  type?: InputFieldActionType;
}

const InputFieldAction = forwardRef<InputFieldActionElement, InputFieldActionProps>((props, forwardedRef) => {
  const { className, asChild, type, ...slotProps } = props;

  const Comp = asChild ? Slot : 'button';
  return <Comp ref={forwardedRef} className={cx(inputAction, className)} type={type} {...slotProps} />;
});
InputFieldAction.displayName = 'Input.Action';

export type { InputFieldActionProps as SlotProps, InputProps };
export { Input, InputFieldAction as Action };
