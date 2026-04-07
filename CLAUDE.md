# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드를 다룰 때 참고하는 가이드입니다.

## 프로젝트 개요

**Side (Sipe Design System)** — `@sipe-team/*` 이름으로 GitHub Package Registry에 배포되는 React 컴포넌트 패키지들의 pnpm 모노레포입니다.

## 명령어

```bash
pnpm install                        # 의존성 설치 (pnpm 9.7.1, Node v22)
pnpm dev:storybook                  # Storybook 개발 서버 실행 (:6006)
pnpm build:storybook                # Storybook 빌드
pnpm lint                           # Biome 린트 + 수정 (변경된 패키지)
pnpm format                         # Biome 포맷팅
pnpm test                           # Vitest (변경된 패키지)
pnpm create:component               # 템플릿에서 새 컴포넌트 스캐폴딩
pnpm cz                             # 대화형 conventional commit

# 패키지 단위
pnpm --filter @sipe-team/button test
pnpm --filter @sipe-team/button build
pnpm --filter @sipe-team/button typecheck

# 단일 테스트 파일 실행
pnpm --filter @sipe-team/button vitest run src/Button.test.tsx
```

## 아키텍처

- **`packages/*`** — 개별 컴포넌트 패키지 (button, input, card, chip, skeleton 등)
- **`packages/tokens`** — 디자인 토큰 (색상, 간격, 타이포그래피, 라운딩, 그림자, z-index)을 vanilla-extract contract vars로 export
- **`packages/theme`** — vanilla-extract `assignInlineVars`를 사용한 ThemeProvider, 런타임 테마 전환 (4개 테마, 라이트 모드 기본)
- **`packages/typography`** — Typography 컴포넌트 시스템
- **`www/`** — Docusaurus 문서 사이트

## 컴포넌트 패턴

모든 컴포넌트는 다음 구조를 따릅니다:

1. **`Component.tsx`** — `forwardRef` 래퍼, `ComponentProps<'element'>` 확장, variant enum을 `const` 객체로 정의하고 매칭 타입 생성, Radix `Slot`을 통한 `asChild` 지원
2. **`Component.css.ts`** — Vanilla Extract `recipe()`에 enum 값을 키로 하는 variant 맵, `@sipe-team/tokens`의 `vars` 사용
3. **`Component.stories.tsx`** — `Meta`/`StoryObj` 타입을 사용하는 Storybook
4. **`Component.test.tsx`** — Vitest + `@testing-library/react` (happy-dom 환경)
5. **`index.ts`** — Re-exports

Variant enum 패턴 (값 객체 + 타입 유니온):
```ts
export const ButtonSize = { sm: 'sm', lg: 'lg' } as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
```

클래스 조합: `clsx(styles.recipe({ variant, size }), conditionalStyles, className)`

## 스타일링 규칙

- 모든 스타일은 **vanilla-extract**의 `recipe()`를 사용하여 variant 처리
- 디자인 토큰은 반드시 `import { vars } from '@sipe-team/tokens'`로 import — 색상, 간격, 타이포그래피 값을 하드코딩하지 말 것
- 각 패키지는 소비자를 위해 `./styles.css`를 export

## 린팅 및 포맷팅

- **Biome** (ESLint/Prettier가 아님) — 싱글 쿼트, 스페이스, 줄 너비 120자
- import 순서 강제: node → react → @sipe-team/* → @vanilla-extract/* → @radix-ui/* → 외부 패키지 → 상대 경로 (그룹 사이 빈 줄)
- pre-commit hook이 lint-staged를 통해 `biome check --write --unsafe` 실행

## 커밋 컨벤션

형식: `type(scope): subject` — 영어만, subject 최대 50자, scope 최대 20자.
타입: feat, fix, hotfix, chore, refactor, release, test, docs, ci, build.

## 브랜치 네이밍

`<CATEGORY>/<ISSUENUMBER>-<SUBJECT>` (이슈 번호는 선택)

## 배포

Changesets 기반으로 GitHub Package Registry에 릴리스. 패키지는 타입과 함께 ESM + CJS를 export. 공개 API 변경 시 `.changeset` 파일을 포함하세요.
