import { describe, test } from 'vitest';

describe('Tooltip 기본 동작 테스트', () => {
  test.todo('content를 주입하지 않으면 Tooltip이 렌더링되지 않는다.');
  test.todo('hover 트리거를 사용할 경우 마우스를 올리면 Tooltip이 표시된다.');
  test.todo(
    'click 트리거를 사용할 경우 클릭하면 Tooltip이 표시되고 다시 클릭하면 사라진다.',
  );
});

describe('Tooltip 위치 테스트', () => {
  test.each(['top', 'bottom', 'left', 'right'])(
    '%s 위치에 Tooltip이 올바르게 렌더링된다.',
    () => {},
  );
  test.todo('Tooltip이 기본적으로 top 위치에 렌더링된다.');
});

describe('Tooltip 접근성 테스트', () => {
  test.todo('aria-label 속성이 설정되어 접근성을 보장한다.');
  test.todo('role="tooltip" 속성이 포함되어 접근성을 보장한다.');
  test.todo('Esc 키를 누르면 Tooltip이 닫힌다.');
  test.todo('키보드로 focus할 경우 Tooltip이 표시된다.');
});

describe('Tooltip Portal 테스트', () => {
  test.todo('Portal을 사용해 Tooltip이 DOM의 최상위 레벨에 렌더링된다.');
  test.todo('Tooltip이 뷰포트 밖으로 벗어나지 않도록 위치를 조정한다.');
});

describe('Tooltip 스타일 테스트', () => {
  test.todo('props로 주입한 backgroundColor와 padding이 CSS 변수에 반영된다.');
  test.todo('defaultProps로 설정된 기본 스타일이 제대로 반영된다.');
});

describe('Tooltip asChild 테스트', () => {
  test.todo('asChild가 주입되지 않으면 기본적으로 div 태그를 사용한다.');
  test.todo(
    'asChild가 true일 경우 children 요소에 Tooltip 스타일과 동작을 적용한다.',
  );
  test.todo(
    'asChild가 true일 때 children의 className 및 style 속성과 Tooltip 스타일이 병합된다.',
  );
});
