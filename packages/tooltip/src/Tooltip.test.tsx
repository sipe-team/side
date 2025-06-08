import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { describe, expect, test } from 'vitest';
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

  test.each([['top-left'], ['top'], ['top-right'], ['bottom-left'], ['bottom'], ['bottom-right'], ['left'], ['right']])(
    'Tooltip이 %s 위치에 올바르게 렌더링된다.',
    async (placement) => {
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
    },
  );
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

  test('Tooltip이 뷰포트 밖으로 벗어나지 않는다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" placement="bottom">
        <button type="button" style={{ marginTop: '100vh' }}>
          Hover me
        </button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    const tooltip = screen.getByText('This is a tooltip');
    const rect = tooltip.getBoundingClientRect();

    expect(rect.top).toBeGreaterThanOrEqual(0);
    expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight);
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
  const fetchMockData = async () => {
    return new Promise<string>((resolve) => setTimeout(() => resolve('Fetched Content'), 500));
  };

  const AsyncTooltip = () => {
    const [content, setContent] = useState('Loading...');
    useEffect(() => {
      fetchMockData().then((data) => setContent(data));
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

  const loadingTooltip = await screen.findByText('Loading...');
  expect(loadingTooltip).toBeInTheDocument();

  const updatedTooltip = await screen.findByText('Fetched Content');
  expect(updatedTooltip).toBeInTheDocument();
});

describe('Tooltip asChild 속성 테스트', () => {
  test('asChild가 true일 경우 자식 요소의 태그가 유지된다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" asChild={true}>
        <h1>Hover me</h1>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');
    expect(childElement).toHaveProperty('tagName', 'H1');

    await userEvent.hover(childElement);
    const tooltip = await screen.findByText('This is a tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  test('asChild 속성을 주지 않았을 경우, 기본 값으로 동작한다.', async () => {
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

    await userEvent.unhover(childElement);
    await waitFor(() => {
      expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
    });
  });

  test('asChild가 false일 경우 기본 div로 감싸진다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" asChild={false}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const wrapperElement = screen.getByRole('tooltip');
    expect(wrapperElement.tagName).toBe('DIV');

    const childElement = screen.getByText('Hover me');
    await userEvent.hover(childElement);
    const tooltip = await screen.findByText('This is a tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  test('asChild가 true일 경우 이벤트 핸들러가 자식 요소에 적용된다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip" asChild={true}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');

    await userEvent.hover(childElement);
    const tooltip = await screen.findByText('This is a tooltip');
    expect(tooltip).toBeInTheDocument();

    await userEvent.unhover(childElement);
    await waitFor(() => {
      expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
    });
  });
});
