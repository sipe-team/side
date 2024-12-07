import { color } from '@sipe-team/tokens';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Card } from './Card';

test('children으로 넘어간 요소를 반환한다. ', () => {
  render(
    <Card>
      <span>Card</span>
    </Card>,
  );

  expect(screen.getByText('Card')).toBeInTheDocument();
});

test('Card는 기본적으로 padding(20px)을 갖는다.', () => {
  render(<Card>Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle({ padding: '20px' });
});

test('Card는 기본적으로 요소를 중앙정렬을 한다.', () => {
  render(<Card>Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
});

test('ratio가 default로 aspect-ratio는 16/9로 반환한다.', () => {
  render(<Card>Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 16 / 9');
});

test('ratio에 wide로 넣으면 aspect-ratio는 21/9로 반환한다.', () => {
  render(<Card ratio="wide">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle('aspect-ratio: 21 / 9');
});

test('variant는 default로 filled를 적용한다.', () => {
  render(<Card>Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle({
    border: `1px solid ${color.gray200}`,
  });
});

test('variant가 outline으로 넣으면 border(#00FFFF) 색상을 적용한다.', () => {
  render(<Card variant="outline">Card</Card>);
  expect(screen.getByText('Card')).toHaveStyle({ border: '1px solid #00FFFF' });
});
