import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import type { TooltipPosition } from '../../Tooltip';

interface UseTooltipProps {
  placement: TooltipPosition;
  gap: number;
  closeDelay?: number;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  disableHoverListener?: boolean;
}

export function useTooltip({
  placement,
  gap,
  closeDelay = 150,
  open: controlledOpen,
  onOpen,
  onClose,
  disableHoverListener = false,
}: UseTooltipProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isVisible = isControlled ? controlledOpen : internalOpen;

  const [tooltipStyles, setTooltipStyles] = useState<CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // latest-ref pattern: always call the most recent callback without adding to deps
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // setInternalOpen is a no-op visually in controlled mode (isVisible = controlledOpen)
  const requestOpen = useCallback(() => {
    clearCloseTimer();
    setInternalOpen(true);
    onOpenRef.current?.();
  }, [clearCloseTimer]);

  const requestClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setInternalOpen(false);
      onCloseRef.current?.();
    }, closeDelay);
  }, [clearCloseTimer, closeDelay]);

  const requestCloseImmediate = useCallback(() => {
    clearCloseTimer();
    setInternalOpen(false);
    onCloseRef.current?.();
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const wrapper = wrapperRef.current;
      const tooltip = tooltipRef.current;

      if (wrapper && !wrapper.contains(event.target as Node) && tooltip && !tooltip.contains(event.target as Node)) {
        requestCloseImmediate();
      }
    };

    if (isVisible) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, requestCloseImmediate]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') requestCloseImmediate();
    };

    if (isVisible) document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isVisible, requestCloseImmediate]);

  useEffect(() => {
    if (!isVisible) return;

    let rafId: number;

    const handlePosition = () => {
      const wrapper = wrapperRef.current;
      const tooltip = tooltipRef.current;

      if (!wrapper || !tooltip) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const { top, left } = calculateTooltipPosition({ wrapperRect, tooltipRect, placement, gap });

      setTooltipStyles({ top: `${top}px`, left: `${left}px` });
    };

    const scheduleHandlePosition = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handlePosition);
    };

    handlePosition();
    window.addEventListener('scroll', scheduleHandlePosition, true);
    window.addEventListener('resize', scheduleHandlePosition);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleHandlePosition, true);
      window.removeEventListener('resize', scheduleHandlePosition);
    };
  }, [isVisible, gap, placement]);

  const triggerHandlers = {
    ...(!disableHoverListener && { onMouseEnter: requestOpen, onMouseLeave: requestClose }),
    onFocus: requestOpen,
    onBlur: requestCloseImmediate,
  };

  const tooltipHandlers = !disableHoverListener ? { onMouseEnter: requestOpen, onMouseLeave: requestClose } : {};

  return {
    isVisible,
    tooltipStyles,
    wrapperRef,
    tooltipRef,
    triggerHandlers,
    tooltipHandlers,
  };
}

interface CalculateTooltipPositionParams {
  wrapperRect: DOMRect;
  tooltipRect: DOMRect;
  placement: TooltipPosition;
  gap: number;
}
export function calculateTooltipPosition({
  wrapperRect,
  tooltipRect,
  placement,
  gap,
}: CalculateTooltipPositionParams): { top: number; left: number } {
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top-left':
      top = wrapperRect.top - tooltipRect.height - gap;
      left = wrapperRect.left;
      break;
    case 'top':
      top = wrapperRect.top - tooltipRect.height - gap;
      left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'top-right':
      top = wrapperRect.top - tooltipRect.height - gap;
      left = wrapperRect.right - tooltipRect.width;
      break;
    case 'bottom-left':
      top = wrapperRect.bottom + gap;
      left = wrapperRect.left;
      break;
    case 'bottom':
      top = wrapperRect.bottom + gap;
      left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'bottom-right':
      top = wrapperRect.bottom + gap;
      left = wrapperRect.right - tooltipRect.width;
      break;
    case 'left':
      top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
      left = wrapperRect.left - tooltipRect.width - gap;
      break;
    case 'right':
      top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
      left = wrapperRect.right + gap;
      break;
    default:
      console.error(`Invalid placement value: ${placement}`);
      return { top: 0, left: 0 };
  }

  top = Math.max(gap, Math.min(top, window.innerHeight - tooltipRect.height - gap));
  left = Math.max(gap, Math.min(left, window.innerWidth - tooltipRect.width - gap));

  return { top, left };
}
