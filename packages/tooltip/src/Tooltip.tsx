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
import { useTooltip } from './hooks/useTooltip/useTooltip';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends ComponentProps<'div'> {
  tooltipContent: ReactNode;
  placement?: TooltipPosition;
  trigger?: 'hover' | 'click';
  tooltipStyle?: CSSProperties;
  tooltipClassName?: string;
  gap?: number;
}

export const Tooltip = forwardRef(function Tooltip(
  {
    tooltipContent,
    placement = 'top',
    trigger = 'hover',
    children,
    tooltipStyle,
    tooltipClassName,
    gap = 8,
  }: TooltipProps,
  ref: ForwardedRef<HTMLElement>,
) {
  if (!tooltipContent) {
    return <>{children}</>;
  }

  const {
    isVisible,
    toggleTooltip,
    tooltipStyles,
    wrapperRef,
    tooltipRef,
    handleKeyDown,
  } = useTooltip({ placement, gap, trigger });

  useImperativeHandle(ref, () => wrapperRef.current as HTMLElement);

  return (
    <div
      ref={wrapperRef}
      role="tooltip"
      className={styles.wrapper}
      onMouseEnter={trigger === 'hover' ? () => toggleTooltip(true) : undefined}
      onMouseLeave={
        trigger === 'hover' ? () => toggleTooltip(false) : undefined
      }
      onClick={
        trigger === 'click' ? () => toggleTooltip(!isVisible) : undefined
      }
      onKeyDown={handleKeyDown}
      tabIndex={trigger === 'click' ? 0 : undefined}
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={clsx(
              styles.tooltip,
              styles[placement],
              tooltipClassName,
              { [styles.visible]: isVisible },
            )}
            style={{ ...tooltipStyles, ...tooltipStyle }}
          >
            {tooltipContent}
          </div>,
          document.body,
        )}
    </div>
  );
});
