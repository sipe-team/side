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