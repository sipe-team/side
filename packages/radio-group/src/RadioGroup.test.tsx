import { test } from 'vitest';

test.todo('Radio 컴포넌트가 반드시 RadioGroup 컴포넌트 내에 있어야 한다.');

test.todo('Radio 옵션이 정확히 렌더링 된다.');

test.todo('Radio 아이템을 클릭하면 해당 indicator가 활성화되어야 한다.');

test.each(['small', 'medium', 'large'])(
  '%s 크기로 RadioGroup 컴포넌트 크기를 결정한다.',
  () => {},
);

test.todo('RadioGroup이 비활성화(disabled) 상태일 경우 선택할 수 없어야 한다.');

test.todo('Radio가 비활성화(disabled) 상태일 경우 선택할 수 없어야 한다.');

test.todo('초기 설정된 기본값이 있다면 해당 Radio가 먼저 선택되어야 한다.');

test.todo('RadioGroup이 올바른 aria-label 또는 aria-labelledby를 갖는다');

test.todo('Radio가 클릭될 때 지정된 이벤트 핸들러가 호출된다');
