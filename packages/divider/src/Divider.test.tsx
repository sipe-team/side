import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Divider } from './Divider';
import styles from './Divider.module.css';

describe('Divider', () => {
  test('orientation 속성이 없으면 가로 방향으로 그린다.', () => {
    render(<Divider />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider).toHaveClass(styles.horizontal);
  });

  test('orientation이 vertical이면 세로 방향으로 그린다.', () => {
    render(<Divider orientation="vertical" />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(divider).toHaveClass(styles.vertical);
  });

  test('전달받은 style 속성이 컴포넌트에 적용된다.', () => {
    const testStyle = {
      backgroundColor: 'red',
      margin: '8px',
    };

    render(<Divider style={testStyle} />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveStyle({
      backgroundColor: 'red',
      margin: '8px',
    });
  });
});
