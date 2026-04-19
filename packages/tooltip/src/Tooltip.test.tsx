import { useEffect, useState } from 'react';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { calculateTooltipPosition } from './hooks/useTooltip/useTooltip';
import { Tooltip, type TooltipPosition } from './Tooltip';

describe('Tooltip 기본 동작 테스트', () => {
  test('Tooltip은 초기 상태에서 보이지 않아야 한다.', () => {
    render(
      <Tooltip tooltipContent="Test Tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const tooltip = screen.queryByText('Test Tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  test('tooltipContent를 주입하지 않으면 Tooltip이 렌더링되지 않는다.', () => {
    render(
      <Tooltip tooltipContent={null}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.queryByText('Hover me');
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('hover 트리거일 경우 마우스를 올리면 Tooltip이 나타나고 이탈 시 사라진다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" trigger="hover">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');

    await userEvent.hover(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.unhover(trigger);
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('click 트리거일 경우 클릭하면 Tooltip이 표시되고 다시 클릭하면 사라진다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" trigger="click">
        <button type="button">Click me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Click me');

    await userEvent.click(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.click(trigger);
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('Tooltip 외부 클릭 시 닫힌다.', async () => {
    render(
      <div>
        <Tooltip tooltipContent="This is a tooltip" trigger="click">
          <button type="button">Click me</button>
        </Tooltip>
        <button type="button">Outside</button>
      </div>,
    );

    const trigger = screen.getByText('Click me');
    const outside = screen.getByText('Outside');

    await userEvent.click(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.click(outside);
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });
});

describe('Tooltip 위치 테스트', () => {
  test('Tooltip이 기본적으로 top 위치에 렌더링된다.', async () => {
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
  ])('Tooltip이 %s 위치에 올바르게 렌더링된다.', async (placement) => {
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

describe('Tooltip 접근성 테스트', () => {
  test('role="tooltip" 속성이 포함되어 접근성을 보장한다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  test('Esc 키를 누르면 Tooltip이 닫힌다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" trigger="click">
        <button type="button">Click me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Click me');

    await userEvent.click(trigger);
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('Space 키를 누르면 click 트리거 Tooltip이 열린다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" trigger="click">
        <button type="button">Click me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Click me');
    trigger.focus();

    await userEvent.keyboard(' ');
    expect(screen.getByText('This is a tooltip')).toBeInTheDocument();
  });

  test('trigger 요소에 aria-describedby가 있고 tooltip의 id와 연결된다.', async () => {
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

  test('click 트리거일 때 aria-expanded가 열림/닫힘 상태를 반영한다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" trigger="click">
        <button type="button">Click me</button>
      </Tooltip>,
    );

    const triggerEl = screen.getByText('Click me');

    expect(triggerEl).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(triggerEl);
    expect(triggerEl).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Tooltip 스타일 테스트', () => {
  test('props로 주입한 backgroundColor와 padding이 CSS 변수에 반영된다.', async () => {
    render(
      <Tooltip tooltipContent="Styled Tooltip" tooltipStyle={{ backgroundColor: 'red', padding: '20px' }}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    const tooltip = screen.getByText('Styled Tooltip');
    expect(tooltip).toHaveStyle('background-color: red');
    expect(tooltip).toHaveStyle('padding: 20px');
  });

  test('trigger가 화면 상단에 붙어있을 때 tooltip이 위로 벗어나지 않는다.', () => {
    const { top } = calculateTooltipPosition({
      wrapperRect: { top: 5, bottom: 35, left: 100, right: 200, width: 100, height: 30 } as DOMRect,
      tooltipRect: { top: 0, left: 0, bottom: 0, right: 0, width: 100, height: 50 } as DOMRect,
      placement: 'top',
      gap: 8,
    });

    expect(top).toBeGreaterThanOrEqual(8);
  });

  test('trigger가 화면 하단에 붙어있을 때 tooltip이 아래로 벗어나지 않는다.', () => {
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

  test('trigger가 화면 왼쪽에 붙어있을 때 tooltip이 왼쪽으로 벗어나지 않는다.', () => {
    const { left } = calculateTooltipPosition({
      wrapperRect: { top: 100, bottom: 130, left: 5, right: 55, width: 50, height: 30 } as DOMRect,
      tooltipRect: { top: 0, left: 0, bottom: 0, right: 0, width: 150, height: 40 } as DOMRect,
      placement: 'left',
      gap: 8,
    });

    expect(left).toBeGreaterThanOrEqual(8);
  });

  test('긴 텍스트가 툴팁 내에서 줄 바꿈 처리된다.', async () => {
    render(
      <Tooltip
        tooltipContent="This is a very long tooltip text that should wrap within the tooltip container to avoid overflowing the screen."
        tooltipStyle={{ maxWidth: '150px' }}
      >
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    const tooltip = screen.getByText(/This is a very long tooltip text/);
    expect(tooltip).toHaveStyle('max-width: 150px');
    expect(tooltip).toHaveStyle('white-space: normal');
  });
});

test('Tooltip이 비동기 데이터로 업데이트된다.', async () => {
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

  const trigger = screen.getByText('Hover me');
  await userEvent.hover(trigger);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await act(async () => {
    resolveContent('Fetched Content');
  });

  expect(screen.getByText('Fetched Content')).toBeInTheDocument();
});

describe('Tooltip asChild 속성 테스트', () => {
  test('asChild 기본값은 true이며 자식 요소의 태그가 유지된다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <h1>Hover me</h1>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');
    expect(childElement).toHaveProperty('tagName', 'H1');

    await userEvent.hover(childElement);
    const tooltip = await screen.findByText('This is a tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  test('asChild가 false일 경우 기본 div로 감싸진다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" asChild={false}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');
    expect(childElement.parentElement?.tagName).toBe('DIV');

    await userEvent.hover(childElement);
    const tooltip = await screen.findByText('This is a tooltip');
    expect(tooltip).toBeInTheDocument();
  });
});
