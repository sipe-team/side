import {
  type ComponentProps,
  type CSSProperties,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  useId,
  useImperativeHandle,
} from 'react';
import { createPortal } from 'react-dom';

import { Slot } from '@radix-ui/react-slot';

import clsx from 'clsx';

import { useTooltip } from './hooks/useTooltip';
import * as styles from './Tooltip.css';

export const TooltipPosition = {
  'top-left': 'top-left',
  top: 'top',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  bottom: 'bottom',
  'bottom-right': 'bottom-right',
  left: 'left',
  right: 'right',
} as const;
export type TooltipPosition = (typeof TooltipPosition)[keyof typeof TooltipPosition];

export const TooltipTrigger = {
  hover: 'hover',
  click: 'click',
} as const;
export type TooltipTrigger = (typeof TooltipTrigger)[keyof typeof TooltipTrigger];

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
    placement: placementProp = TooltipPosition.top,
    trigger = TooltipTrigger.hover,
    asChild = true,
    children,
    tooltipStyle,
    tooltipClassName,
    gap = 8,
  }: TooltipProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const tooltipId = useId();
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
        aria-describedby={isVisible ? tooltipId : undefined}
        aria-expanded={trigger === TooltipTrigger.click ? isVisible : undefined}
        onMouseEnter={trigger === TooltipTrigger.hover ? () => toggleTooltip(true) : undefined}
        onMouseLeave={trigger === TooltipTrigger.hover ? () => toggleTooltip(false) : undefined}
        onFocus={trigger === TooltipTrigger.hover ? () => toggleTooltip(true) : undefined}
        onBlur={trigger === TooltipTrigger.hover ? () => toggleTooltip(false) : undefined}
        onClick={trigger === TooltipTrigger.click ? () => toggleTooltip(!isVisible) : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={styles.button}
      >
        {children}
      </Component>
      {isVisible &&
        createPortal(
          <div
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            className={clsx(styles.tooltip({ placement: placementProp }), tooltipClassName, isVisible && 'visible')}
            style={
              {
                ...tooltipStyles,
                ...tooltipStyle,
                '--tooltip-bg-color': tooltipStyle?.backgroundColor || '#000000',
              } as CSSProperties
            }
          >
            {tooltipContent}
          </div>,
          document.body,
        )}
    </>
  );
});
