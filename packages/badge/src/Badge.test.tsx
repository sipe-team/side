import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Badge } from './Badge';
import { color as colorToken } from '@sipe-team/tokens';

test('children으로 입력한 텍스트를 표시한다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByText('테스트')).toBeInTheDocument();
});

test('모서리가 8px radius 형태이다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({ borderRadius: '8px' });
});

test(`글꼴 색상은 cyan300(${colorToken.cyan300})이다.`, () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByText('테스트')).toHaveStyle({ color: colorToken.cyan300 });
});

test('글꼴 두께는 semiBold(600)이다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByText('테스트')).toHaveStyle({ fontWeight: 600 });
});

test(`variant를 주입하지 않으면 filled(${colorToken.cyan900})를 기본 형태로 설정한다.`, () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    backgroundColor: colorToken.cyan900,
  });
});

test('variant가 weak인 경우 배경색 gray200로 형태를 적용한다.', () => {
  render(<Badge variant="weak">테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    backgroundColor: '#e4e4e7',
  });
});

test('variant가 outline인 경우 배경색은 투명, 테두리는 2px 두께의 cyan900 색상 형태를 적용한다.', () => {
  render(<Badge variant="outline">테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    backgroundColor: 'transparent',
    border: `2px solid ${colorToken.cyan900}`,
  });
});

test('size를 주입하지 않으면 medium(상하 패딩 8px, 좌우 패딩 16px)을 기본 크기로 설정한다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
  });
});

test('size가 small인 경우 상하 패딩 4px, 좌우 패딩 8px 형태를 적용한다.', () => {
  render(<Badge size="small">테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '8px',
    paddingRight: '8px',
  });
});

test('size가 large인 경우 상하 패딩 12px, 좌우 패딩 24px 형태를 적용한다.', () => {
  render(<Badge size="large">테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '24px',
    paddingRight: '24px',
  });
});
