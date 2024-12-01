import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip 기본 동작 테스트', () => {
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
});

describe('Tooltip 위치 테스트', () => {
  test('Tooltip이 기본적으로 top 위치에 렌더링된다. (기본값 검증)', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    const tooltip = screen.getByText('This is a tooltip');
    expect(tooltip.className).toContain('top');
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
});

describe('Tooltip Portal 테스트', () => {
  test('Portal을 사용해 Tooltip이 DOM의 최상위 레벨에 렌더링된다.', async () => {
    render(
      <Tooltip tooltipContent="This is a tooltip">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    const tooltip = screen.getByText('This is a tooltip');
    expect(tooltip.parentElement).toBe(document.body);
  });

  test('Tooltip이 뷰포트 밖으로 벗어나지 않도록 위치를 조정한다.', async () => {
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
});

describe('Tooltip 스타일 테스트', () => {
  test('props로 주입한 backgroundColor와 padding이 CSS 변수에 반영된다.', async () => {
    render(
      <Tooltip
        tooltipContent="Styled Tooltip"
        tooltipStyle={{ backgroundColor: 'red', padding: '20px' }}
      >
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    const tooltip = screen.getByText('Styled Tooltip');
    expect(tooltip).toHaveStyle('background-color: red');
    expect(tooltip).toHaveStyle('padding: 20px');
  });
});
