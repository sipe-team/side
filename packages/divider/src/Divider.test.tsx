import { color } from '@sipe-team/tokens';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  test('orientation 속성이 없으면 가로 방향으로 그리고 기본 색상을 가진다.', () => {
    render(<Divider />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider).toHaveStyle({
      width: '100%',
      height: '1px',
      backgroundColor: color.gray300,
    });
  });

  test('orientation이 vertical이면 세로 방향으로 그린다.', () => {
    render(<Divider orientation="vertical" />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(divider).toHaveStyle({
      width: '1px',
      height: '100%',
    });
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

  test('color 속성에 따라 배경색이 변경된다.', () => {
    render(<Divider color="primary" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveStyle({
      backgroundColor: color.cyan300,
    });
  });

  test('className이 올바르게 전달된다.', () => {
    render(<Divider className="custom-class" />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('custom-class');
  });
});
