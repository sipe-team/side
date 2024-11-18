import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Skeleton } from './Skeleton';

test('loading이 true 일 때 스켈레톤이 렌더링 된다.', () => {
  render(<Skeleton loading={true} aria-label="skeleton" />);

  const skeleton = screen.getByLabelText('skeleton');
  expect(skeleton).toBeInTheDocument();
});

test('loading이 false 일 때 children이 렌더링 된다.', () => {
  render(<Skeleton loading={false}>Childrun</Skeleton>);

  expect(screen.getByText('Childrun')).toBeInTheDocument();
});

test('variant가 circle일 때 borderRadius가 50%로 설정된다.', () => {
  render(<Skeleton loading={true} variant="circle" aria-label="skeleton" />);

  const skeleton = screen.getByLabelText('skeleton');
  expect(skeleton).toHaveStyle({ borderRadius: '50%' });
});
test('variant가 rectangular일 때 borderRadius가 기본값 4px으로 설정된다.', () => {
  render(
    <Skeleton loading={true} variant="rectangular" aria-label="skeleton" />,
  );

  const skeleton = screen.getByLabelText('skeleton');
  expect(skeleton).toHaveStyle({ borderRadius: '4px' });
});
test('width와 height가 props로 전달될 때 올바르게 스타일이 적용된다.', () => {
  render(
    <Skeleton loading={true} width={150} height={50} aria-label="skeleton" />,
  );

  const skeleton = screen.getByLabelText('skeleton');
  expect(skeleton).toHaveStyle({ width: '150px', height: '50px' });
});

test('asChild가 true일 때, children으로 전달된 요소에 Skeleton 스타일을 적용한다.', () => {
  render(
    <Skeleton asChild loading={true} width={120} height={30}>
      <span data-testid="child">Child Content</span>
    </Skeleton>,
  );

  const child = screen.getByTestId('child');
  expect(child).toBeInTheDocument();
  expect(child).toHaveStyle({
    'background-color': 'rgb(155, 155, 155)',
    width: '120px',
    height: '30px',
  });
});
