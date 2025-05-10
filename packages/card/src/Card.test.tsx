import { color } from '@sipe-team/tokens';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Card } from './Card';

test('children으로 넘어간 요소를 반환한다. ', async () => {
  const screen = render(
    <Card>
      <span>Card</span>
    </Card>,
  );

  await expect.element(screen.getByText('Card')).toBeInTheDocument();
});

test('Card는 default로 padding(20px)을 갖는다.', async () => {
  const screen = render(<Card>Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle({ padding: '20px' });
});

test('Card는 default로 요소를 중앙정렬을 한다.', async () => {
  const screen = render(<Card>Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
});

test('ratio가 default로 aspect-ratio는 16/9로 반환한다.', async () => {
  const screen = render(<Card>Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle('aspect-ratio: 16 / 9');
});

test('ratio에 wide로 넣으면 aspect-ratio는 21/9로 반환한다.', async () => {
  const screen = render(<Card ratio="wide">Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle('aspect-ratio: 21 / 9');
});

test('ratio에 square로 넣으면 aspect-ratio는 1/1로 반환한다.', async () => {
  const screen = render(<Card ratio="square">Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle('aspect-ratio: 1 / 1');
});

test('ratio에 portrait로 넣으면 aspect-ratio는 3/4로 반환한다.', async () => {
  const screen = render(<Card ratio="portrait">Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle('aspect-ratio: 3 / 4');
});

test('ratio에 auto로 넣으면 aspect-ratio는 auto로 반환한다.', async () => {
  const screen = render(<Card ratio="auto">Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle('aspect-ratio: auto');
});

test('variant는 default로 filled를 적용한다.', async () => {
  const screen = render(<Card>Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle({
    border: `1px solid ${color.gray200}`,
  });
});

test(`variant가 outline으로 넣으면 border(${color.cyan300}) 색상을 적용한다.`, async () => {
  const screen = render(<Card variant="outline">Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle({
    border: `1px solid ${color.cyan300}`,
  });
});

test(`variant가 filled일 때 배경색이 ${color.gray100}이다.`, async () => {
  const screen = render(<Card variant="filled">Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle({
    backgroundColor: color.gray100,
  });
});

test(`variant가 outline일 때 배경색이 ${color.gray50}이다.`, async () => {
  const screen = render(<Card variant="outline">Card</Card>);
  await expect.element(screen.getByText('Card')).toHaveStyle({
    backgroundColor: color.gray50,
  });
});
