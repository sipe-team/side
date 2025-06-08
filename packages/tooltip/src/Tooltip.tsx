import { Slot } from '@radix-ui/react-slot';

import clsx from 'clsx';
import {
  type ComponentProps,
  type CSSProperties,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  useImperativeHandle,
} from 'react';
import { createPortal } from 'react-dom';
import { useTooltip } from './hooks/useTooltip';
import * as styles from './Tooltip.css';

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
    placement: placementProp = 'top',
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
    placement: placementProp,
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
        className={styles.button}
      >
        {children}
      </Component>
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={clsx(styles.tooltip, styles.placement[placementProp], tooltipClassName, isVisible && 'visible')}
            style={{ ...tooltipStyles, ...tooltipStyle }}
          >
            {tooltipContent}
          </div>,
          document.body,
        )}
    </>
  );
});
