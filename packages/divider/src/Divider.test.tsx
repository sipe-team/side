import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Divider } from './Divider';

describe('Divider', () => {
  test('orientation 속성이 없으면 가로 방향으로 그린다.', async () => {
    const screen = render(<Divider />);

    const divider = screen.getByRole('separator');

    await expect.element(divider).toHaveAttribute('aria-orientation', 'horizontal');
    await expect.element(divider).toHaveStyle({
      width: '100%',
      height: '1px',
    });
  });

  test('orientation이 vertical이면 세로 방향으로 그린다.', async () => {
    const screen = render(<Divider orientation="vertical" />);

    const divider = screen.getByRole('separator');

    await expect.element(divider).toHaveAttribute('aria-orientation', 'vertical');
    await expect.element(divider).toHaveStyle({
      width: '1px',
      height: '100%',
    });
  });

  test('전달받은 style 속성이 컴포넌트에 적용된다.', async () => {
    const testStyle = {
      backgroundColor: 'red',
      margin: '8px',
    };

    const screen = render(<Divider style={testStyle} />);

    const divider = screen.getByRole('separator');

    await expect.element(divider).toHaveStyle({
      backgroundColor: 'red',
      margin: '8px',
    });
  });
});
