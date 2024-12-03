import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Avatar } from './Avatar';
import { faker } from '@faker-js/faker';
const testImage = faker.image.avatar();


test('이미지를 정상적으로 표시한다.', () => {
    render(<Avatar src={testImage} alt="대체 텍스트" />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', testImage);
    expect(img).toHaveAttribute('alt', '대체 텍스트');
});

test('이미지가 없을 경우 대체 텍스트를 표시한다.', () => {
    render(<Avatar alt="대체 텍스트" />);

    expect(screen.getByText('대체 텍스트')).toBeInTheDocument();
});

test('이미지 로드 실패 시 fallback을 표시한다.', () => {
    render(<Avatar src="broken-link" fallback="https://randomuser.me/api/portraits/women/1.jpg" />);

    const img = screen.getByRole('img');
    img.dispatchEvent(new Event('error'));

    expect(img).toHaveAttribute('src', 'https://randomuser.me/api/portraits/women/1.jpg');
});

test('기본 크기는 40px이다.', () => {
    render(<Avatar src={testImage} />);
    expect(screen.getByRole('img')).toHaveStyle({ width: '40px', height: '40px' });
});

test('원형 형태로 표시한다.', () => {
    render(<Avatar src={testImage} shape="circle" />);
    expect(screen.getByRole('img')).toHaveStyle({ borderRadius: '50%' });
});