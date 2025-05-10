import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Skeleton } from './Skeleton';

test('loading이 true 일 때 스켈레톤이 렌더링 된다.', async () => {
  const screen = render(<Skeleton loading={true} aria-label="skeleton" />);

  const skeleton = screen.getByLabelText('skeleton');
  await expect.element(skeleton).toBeInTheDocument();
});

test('loading이 false 일 때 children이 렌더링 된다.', async () => {
  const screen = render(<Skeleton loading={false}>Childrun</Skeleton>);

  await expect.element(screen.getByText('Childrun')).toBeInTheDocument();
});

test('variant가 circle일 때 borderRadius가 50%로 설정된다.', async () => {
  const screen = render(<Skeleton loading={true} variant="circle" aria-label="skeleton" />);

  const skeleton = screen.getByLabelText('skeleton');
  await expect.element(skeleton).toHaveStyle({ borderRadius: '50%' });
});
test('variant가 rectangular일 때 borderRadius가 기본값 4px으로 설정된다.', async () => {
  const screen = render(<Skeleton loading={true} variant="rectangular" aria-label="skeleton" />);

  const skeleton = screen.getByLabelText('skeleton');
  await expect.element(skeleton).toHaveStyle({ borderRadius: '4px' });
});
test('width와 height가 props로 전달될 때 올바르게 스타일이 적용된다.', async () => {
  const screen = render(<Skeleton loading={true} width={150} height={50} aria-label="skeleton" />);

  const skeleton = screen.getByLabelText('skeleton');
  await expect.element(skeleton).toHaveStyle({ width: '150px', height: '50px' });
});

test('asChild가 true일 때, children으로 전달된 요소에 Skeleton 스타일을 적용한다.', async () => {
  const screen = render(
    <Skeleton asChild loading={true} width={120} height={30}>
      <span data-testid="child">Child Content</span>
    </Skeleton>,
  );

  const child = screen.getByTestId('child');
  await expect.element(child).toBeInTheDocument();
  await expect.element(child).toHaveStyle({
    backgroundColor: 'rgb(155, 155, 155)',
    width: '120px',
    height: '30px',
  });
});
