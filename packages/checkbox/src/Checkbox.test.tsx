import { describe, test } from 'vitest';

// todo() -> 기능 구현시 테스트 범위 지정
describe('Checkbox 기본 동작 테스트', () => {
  test.todo('체크박스의 상태를 설정할 수 있다.');
  test.todo('체크박스의 레이블을 클릭하면 체크박스의 상태가 변경된다.');
  test.todo('체크박스를 클릭하면 체크박스의 상태가 변경된다.');
  test.todo('label을 주입하지 않으면 checkbox가 렌더링되지 않는다.');
});

describe('Checkbox 스타일 테스트', () => {
  test.todo('전달받은 style을 컴포넌트에 적용한다.');
  test.todo(
    'checked를 주입하지 않으면 checkbox가 체크되지 않은 상태로 렌더링된다.',
  );
  test.todo('checked를 주입하면 checkbox가 체크된 상태로 렌더링된다.');
  test.todo(
    'disabled를 주입하지 않으면 checkbox가 활성화된 상태로 렌더링된다.',
  );
  test.todo('disabled를 주입하면 checkbox가 비활성화된 상태로 렌더링된다.');

  test.each(['sm', 'md', 'lg'])(
    'size로 주입한 %s를 checkbox의 크기로 설정한다.',
    () => {
      // test code
    },
  );
  test.todo('size를 주입하지 않으면 기본 값 md로 크기를 설정한다.');
});

describe('Checkbox 이벤트 테스트', () => {
  // default
  test.todo('체크박스 영역을 클릭하면 onChange 콜백이 호출된다.');

  // optional
  test.todo('체크박스 키보드 이벤트 테스트');
  test.todo('체크박스 마우스 이벤트 테스트');
  test.todo('체크박스 포커스 이벤트 테스트');
});

describe('Checkbox asChild 테스트', () => {
  test.todo(
    'asChild가 true일 때, children으로 전달된 요소에 Typography 컴포넌트를 적용한다.',
  );

  test.todo('asChild를 주입하지 않으면 p태그로 요소를 그린다.');
});

describe('Checkbox 접근성 테스트', () => {
  // 체크박스에 접근 가능한 레이블이 제공되어야 한다
  // 스크린 리더 사용자가 체크박스의 용도를 확인할 수 있도록 <label>, title, aria-labelledby 중 1가지 방식을 사용해서 레이블을 제공해야 한다.
  // 이때 가능하면 <label>을 사용하여 이용자가 레이블을 클릭하였을 때에도 값을 선택할 수 있도록 구현하는게 좋다.
  test.todo('체크박스에 접근 가능한 레이블이 제공되어야 한다.');
});
