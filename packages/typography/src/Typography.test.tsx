import { faker } from '@faker-js/faker';
import { fontWeight, lineHeight } from '@sipe-team/tokens';
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import { type FontSize, type FontWeight, type LineHeight, Typography } from './Typography';

test('weight를 주입하지 않으면 기본 값 regular(400)로 글꼴의 두께를 설정한다.', () => {
  render(<Typography>테스트</Typography>);

  expect(screen.getByText('테스트')).toHaveStyle({ fontWeight: fontWeight.regular });
});

test.each([
  { weight: 'regular', numericWeight: fontWeight.regular },
  { weight: 'medium', numericWeight: fontWeight.medium },
  { weight: 'semiBold', numericWeight: fontWeight.semiBold },
  { weight: 'bold', numericWeight: fontWeight.bold },
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

  expect(screen.getByText('테스트')).toHaveStyle({ lineHeight: lineHeight.regular });
});

test.each([
  { lineHeight: 'regular', numericLineHeight: lineHeight.regular },
  { lineHeight: 'compact', numericLineHeight: lineHeight.compact },
] satisfies Array<{ lineHeight: LineHeight; numericLineHeight: number }>)(
  '주입한 %s lineHeight을 기준으로 줄 높이를 설정한다.',
  ({ lineHeight: lineHeightValue, numericLineHeight }) => {
    render(<Typography lineHeight={lineHeightValue}>테스트</Typography>);

    expect(screen.getByText('테스트')).toHaveStyle({
      lineHeight: numericLineHeight,
    });
  },
);

test('주입한 color를 기준으로 글꼴의 색상을 설정한다.', () => {
  const color = faker.color.rgb();

  render(<Typography color={color}>테스트</Typography>);

  expect(screen.getByText('테스트')).toHaveStyle({ color });
});

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

test('as prop을 통해 요소 타입을 변경할 수 있다.', () => {
  render(<Typography as="h2">테스트</Typography>);

  expect(screen.getByText('테스트')).toHaveProperty('tagName', 'H2');
});

test('className을 주입하면 추가로 전달한다.', () => {
  const customClassName = faker.word.noun();

  render(<Typography className={customClassName}>테스트</Typography>);

  expect(screen.getByText('테스트').className).toContain(customClassName);
});

test('style을 주입하면 추가로 전달한다.', () => {
  const customStyle = {
    display: faker.helpers.arrayElement(['block', 'flex', 'grid']),
    margin: `${faker.number.int()}px`,
  };

  render(<Typography style={customStyle}>테스트</Typography>);

  expect(screen.getByText('테스트')).toHaveStyle(customStyle);
});
