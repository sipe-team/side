import '@testing-library/jest-dom';
import { describe, test } from 'vitest';

describe('Input 컴포넌트', () => {
  describe('렌더링', () => {
    test('올바른 타입으로 렌더링된다', () => {});

    test('커스텀 스타일이 input에 적용된다', () => {});

    test('ref가 올바르게 전달된다', () => {});

    test('기본 폰트 사이즈, 폰트 웨이트 적용된다.', () => {});
    
    test('변경 폰트 사이즈, 폰트 웨이트 적용된다.', () => {});
  });
  
  describe('상호작용', () => {
    test('사용자 입력', async () => {});
  });
  
  describe('속성', () => {
    test('disabled 속성이 적용된다', () => {});
  
    test('classNames가 올바르게 적용된다', () => {});
  });
  
  describe('액션 버튼', () => {
    test('Action 버튼이 올바르게 렌더링된다', () => {});

    test('Action 버튼에 커스텀 클래스가 적용된다', () => {});

    test('asChild prop으로 렌더링된 엘리먼트가 slot으로 대체된다', () => {});
  });

  describe('접근성', () => {
    test('name prop이 있을 때 올바른 wrapper role이 적용된다', () => {});

    test('name prop이 없을 때 기본 wrapper role이 적용된다', () => {});
  });
  });
