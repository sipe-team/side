import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import {
  type FontSize,
  type FontWeight,
  type LineHeight,
  Typography,
} from './Typography';

test('weight를 주입하지 않으면 기본 값 regular(400)로 글꼴의 두께를 설정한다.', () => {
  render(<Typography>테스트</Typography>);

  expect(screen.getByText('테스트')).toHaveStyle({ fontWeight: 400 });
});

test.each([
  { weight: 'regular', numericWeight: 400 },
  { weight: 'medium', numericWeight: 500 },
  { weight: 'semiBold', numericWeight: 600 },
  { weight: 'bold', numericWeight: 700 },
] satisfies Array<{ weight: FontWeight; numericWeight: number }>)(
  '주입한 $weight($numericWeight) weight을 기준으로 글꼴의 두께를 설정한다.',
  ({ weight, numericWeight }) => {
    render(<Typography weight={weight}>테스트</Typography>);

    expect(screen.getByText('테스트')).toHaveStyle({
      fontWeight: numericWeight,
    });
  },
);

test('size를 주입하지 않으면 기본 값 14로 글꼴의 크기를 설정한다.', () => {
  render(<Typography>테스트</Typography>);

  expect(screen.getByText('테스트')).toHaveStyle({ fontSize: '14px' });
});

test.each([12, 14, 16, 18, 20, 24, 28, 32, 36, 48] satisfies FontSize[])(
  '주입한 %i size를 기준으로 글꼴의 크기를 설정한다.',
  (size) => {
    render(<Typography size={size}>테스트</Typography>);

    expect(screen.getByText('테스트')).toHaveStyle({ fontSize: `${size}px` });
  },
);

test('lineHeight을 주입하지 않으면 기본 값 regular(1.5)로 줄 높이를 설정한다.', () => {
  render(<Typography>테스트</Typography>);

  expect(screen.getByText('테스트')).toHaveStyle({ lineHeight: 1.5 });
});

test.each([
  { lineHeight: 'regular', numericLineHeight: 1.5 },
  { lineHeight: 'compact', numericLineHeight: 1.3 },
] satisfies Array<{ lineHeight: LineHeight; numericLineHeight: number }>)(
  '주입한 %s lineHeight을 기준으로 줄 높이를 설정한다.',
  ({ lineHeight, numericLineHeight }) => {
    render(<Typography lineHeight={lineHeight}>테스트</Typography>);

    expect(screen.getByText('테스트')).toHaveStyle({
      lineHeight: numericLineHeight,
    });
  },
);

test('asChild를 주입하지 않으면 p 태그로 요소를 그린다.', () => {
  render(<Typography>테스트</Typography>);

  expect(screen.getByText('테스트')).toHaveProperty('tagName', 'P');
});

test('asChild가 true일 때, children으로 전달된 요소에 Typography 스타일을 적용한다.', async () => {
  render(
    <Typography asChild={true}>
      <h1>테스트</h1>
    </Typography>,
  );

  await waitFor(() => {
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  expect(screen.getByText('테스트')).toHaveProperty('tagName', 'H1');
});
