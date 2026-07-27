---
'@sipe-team/tokens': minor
---

토큰 CSS 체인을 복구하고 `./styles.css` 진입점을 추가합니다.

`packages/tokens/tsup.config.ts`가 21개 패키지 중 유일하게 루트 tsup 설정을 상속하지 않아 vanilla-extract esbuild 플러그인이 누락돼 있었습니다. 그 결과:

- `contract.css.ts`가 일반 TS로 번들되어 **`dist`를 import하면 런타임 예외**가 발생했습니다 (`Styles were unable to be assigned to a file`). `@sipe-team/tokens`를 re-export하는 `@sipe-team/side`도 함께 영향받았습니다.
- `createGlobalTheme` 호출이 `sideEffects: false`로 트리셰이킹되어 `--side-*` 브릿지 CSS가 방출되지 않았습니다.
- 소비자가 토큰 CSS를 가져갈 진입점이 없어, `vars.*`를 쓰는 컴포넌트(Button)의 padding·radius·font-size·font-family·gap이 전부 무효화됐습니다.

**변경 사항**

- `tsup.config.ts`가 루트 설정을 상속합니다 (다른 20개 패키지와 동일한 패턴).
- `sideEffects`를 `["**/*.css"]`로 변경해 소비자의 CSS import가 번들러에 제거되지 않게 합니다.
- `./styles.css` 진입점을 추가합니다. Style Dictionary 값층(`--color-*`, `--spacing-*`)과 vanilla-extract 브릿지(`--side-*`)를 **한 파일로** 제공합니다 — 둘 중 하나만 로드하면 체인이 조용히 끊기기 때문입니다.

**소비자 액션 필요:** 개별 패키지를 사용한다면 `import '@sipe-team/tokens/styles.css'`를 추가해야 컴포넌트 스타일이 적용됩니다.
