import { useEffect, useState } from 'react';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { calculateTooltipPosition } from './hooks/useTooltip/useTooltip';
import { Tooltip, type TooltipPosition } from './Tooltip';

describe('Tooltip basic behavior', () => {
  test('Tooltip should not be visible in the initial state.', () => {
    render(
      <Tooltip tooltipContent="Test Tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    expect(screen.queryByText('Test Tooltip')).not.toBeInTheDocument();
  });

  test('Tooltip is not rendered when tooltipContent is not provided.', () => {
    render(
      <Tooltip tooltipContent={null}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    expect(screen.queryByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('Tooltip appears on mouse enter and disappears on mouse leave.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');

    await userEvent.hover(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument());
  });

  test('Tooltip appears on keyboard focus and disappears on blur.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');

    await act(async () => trigger.focus());
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await act(async () => trigger.blur());
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('Tooltip stays visible when mouse moves from trigger to tooltip content.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');

    await userEvent.hover(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.unhover(trigger);
    const tooltip = screen.getByRole('tooltip');
    await userEvent.hover(tooltip);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();
  });

  test('Tooltip closes when clicking outside.', async () => {
    render(
      <div>
        <Tooltip tooltipContent="This is a tooltip">
          <button type="button">Hover me</button>
        </Tooltip>
        <button type="button">Outside</button>
      </div>,
    );

    const trigger = screen.getByText('Hover me');
    const outside = screen.getByText('Outside');

    await userEvent.hover(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.click(outside);
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('Tooltip closes on Escape key.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });
});

describe('Tooltip controlled mode', () => {
  test('Tooltip is controlled by open prop.', async () => {
    const ControlledTooltip = () => {
      const [open, setOpen] = useState(false);
      return (
        <Tooltip
          tooltipContent="This is a tooltip"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          disableHoverListener
          disableFocusListener
        >
          <button type="button" onClick={() => setOpen((v) => !v)}>
            Click me
          </button>
        </Tooltip>
      );
    };

    render(<ControlledTooltip />);
    const trigger = screen.getByText('Click me');

    fireEvent.click(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('onOpen and onClose callbacks are called on hover.', async () => {
    const ControlledTooltip = () => {
      const [open, setOpen] = useState(false);
      return (
        <Tooltip
          tooltipContent="This is a tooltip"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <button type="button">Hover me</button>
        </Tooltip>
      );
    };

    render(<ControlledTooltip />);
    const trigger = screen.getByText('Hover me');

    await userEvent.hover(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument());
  });
});

describe('Tooltip listener controls', () => {
  test('Tooltip does not appear on hover when disableHoverListener is true.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" disableHoverListener>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('Tooltip does not appear on focus when disableFocusListener is true.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" disableFocusListener>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await act(async () => trigger.focus());
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('Tooltip still appears on focus when only disableHoverListener is true.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" disableHoverListener>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await act(async () => trigger.focus());
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();
  });
});

describe('Tooltip placement', () => {
  test('Tooltip renders at the top position by default.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    const tooltip = await screen.findByText('This is a tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.className).toContain('top');
  });

  test.each([
    ['top-left'],
    ['top'],
    ['top-right'],
    ['bottom-left'],
    ['bottom'],
    ['bottom-right'],
    ['left'],
    ['right'],
  ])('Tooltip renders correctly at %s position.', async (placement) => {
    render(
      <Tooltip tooltipContent="Tooltip content" placement={placement as TooltipPosition}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    await userEvent.hover(trigger);

    const tooltip = await screen.findByText('Tooltip content');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.className).toContain(placement as string);
  });
});

describe('Tooltip accessibility', () => {
  test('role="tooltip" attribute is included to ensure accessibility.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    await userEvent.hover(screen.getByText('Hover me'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  test('trigger element has aria-describedby linked to the tooltip id.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const triggerEl = screen.getByText('Hover me');
    await userEvent.hover(triggerEl);

    const tooltip = screen.getByRole('tooltip');
    const wrapper = triggerEl.closest('[aria-describedby]') ?? triggerEl.parentElement;
    expect(wrapper?.getAttribute('aria-describedby')).toBe(tooltip.id);
    expect(tooltip.id).toBeTruthy();
  });
});

describe('Tooltip style', () => {
  test('backgroundColor and padding injected via props are reflected in CSS variables.', async () => {
    render(
      <Tooltip tooltipContent="Styled Tooltip" tooltipStyle={{ backgroundColor: 'red', padding: '20px' }}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    await userEvent.hover(screen.getByText('Hover me'));

    const tooltip = screen.getByText('Styled Tooltip');
    expect(tooltip).toHaveStyle('background-color: red');
    expect(tooltip).toHaveStyle('padding: 20px');
  });

  test('Tooltip does not overflow upward when the trigger is near the top of the screen.', () => {
    const { top } = calculateTooltipPosition({
      wrapperRect: { top: 5, bottom: 35, left: 100, right: 200, width: 100, height: 30 } as DOMRect,
      tooltipRect: { top: 0, left: 0, bottom: 0, right: 0, width: 100, height: 50 } as DOMRect,
      placement: 'top',
      gap: 8,
    });

    expect(top).toBeGreaterThanOrEqual(8);
  });

  test('Tooltip does not overflow downward when the trigger is near the bottom of the screen.', () => {
    const { top } = calculateTooltipPosition({
      wrapperRect: {
        top: window.innerHeight - 10,
        bottom: window.innerHeight,
        left: 100,
        right: 200,
        width: 100,
        height: 10,
      } as DOMRect,
      tooltipRect: { top: 0, left: 0, bottom: 0, right: 0, width: 100, height: 50 } as DOMRect,
      placement: 'bottom',
      gap: 8,
    });

    expect(top).toBeLessThanOrEqual(window.innerHeight - 50 - 8);
  });

  test('Tooltip does not overflow to the left when the trigger is near the left edge of the screen.', () => {
    const { left } = calculateTooltipPosition({
      wrapperRect: { top: 100, bottom: 130, left: 5, right: 55, width: 50, height: 30 } as DOMRect,
      tooltipRect: { top: 0, left: 0, bottom: 0, right: 0, width: 150, height: 40 } as DOMRect,
      placement: 'left',
      gap: 8,
    });

    expect(left).toBeGreaterThanOrEqual(8);
  });

  test('Long text wraps within the tooltip container.', async () => {
    render(
      <Tooltip
        tooltipContent="This is a very long tooltip text that should wrap within the tooltip container to avoid overflowing the screen."
        tooltipStyle={{ maxWidth: '150px' }}
      >
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    await userEvent.hover(screen.getByText('Hover me'));

    const tooltip = screen.getByText(/This is a very long tooltip text/);
    expect(tooltip).toHaveStyle('max-width: 150px');
    expect(tooltip).toHaveStyle('white-space: normal');
  });
});

test('Tooltip updates with async data.', async () => {
  let resolveContent!: (value: string) => void;

  const AsyncTooltip = () => {
    const [content, setContent] = useState('Loading...');
    useEffect(() => {
      new Promise<string>((resolve) => {
        resolveContent = resolve;
      }).then((data) => setContent(data));
    }, []);

    return (
      <Tooltip tooltipContent={content}>
        <button type="button">Hover me</button>
      </Tooltip>
    );
  };

  render(<AsyncTooltip />);

  await userEvent.hover(screen.getByText('Hover me'));
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await act(async () => {
    resolveContent('Fetched Content');
  });

  expect(screen.getByText('Fetched Content')).toBeInTheDocument();
});

describe('Tooltip asChild prop', () => {
  test('asChild defaults to true and preserves the child element tag.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <h1>Hover me</h1>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');
    expect(childElement).toHaveProperty('tagName', 'H1');

    await userEvent.hover(childElement);
    expect(await screen.findByText('This is a tooltip')).toBeInTheDocument();
  });

  test('When asChild is false, the child is wrapped in a default div.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" asChild={false}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');
    expect(childElement.parentElement?.tagName).toBe('DIV');

    await userEvent.hover(childElement);
    expect(await screen.findByText('This is a tooltip')).toBeInTheDocument();
  });
});
