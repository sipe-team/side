import { faker } from '@faker-js/faker';
import { describe, expect, it, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Avatar, type AvatarShape, type AvatarSize } from './Avatar';

const testImage = faker.image.avatar();

test('Avatar 컴포넌트가 주입받은 이미지 주소를 src 속성으로 설정한다.', async () => {
  const screen = render(<Avatar src={testImage} alt="대체 텍스트" />);

  const img = screen.getByRole('img');

  await expect.element(img).toHaveAttribute('src', testImage);
});

test('이미지가 없을 경우 대체 텍스트를 표시한다.', async () => {
  const screen = render(<Avatar alt="대체 텍스트" />);

  await expect.element(screen.getByText('대체 텍스트')).toBeVisible();
});

test('이미지 로드 실패 시 fallback을 표시한다.', async () => {
  const fallbackSrc = 'https://randomuser.me/api/portraits/women/1.jpg';
  const screen = render(<Avatar src="broken-link" fallback={fallbackSrc} />);

  const img = screen.getByRole('img');

  await expect.element(img).toHaveAttribute('src', fallbackSrc);
});

describe('Avatar 컴포넌트', () => {
  const sizes: { size: AvatarSize; expectedSize: string }[] = [
    { size: 'xs', expectedSize: '24px' },
    { size: 'sm', expectedSize: '32px' },
    { size: 'md', expectedSize: '40px' },
    { size: 'lg', expectedSize: '70px' },
    { size: 'xl', expectedSize: '96px' },
  ];

  const shapes: { shape: AvatarShape; expectedRadius: string }[] = [
    { shape: 'circle', expectedRadius: '50%' },
    { shape: 'rounded', expectedRadius: '4px' },
    { shape: 'square', expectedRadius: '0px' },
  ];

  it.each(sizes)(
    'size가 $size일때 $expectedSize x $expectedSize 크기로 렌더링 된다.',
    async ({ size, expectedSize }) => {
      const screen = render(<Avatar data-testid="avatar" src={testImage} size={size} />);

      const container = screen.getByTestId('avatar');

      await expect.element(container).toHaveStyle({
        width: expectedSize,
        height: expectedSize,
      });
    },
  );

  it.each(shapes)(
    'shape가 $shape일때 borderRadius는 $expectedRadius로 나타난다.',
    async ({ shape, expectedRadius }) => {
      const screen = render(<Avatar data-testid="avatar" src={testImage} shape={shape} />);

      const container = screen.getByTestId('avatar');

      await expect.element(container).toHaveStyle({ borderRadius: expectedRadius });
    },
  );
});
