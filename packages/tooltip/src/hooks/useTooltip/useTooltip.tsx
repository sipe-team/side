import {
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { TooltipPosition, TooltipTrigger } from '../../Tooltip';

interface useTooltipProps {
  placement: TooltipPosition;
  gap: number;
  trigger: TooltipTrigger;
}

export function useTooltip({ placement, gap, trigger }: useTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState<CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    return () => {};
  }, [isVisible]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleGlobalKeyDown);
      return () => {
        document.removeEventListener('keydown', handleGlobalKeyDown);
      };
    }

    return () => {};
  }, [isVisible]);

  const handlePosition = () => {
    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;

    if (!wrapper || !tooltip) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const { top, left } = calculateTooltipPosition({
      wrapperRect,
      tooltipRect,
      placement,
      gap,
    });

    setTooltipStyles({
      top: `${top}px`,
      left: `${left}px`,
      position: 'fixed',
    });
  };

  const toggleTooltip = (visible: boolean) => {
    setIsVisible(visible);
    if (visible) {
      requestAnimationFrame(handlePosition);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;

    if (
      wrapper &&
      !wrapper.contains(event.target as Node) &&
      tooltip &&
      !tooltip.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (
      (event.code === 'Enter' || event.code === 'space') &&
      trigger === 'click'
    ) {
      event.preventDefault();
      toggleTooltip(!isVisible);
    }
  };

  return {
    isVisible,
    toggleTooltip,
    tooltipStyles,
    wrapperRef,
    tooltipRef,
    handleKeyDown,
  };
}

interface CalculateTooltipPositionParams {
  wrapperRect: DOMRect;
  tooltipRect: DOMRect;
  placement: TooltipPosition;
  gap: number;
}
function calculateTooltipPosition({
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

  top = Math.max(
    gap,
    Math.min(top, window.innerHeight - tooltipRect.height - gap),
  );
  left = Math.max(
    gap,
    Math.min(left, window.innerWidth - tooltipRect.width - gap),
  );

  return { top, left };
}
