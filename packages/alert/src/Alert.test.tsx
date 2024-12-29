import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import * as Alert from './Alert';

it('얼럿은 12px의 둥근 모서리를 가진다.', () => {
  render(<Alert.Root />);

  const element = screen.getByRole('alert');

  expect(element).toHaveStyle({ borderRadius: 12 });
});

it('얼럿의 배경색은 #1a202c다.', () => {
  render(<Alert.Root />);

  const element = screen.getByRole('alert');

  expect(element).toHaveStyle({ backgroundColor: '#1a202c' });
});

it('얼럿의 테두리는 1px 두께, #2d3748 색상이다.', () => {
  render(<Alert.Root />);

  const element = screen.getByRole('alert');

  expect(element).toHaveStyle({ border: '1px solid #2d3748' });
});

it('얼럿 내부 요소 간 간격은 20px이다.', () => {
  render(
    <Alert.Root>
      <Alert.Icon src="https://foo.com/image.png" />
      <Alert.Text>
        격주 토요일 오후 2시 ~ 6시에 진행되는 정규 활동에 성실하게 참여할 수
        있는
      </Alert.Text>
    </Alert.Root>,
  );

  const element = screen.getByRole('alert');

  expect(element).toHaveStyle({ display: 'flex', gap: '20px' });
});

it('얼럿의 패딩은 20px이다.', () => {
  render(<Alert.Root />);

  const element = screen.getByRole('alert');

  expect(element).toHaveStyle({ padding: '20px' });
});

it('텍스트는 14px 사이즈, #ffffff 색상, bold 폰트 굵기이다.', () => {
  const content =
    '격주 토요일 오후 2시 ~ 6시에 진행되는 정규 활동에 성실하게 참여할 수 있는';

  render(
    <Alert.Root>
      <Alert.Icon src="https://foo.com/image.png" />
      <Alert.Text>{content}</Alert.Text>
    </Alert.Root>,
  );

  const alert = screen.getByRole('alert');
  const element = within(alert).getByText(content);

  expect(element).toHaveStyle({
    fontSize: '14px',
    color: '#ffffff',
    fontWeight: 700,
  });
});

it('얼럿 내부 요소들은 중앙 정렬이다.', () => {
  const content =
    '격주 토요일 오후 2시 ~ 6시에 진행되는 정규 활동에 성실하게 참여할 수 있는';

  render(
    <Alert.Root>
      <Alert.Icon src="https://foo.com/image.png" />
      <Alert.Text>{content}</Alert.Text>
    </Alert.Root>,
  );

  const element = screen.getByRole('alert');

  expect(element).toHaveStyle({ display: 'flex', alignItems: 'center' });
});

it.todo('아이콘은 24px 사이즈 이미지이다.');
