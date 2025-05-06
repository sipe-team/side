import { userEvent } from '@vitest/browser/context';
import { useEffect, useState } from 'react';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Tooltip, type TooltipPosition } from './Tooltip';

describe('Tooltip 기본 동작 테스트', () => {
  test('Tooltip은 초기 상태에서 보이지 않아야 한다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="Test Tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const tooltip = screen.getByText('Test Tooltip');
    await expect.element(tooltip).not.toBeInTheDocument();
  });

  test('tooltipContent를 주입하지 않으면 Tooltip이 렌더링되지 않는다.', async () => {
    const screen = render(
      <Tooltip tooltipContent={null}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await expect.element(trigger).toBeInTheDocument();
    await expect.element(screen.getByRole('tooltip')).not.toBeInTheDocument();
  });

  test('hover 트리거일 경우 마우스를 올리면 Tooltip이 나타나고 이탈 시 사라진다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip" trigger="hover">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    const user = userEvent.setup();

    await user.hover(trigger);
    await expect.element(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await user.unhover(trigger);
    await expect.element(screen.getByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('click 트리거일 경우 클릭하면 Tooltip이 표시되고 다시 클릭하면 사라진다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip" trigger="click">
        <button type="button">Click me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Click me');
    const user = userEvent.setup();

    await user.click(trigger);
    await expect.element(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await user.click(trigger);
    await expect.element(screen.getByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('Tooltip 외부 클릭 시 닫힌다.', async () => {
    const screen = render(
      <div>
        <Tooltip tooltipContent="This is a tooltip" trigger="click">
          <button type="button">Click me</button>
        </Tooltip>
        <button type="button">Outside</button>
      </div>,
    );

    const trigger = screen.getByText('Click me');
    const outside = screen.getByText('Outside');
    const user = userEvent.setup();

    await user.click(trigger);
    await expect.element(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await user.click(outside);
    await expect.element(screen.getByText('This is a tooltip')).not.toBeInTheDocument();
  });
});

describe('Tooltip 위치 테스트', () => {
  test('Tooltip이 기본적으로 top 위치에 렌더링된다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    const user = userEvent.setup();

    await user.hover(trigger);

    const tooltip = screen.getByText('This is a tooltip');
    await expect.element(tooltip).toBeInTheDocument();
    await expect.element(tooltip).toHaveClass('top');
  });

  test.each([['top-left'], ['top'], ['top-right'], ['bottom-left'], ['bottom'], ['bottom-right'], ['left'], ['right']])(
    'Tooltip이 %s 위치에 올바르게 렌더링된다.',
    async (placement) => {
      const screen = render(
        <Tooltip tooltipContent="Tooltip content" placement={placement as TooltipPosition}>
          <button type="button">Trigger</button>
        </Tooltip>,
      );

      const trigger = screen.getByText('Trigger');
      const user = userEvent.setup();

      await user.hover(trigger);

      const tooltip = screen.getByText('Tooltip content');
      await expect.element(tooltip).toBeInTheDocument();
      await expect.element(tooltip).toHaveClass(placement);
    },
  );
});

describe('Tooltip 접근성 테스트', () => {
  test('role="tooltip" 속성이 포함되어 접근성을 보장한다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    const user = userEvent.setup();

    await user.hover(trigger);

    const tooltip = screen.getByRole('tooltip');
    await expect.element(tooltip).toBeInTheDocument();
  });

  test('Esc 키를 누르면 Tooltip이 닫힌다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip" trigger="click">
        <button type="button">Click me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Click me');
    const user = userEvent.setup();

    await user.click(trigger);
    await expect.element(screen.getByText('This is a tooltip')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await expect.element(screen.getByText('This is a tooltip')).not.toBeInTheDocument();
  });
});

describe('Tooltip 스타일 테스트', () => {
  test('props로 주입한 backgroundColor와 padding이 CSS 변수에 반영된다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="Styled Tooltip" tooltipStyle={{ backgroundColor: 'red', padding: '20px' }}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    const user = userEvent.setup();

    await user.hover(trigger);

    const tooltip = screen.getByText('Styled Tooltip');
    await expect.element(tooltip).toHaveStyle('background-color: red');
    await expect.element(tooltip).toHaveStyle('padding: 20px');
  });

  test('Tooltip이 뷰포트 밖으로 벗어나지 않는다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip" placement="bottom">
        <button type="button" style={{ marginTop: '100vh' }}>
          Hover me
        </button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    const user = userEvent.setup();

    await user.hover(trigger);

    const tooltip = screen.getByText('This is a tooltip');
    const rect = tooltip.element().getBoundingClientRect();

    expect(rect.top).toBeGreaterThanOrEqual(0);
    expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight);
  });

  test('긴 텍스트가 툴팁 내에서 줄 바꿈 처리된다.', async () => {
    const screen = render(
      <Tooltip
        tooltipContent="This is a very long tooltip text that should wrap within the tooltip container to avoid overflowing the screen."
        tooltipStyle={{ maxWidth: '150px' }}
      >
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    const user = userEvent.setup();

    await user.hover(trigger);

    const tooltip = screen.getByText(/This is a very long tooltip text/);
    await expect.element(tooltip).toHaveStyle('max-width: 150px');
    await expect.element(tooltip).toHaveStyle('white-space: normal');
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

  const screen = render(<AsyncTooltip />);

  const trigger = screen.getByText('Hover me');
  const user = userEvent.setup();

  await user.hover(trigger);

  const loadingTooltip = screen.getByText('Loading...');
  await expect.element(loadingTooltip).toBeInTheDocument();

  const updatedTooltip = screen.getByText('Fetched Content');
  await expect.element(updatedTooltip).toBeInTheDocument();
});

describe('Tooltip asChild 속성 테스트', () => {
  test('asChild가 true일 경우 자식 요소의 태그가 유지된다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip" asChild={true}>
        <h1>Hover me</h1>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');
    await expect.element(childElement).toHaveProperty('tagName', 'H1');

    const user = userEvent.setup();

    await user.hover(childElement);
    const tooltip = screen.getByText('This is a tooltip');
    await expect.element(tooltip).toBeInTheDocument();
  });

  test('asChild 속성을 주지 않았을 경우, 기본 값으로 동작한다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip">
        <h1>Hover me</h1>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');
    await expect.element(childElement).toHaveProperty('tagName', 'H1');

    const user = userEvent.setup();

    await user.hover(childElement);
    const tooltip = screen.getByText('This is a tooltip');
    await expect.element(tooltip).toBeInTheDocument();

    await user.unhover(childElement);
    await expect.element(screen.getByText('This is a tooltip')).not.toBeInTheDocument();
  });

  test('asChild가 false일 경우 기본 div로 감싸진다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip" asChild={false}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const wrapperElement = screen.getByRole('tooltip');
    await expect.element(wrapperElement).toHaveProperty('TAGNAME', 'DIV');

    const user = userEvent.setup();

    const childElement = screen.getByText('Hover me');
    await user.hover(childElement);
    const tooltip = screen.getByText('This is a tooltip');
    await expect.element(tooltip).toBeInTheDocument();
  });

  test('asChild가 true일 경우 이벤트 핸들러가 자식 요소에 적용된다.', async () => {
    const screen = render(
      <Tooltip tooltipContent="This is a tooltip" asChild={true}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const childElement = screen.getByText('Hover me');
    const user = userEvent.setup();

    await user.hover(childElement);
    const tooltip = screen.getByText('This is a tooltip');
    await expect.element(tooltip).toBeInTheDocument();

    await user.unhover(childElement);
    await expect.element(screen.getByText('This is a tooltip')).not.toBeInTheDocument();
  });
});
