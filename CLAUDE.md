# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드를 다룰 때 참고하는 가이드입니다.

## 프로젝트 개요

**Side (Sipe Design System)** — `@sipe-team/*` 이름으로 GitHub Package Registry에 배포되는 React 컴포넌트 패키지들의 pnpm 모노레포입니다.

## 명령어

```bash
mise install                        # Node v22.22.2 + pnpm 10.33.0 설치 (.mise.toml 기반)
pnpm install                        # 의존성 설치 (pnpm 10.33.0, Node v22.22.2)
pnpm dev:storybook                  # Storybook 개발 서버 실행 (:6006) — root에서만
pnpm build:storybook                # Storybook 빌드 — root에서만
pnpm lint                           # Biome 린트 + 수정 (변경된 패키지)
pnpm format                         # Biome 포맷팅
pnpm test                           # Vitest (변경된 패키지)
pnpm check:package-consistency      # package.json 정책 점검
pnpm create:component               # 템플릿에서 새 컴포넌트 스캐폴딩
pnpm cz                             # 대화형 conventional commit

# 패키지 단위
pnpm --filter @sipe-team/button test
pnpm --filter @sipe-team/button build
pnpm --filter @sipe-team/button typecheck

# 단일 테스트 파일 실행
pnpm --filter @sipe-team/button vitest run src/Button.test.tsx
```

Storybook은 **root 워크스페이스 전용**입니다. 루트 `.storybook/main.ts`가 `packages/**/*.stories.*`를 자동 수집하므로 개별 패키지에 `dev:storybook`/`build:storybook` 스크립트를 추가하지 마세요. 정책 checker가 extra script로 감지합니다.

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

`type(scope): subject` — [conventional commits](https://www.conventionalcommits.org/) + [`config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional).
타입: `build | chore | ci | docs | feat | fix | perf | refactor | revert | style | test`

## 브랜치 네이밍

`<CATEGORY>/<SUBJECT>-<USERNAME>` — 하이픈 최소 1개 필수.
카테고리: `feature | fix | docs | style | refactor | test | deploy | chore | settings`
특수: `main`, `dev/*`

## 배포

Changesets 기반으로 GitHub Package Registry에 릴리스. 패키지는 타입과 함께 ESM + CJS를 export. 공개 API 변경 시 `.changeset` 파일을 포함하세요.

## package.json 일관성 정책

- 정책 파일: `package-policy.json` (스키마는 `package-policy.schema.json`, 에디터 자동완성용)
- 로컬 점검: `pnpm check:package-consistency`
- CI: `.github/workflows/consistency.yaml`이 매 PR에서 실행되어 Step Summary에 리포트 (논블로킹)
- 의도된 예외는 `package-policy.json`의 `allowlist`에 `reason`과 함께 등록. `reason`은 필수(빈 문자열이면 zod가 rejection)