import { Slot } from '@radix-ui/react-slot';
import { clsx as cx } from 'clsx';
import {
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
  forwardRef,
} from 'react';
import { match } from 'ts-pattern';
import styles from './Button.module.css';

type ButtonColor = 'primary' | 'black' | 'white';

type ButtonVariant = 'filled' | 'outline' | 'weak';

export interface ButtonProps extends ComponentProps<'button'> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      color = 'primary',
      variant = 'filled',
      asChild,
      disabled,
      className: _className,
      style: _style,
      children,
      ...rest
    },
    ref,
  ) {
    const Comp = asChild ? Slot : 'button';
    const className = cx(
      styles.button,
      { [styles.disabled]: disabled },
      _className,
    );
    const style = {
      ..._style,
      ...getButtonStyle({ color, variant }),
    } as CSSProperties;

    return (
      <Comp
        ref={ref}
        className={className}
        style={style}
        disabled={disabled}
        {...rest}
      >
        {children}
      </Comp>
    );
  },
);

function getButtonStyle({
  color,
  variant,
}: { color: ButtonColor; variant: ButtonVariant }) {
  const primaryColor = '#00ffff';
  const blackColor = 'black';
  const whiteColor = 'white';
  const transparentColor = 'transparent';

  const backgroundColor = match([color, variant])
    .with(['primary', 'filled'], () => primaryColor)
    .with(['black', 'filled'], () => blackColor)
    .with(['white', 'filled'], () => whiteColor)
    .otherwise(() => transparentColor);
  const border = match([color, variant])
    .with(['primary', 'outline'], () => `1px solid ${primaryColor}`)
    .with(['black', 'outline'], () => `1px solid ${blackColor}`)
    .with(['white', 'outline'], () => `1px solid ${whiteColor}`)
    .otherwise(() => 'none');
  const fontColor = match([color, variant])
    .with(['primary', 'filled'], () => blackColor)
    .with(['primary', 'outline'], ['primary', 'weak'], () => primaryColor)
    .with(['black', 'filled'], () => whiteColor)
    .with(['black', 'outline'], ['black', 'weak'], () => blackColor)
    .with(['white', 'filled'], () => blackColor)
    .with(['white', 'outline'], ['white', 'weak'], () => whiteColor)
    .exhaustive();
  const hoverBackgroundColor = match([color, variant])
    .with(['primary', 'filled'], () => '#00d2d2')
    .with(['primary', 'outline'], ['primary', 'weak'], () => primaryColor)
    .with(['black', 'filled'], () => '#2d3748')
    .with(['black', 'outline'], ['black', 'weak'], () => blackColor)
    .with(['white', 'filled'], () => '#cbd5e0')
    .with(['white', 'outline'], ['white', 'weak'], () => whiteColor)
    .exhaustive();
  const hoverFontColor = match([color, variant])
    .with(['primary', 'filled'], ['primary', 'outline'], () => blackColor)
    .with(['primary', 'weak'], () => primaryColor)
    .with(['black', 'filled'], ['black', 'outline'], () => whiteColor)
    .with(['black', 'weak'], () => blackColor)
    .with(['white', 'filled'], ['white', 'outline'], () => blackColor)
    .with(['white', 'weak'], () => whiteColor)
    .exhaustive();
  const hoverOpacity = variant === 'weak' ? 0.1 : 1;

  return {
    '--background-color': backgroundColor,
    '--border': border,
    '--color': fontColor,
    '--hover-background-color': hoverBackgroundColor,
    '--hover-color': hoverFontColor,
    '--hover-opacity': hoverOpacity,
  };
}
