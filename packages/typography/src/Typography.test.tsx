import { test } from 'vitest';

test.todo('weight를 주입하지 않으면 기본 값 regular로 글꼴의 두께를 설정한다.');

test.each(['regular', 'medium', 'semiBold', 'bold'])(
  '주입한 %s weight을 기준으로 글꼴의 두께를 설정한다.',
  () => {},
);

test.todo('size를 주입하지 않으면 기본 값 14로 글꼴의 크기를 설정한다.');

test.each([12, 14, 16, 18, 20, 24, 28, 32, 36, 48])(
  '주입한 %i size를 기준으로 글꼴의 크기를 설정한다.',
  () => {},
);

test.todo('lineHeight을 주입하지 않으면 기본 값 regular로 줄 높이를 설정한다.');

test.each(['regular', 'compact'])(
  '주입한 %s lineHeight을 기준으로 줄 높이를 설정한다.',
  () => {},
);

test.todo('asChild를 주입하지 않으면 p 태그로 요소를 그린다,');

test.todo(
  'asChild가 true일 때, children으로 전달된 요소에 Typography 스타일을 적용한다.',
);
