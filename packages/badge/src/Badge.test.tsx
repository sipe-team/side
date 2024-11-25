import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Badge } from './Badge';

test('children으로 입력한 텍스트를 표시한다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByText('테스트')).toBeInTheDocument();
});

test('모서리가 8px radius 형태이다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({ borderRadius: '8px' });
});

test('글꼴 색상은 teal(#00FFFF)이다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByText('테스트')).toHaveStyle({ color: '#00FFFF' });
});

test('글꼴 두께는 semiBold(600)이다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByText('테스트')).toHaveStyle({ fontWeight: 600 });
});

test('variant를 주입하지 않으면 filled(배경색 #2d3748)를 기본 형태로 설정한다.', () => {
  render(<Badge>테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    backgroundColor: '#2d3748',
  });
});

test('variant가 weak인 경우 배경색 #edf2f7로 형태를 적용한다.', () => {
  render(<Badge variant="weak">테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    backgroundColor: '#edf2f7',
  });
});

test('variant가 outline인 경우 배경색은 흰색, 테두리를 1px 두께의 #2d3748 색상 형태를 적용한다.', () => {
  render(<Badge variant="outline">테스트</Badge>);

  expect(screen.getByRole('status')).toHaveStyle({
    backgroundColor: 'white',
    border: '1px solid #2d3748',
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

test('size가 large인 경우 상하 패딩 16px, 좌우 패딩 32px 형태를 적용한다.', () => {
  render(<Badge size="large">테스트</Badge>);

  expect(screen.getByText('테스트')).toHaveStyle({
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingLeft: '32px',
    paddingRight: '32px',
  });
});
