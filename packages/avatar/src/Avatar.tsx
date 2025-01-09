import { Slot } from "@radix-ui/react-slot";
import { clsx as cx } from "clsx";
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
} from "react";
import styles from "./Avatar.module.css";

/**
+ * Avatar 컴포넌트의 크기 옵션
+ * @type {AvatarSize}
+ * - xs: 24px
+ * - sm: 32px
+ * - md: 40px (기본값)
+ * - lg: 70px
+ * - xl: 96px
+ */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
+ * Avatar 컴포넌트의 모양 옵션
+ * @type {AvatarShape}
+ * - circle: 원형 (50% border-radius)
+ * - rounded: 둥근 모서리 (4px border-radius)
+ * - square: 정사각형 (0px border-radius)
+ */
export type AvatarShape = "circle" | "rounded" | "square";

export interface AvatarProps extends ComponentProps<"div"> {
  asChild?: boolean;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  fallback?: string;
}

export const Avatar = forwardRef(function Avatar(
  {
    asChild,
    className,
    src,
    alt,
    size = "md",
    shape = "circle",
    fallback,
    ...props
  }: AvatarProps,
  ref: ForwardedRef<any>
) {
  const Component = asChild ? Slot : "div";

  const style = {
    ...props.style,
    width: getAvatarSize(size),
    height: getAvatarSize(size),
    borderRadius: getAvatarShape(shape),
  } as CSSProperties;

  return (
    <Component
      className={cx(styles.avatar, className)}
      ref={ref}
      style={style}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          onError={(e) => {
            if (fallback) e.currentTarget.src = fallback;
          }}
          className={styles.image}
        />
      ) : (
        <span className={styles.fallback}>{alt || fallback}</span>
      )}
    </Component>
  );
});

function getAvatarSize(size: AvatarSize) {
  switch (size) {
    case "xs":
      return "24px";
    case "sm":
      return "32px";
    case "md":
      return "40px";
    case "lg":
      return "70px";
    case "xl":
      return "96px";
    default:
      return "40px";
  }
}

function getAvatarShape(shape: AvatarShape) {
  switch (shape) {
    case "rounded":
      return "4px";
    case "square":
      return "0px";
    default:
      return "50%";
  }
}
