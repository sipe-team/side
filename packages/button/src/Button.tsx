import { Slot } from "@radix-ui/react-slot";
import { clsx as cx } from "clsx";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { forwardRef } from "react";
import styles from "./Button.module.css";

type ButtonColor = "primary" | "black" | "white";

type ButtonVariant = "filled" | "outline" | "weak";

export interface ButtonProps extends ComponentProps<"button"> {
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
      color = "primary",
      variant = "filled",
      asChild,
      disabled,
      className,
      style: _style,
      children,
      ...rest
    },
    ref
  ) {
    const Comp = asChild ? Slot : "button";

    const commonClassName = cx(
      styles.button,
      styles[color],
      styles[variant],
      {
        [styles.disabled]: disabled,
      },
      className
    );

    const style = {
      ..._style,
      "--primary-color": "#00FFFF",
      "--black": "black",
      "--white": "white",
    } as CSSProperties;

    return (
      <Comp
        ref={ref}
        className={commonClassName}
        style={style}
        disabled={disabled}
        {...rest}
      >
        {children}
      </Comp>
    );
  }
);
