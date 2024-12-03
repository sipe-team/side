import { defineConfig } from 'vitest/config';

export default defineConfig({
  // 테스트와 관련한 설정
  test: {
    // 테스트를 실행할 환경
    // default: 'node'
    // 브라우저 환경에서 테스트를 희망시 - 'jsdom' 또는 'happy-dom'으로 설정
    environment: 'happy-dom',

    // 글로벌 API를 사용할지 여부를 선택
    // ex) describe, it, expect 등
    globals: true,

    // 테스트 실행 환경에 필요한 스크립트를 불러올 수 있음
    // ex) 모듈 mokcing, matcher extend 등
    setupFiles: './vitest.setup.ts',
    passWithNoTests: true,
    watch: false,
    css: true,
  },

  // 환경별로 설정해주어야하는 추가 기능을 플러그인으로 주입 가능
  // ex) vite-tsconfig-paths
  plugins: [],
});
