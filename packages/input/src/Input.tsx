import { Children, type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import cx from 'clsx';

import { defaultFontSize, inputAction, inputField, inputFieldWithAction, inputWrapper } from './Input.css';

// TODO(design): fontSize API naming (px vs sm/md/lg) — pending designer sync
export type InputFontSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 48;

export const InputValidation = {
  default: 'default',
  error: 'error',
  success: 'success',
} as const;
export type InputValidation = (typeof InputValidation)[keyof typeof InputValidation];

// TODO(design): confirm with design whether to expose fontWeight as a prop; currently fixed to regular
type AllowedInputTypes = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
type InputFieldElement = ElementRef<'input'>;

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  type?: AllowedInputTypes;
  fontSize?: InputFontSize;
  /** Border-only validation state for FormField composition. Messages stay outside Input. */
  validation?: InputValidation;
}

const Input = forwardRef<InputFieldElement, InputProps>((props, forwardedRef) => {
  const {
    children,
    type = 'text',
    fontSize = defaultFontSize,
    validation = InputValidation.default,
    className,
    name,
    ...inputProps
  } = props;
  const hasAction = Children.count(children) > 0;

  return (
    <span role="presentation" className={cx(inputWrapper, className)}>
      <input
        name={name}
        type={type}
        spellCheck="false"
        ref={forwardedRef}
        className={cx(inputField({ fontSize, validation }), hasAction && inputFieldWithAction)}
        {...inputProps}
        aria-invalid={validation === InputValidation.error || inputProps['aria-invalid']}
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
