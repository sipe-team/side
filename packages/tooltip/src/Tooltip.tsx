import { Slot } from '@radix-ui/react-slot';

import clsx from 'clsx';
import {
  type CSSProperties,
  type ComponentProps,
  type ForwardedRef,
  type ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.css';
import { useTooltip } from './hooks/useTooltip';

export type TooltipPosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'left'
  | 'right';

export type TooltipTrigger = 'hover' | 'click';

export interface TooltipProps extends ComponentProps<'div'> {
  tooltipContent: ReactNode;
  placement?: TooltipPosition;
  asChild?: boolean;
  trigger?: TooltipTrigger;
  tooltipStyle?: CSSProperties;
  tooltipClassName?: string;
  gap?: number;
}

export const Tooltip = forwardRef(function Tooltip(
  {
    tooltipContent,
    placement = 'top',
    trigger = 'hover',
    asChild = true,
    children,
    tooltipStyle,
    tooltipClassName,
    gap = 8,
  }: TooltipProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const { isVisible, toggleTooltip, tooltipStyles, wrapperRef, tooltipRef, handleKeyDown } = useTooltip({
    placement,
    gap,
    trigger,
  });

  useImperativeHandle(ref, () => wrapperRef.current as HTMLElement);

  if (!tooltipContent) {
    return <>{children}</>;
  }

  const Component = asChild ? Slot : 'div';

  return (
    <>
      <Component
        ref={wrapperRef}
        role="tooltip"
        onMouseEnter={trigger === 'hover' ? () => toggleTooltip(true) : undefined}
        onMouseLeave={trigger === 'hover' ? () => toggleTooltip(false) : undefined}
        onClick={trigger === 'click' ? () => toggleTooltip(!isVisible) : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={trigger === 'click' ? 0 : undefined}
        className={clsx(styles.trigger, { [styles.asChild]: asChild })}
      >
        {children}
      </Component>
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={clsx(styles.tooltip, styles[placement], tooltipClassName, { [styles.visible]: isVisible })}
            style={{ ...tooltipStyles, ...tooltipStyle }}
          >
            {tooltipContent}
          </div>,
          document.body,
        )}
    </>
  );
});
