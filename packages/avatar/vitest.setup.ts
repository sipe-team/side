// vitest에서 기본적으로 제공하는 matcher 외에도 DOM 환경에서 유용하게 사용가능한 다양한 matcher를 제공
// ex) expect(foo).toBeInTheDocument();
// 얘가 없으면 Avatar.test.tsx에서 error가 발생함
import '@testing-library/jest-dom';
