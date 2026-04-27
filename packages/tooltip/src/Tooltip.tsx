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

export interface TooltipProps extends ComponentProps<'div'> {
  tooltipContent: ReactNode;
  placement?: TooltipPosition;
  asChild?: boolean;
  tooltipStyle?: CSSProperties;
  tooltipClassName?: string;
  gap?: number;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
}

export const Tooltip = forwardRef(function Tooltip(
  {
    tooltipContent,
    placement: placementProp = TooltipPosition.top,
    asChild = true,
    children,
    tooltipStyle,
    tooltipClassName,
    gap = 8,
    open,
    onOpen,
    onClose,
    disableHoverListener = false,
    disableFocusListener = false,
  }: TooltipProps,
  ref: ForwardedRef<HTMLElement>,
) {
  const tooltipId = useId();
  const { isVisible, tooltipStyles, wrapperRef, tooltipRef, triggerHandlers, tooltipHandlers } = useTooltip({
    placement: placementProp,
    gap,
    ...(open !== undefined && { open }),
    ...(onOpen !== undefined && { onOpen }),
    ...(onClose !== undefined && { onClose }),
    disableHoverListener,
    disableFocusListener,
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
        tabIndex={disableFocusListener ? undefined : 0}
        className={asChild ? undefined : styles.button}
        {...triggerHandlers}
      >
        {children}
      </Component>
      {isVisible &&
        createPortal(
          <div
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            className={clsx(styles.tooltip({ placement: placementProp }), tooltipClassName)}
            style={
              {
                ...tooltipStyles,
                ...tooltipStyle,
                '--tooltip-bg-color': tooltipStyle?.backgroundColor,
              } as CSSProperties
            }
            {...tooltipHandlers}
          >
            {tooltipContent}
          </div>,
          document.body,
        )}
    </>
  );
});
