import { faker } from '@faker-js/faker';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { type FontSize, type FontWeight, type LineHeight, Typography } from './Typography';

test('weight를 주입하지 않으면 기본 값 regular(400)로 글꼴의 두께를 설정한다.', async () => {
  const screen = render(<Typography>테스트</Typography>);

  await expect.element(screen.getByText('테스트')).toHaveStyle({ fontWeight: '400' });
});

test.each([
  { weight: 'regular', numericWeight: '400' },
  { weight: 'medium', numericWeight: '500' },
  { weight: 'semiBold', numericWeight: '600' },
  { weight: 'bold', numericWeight: '700' },
] satisfies Array<{ weight: FontWeight; numericWeight: string }>)(
  '주입한 $weight($numericWeight) weight을 기준으로 글꼴의 두께를 설정한다.',
  async ({ weight, numericWeight }) => {
    const screen = render(<Typography weight={weight}>테스트</Typography>);

    await expect.element(screen.getByText('테스트')).toHaveStyle({
      fontWeight: numericWeight,
    });
  },
);

test('size를 주입하지 않으면 기본 값 14로 글꼴의 크기를 설정한다.', async () => {
  const screen = render(<Typography>테스트</Typography>);

  await expect.element(screen.getByText('테스트')).toHaveStyle({ fontSize: '14px' });
});

test.each([12, 14, 16, 18, 20, 24, 28, 32, 36, 48] satisfies FontSize[])(
  '주입한 %i size를 기준으로 글꼴의 크기를 설정한다.',
  async (size) => {
    const screen = render(<Typography size={size}>테스트</Typography>);

    await expect.element(screen.getByText('테스트')).toHaveStyle({ fontSize: `${size}px` });
  },
);

test('lineHeight을 주입하지 않으면 기본 값 regular(1.5)로 줄 높이를 설정한다.', async () => {
  const screen = render(<Typography>테스트</Typography>);

  await expect.element(screen.getByText('테스트')).toHaveStyle({ lineHeight: '1.5' });
});

test.each([
  { lineHeight: 'regular', numericLineHeight: '1.5' },
  { lineHeight: 'compact', numericLineHeight: '1.3' },
] satisfies Array<{ lineHeight: LineHeight; numericLineHeight: string }>)(
  '주입한 %s lineHeight을 기준으로 줄 높이를 설정한다.',
  async ({ lineHeight, numericLineHeight }) => {
    const screen = render(<Typography lineHeight={lineHeight}>테스트</Typography>);

    await expect.element(screen.getByText('테스트')).toHaveStyle({
      lineHeight: numericLineHeight,
    });
  },
);

test('주입한 color를 기준으로 글꼴의 색상을 설정한다.', async () => {
  const color = faker.color.rgb();

  const screen = render(<Typography color={color}>테스트</Typography>);

  await expect.element(screen.getByText('테스트')).toHaveStyle({ color });
});

test('asChild를 주입하지 않으면 p 태그로 요소를 그린다.', async () => {
  const screen = render(<Typography>테스트</Typography>);

  await expect.element(screen.getByText('테스트')).toHaveProperty('tagName', 'P');
});

test('asChild가 true일 때, children으로 전달된 요소에 Typography 스타일을 적용한다.', async () => {
  const screen = render(
    <Typography asChild={true}>
      <h1>테스트</h1>
    </Typography>,
  );

  await expect.element(screen.getByRole('paragraph')).not.toBeInTheDocument();

  await expect.element(screen.getByText('테스트')).toHaveProperty('tagName', 'H1');
});

test('className을 주입하면 추가로 전달한다.', async () => {
  const customClassName = faker.word.noun();

  const screen = render(<Typography className={customClassName}>테스트</Typography>);

  await expect.element(screen.getByText('테스트')).toHaveClass(customClassName);
});

test('style을 주입하면 추가로 전달한다.', async () => {
  const customStyle = {
    display: faker.helpers.arrayElement(['block', 'flex', 'grid']),
    margin: `${faker.number.int()}px`,
  };

  const screen = render(<Typography style={customStyle}>테스트</Typography>);

  await expect.element(screen.getByText('테스트')).toHaveStyle(customStyle);
});
