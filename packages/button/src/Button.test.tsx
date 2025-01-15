import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Button } from './Button';

test('children으로 입력한 텍스트를 표시한다.', () => {
  render(<Button>테스트</Button>);

  expect(screen.getByText('테스트')).toBeInTheDocument();
});

test('모서리가 8px radius 형태이다.', () => {
  render(<Button>테스트</Button>);

  expect(screen.getByRole('button')).toHaveStyle({ borderRadius: '8px' });
});

test('variant를 주입하지 않으면 filled(배경색 #00ffff)를 기본 형태로 설정한다.', () => {
  render(<Button>테스트</Button>);

  expect(screen.getByRole('button')).toHaveStyle({
    backgroundColor: '#00ffff',
  });
});

test('color가 primary인 경우 배경색 #00ffff 형태를 적용한다.', () => {
  render(<Button color="primary">테스트</Button>);

  expect(screen.getByRole('button')).toHaveStyle({
    backgroundColor: '#00ffff',
  });
});
