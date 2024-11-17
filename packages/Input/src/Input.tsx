import classNames from 'classnames';
import { forwardRef, useRef, type ComponentPropsWithoutRef, type CSSProperties, type ElementRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { composeRefs } from './utils/compose-refs';

import { colors } from './constants/colors';
import { spacing } from './constants/spacing';
import { Weight, type FontSize, type FontWeight } from './constants/typhography';
import styles from './Input.module.css';

type AllowedInputTypes = "email" | "password" | "search" | "tel" | "text" | "url"
type InputFieldElement = ElementRef<'input'>;
interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  type?: AllowedInputTypes
  fontSize?: FontSize
  fontWeight?: FontWeight
}

const Input = forwardRef<InputFieldElement, InputProps>(
  (props, forwardedRef) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { children, type = 'text', fontWeight = 'regular' , fontSize = 16 ,className, name, style, ...inputProps} = props
    
    return (
      <div
        role={`${name ?? 'input'}-wrapper`}
        className={classNames(styles['input-wrapper'], className)}
        style={{
          '--input-padding': `${spacing.defaultInputPadding}`,    
          '--input-border-radius': `${spacing.defaultBorderRadius}`,
          '--input-ring-color': `${colors.defaultInputOutline}`,
          '--input-disabled-color': `${colors.disabledBackground}`,
          '--action-size': `${spacing.defaultActionSize}`,
        } as CSSProperties}
      >
        <input
          name={name}
          type={type}
          spellCheck="false"
          ref={composeRefs(inputRef, forwardedRef)}
          className={styles['input']}
          style={{
          '--font-size': `${fontSize}px`,
          '--font-weight': `${Weight[fontWeight]}`,
          ...style
          }as CSSProperties}
          {...inputProps}
        />
        {children}
      </div>
    );
  }
);
Input.displayName = 'Input';


// * ****************************************
// *               Input Action
// * ****************************************

type InputFieldActionElement = ElementRef<'button'>;
type InputFieldActionType = 'button' | 'reset'

interface InputFieldActionProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type'> {
  asChild?: boolean;
  type?: InputFieldActionType
}
    
const InputFieldAction = forwardRef<InputFieldActionElement, InputFieldActionProps>(
  (props, forwardedRef) => {
    const { className, asChild, type = 'button',  ...slotProps } = props;

    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
      ref={forwardedRef}
      className={classNames(styles['input-action'], className)}
      {...slotProps}
      />
    );
  }
);
InputFieldAction.displayName = 'Input.Action';


export {
  InputFieldAction as Action, Input
};

  export type {
    InputProps,
    InputFieldActionProps as SlotProps
  };

