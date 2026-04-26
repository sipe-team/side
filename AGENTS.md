# 저장소 가이드라인

> AI 코딩 에이전트(Claude Code, Codex, Jules, Cursor 등)가 이 저장소에서 작업할 때 참고하는 가이드입니다.
>
> **References:** [AGENTS.md 공식 스펙](https://agents.md/) · [AGENTS.md 한국어 설명](https://daleseo.com/agents-md/)

## 프로젝트 구조 및 모듈 구성

`packages/*`에 배포 가능한 컴포넌트와 유틸리티가 위치합니다. 각 패키지는 `src/`에 구현체를, `tsup.config.ts`에 빌드 설정을, 컴포넌트 파일 옆에 테스트/스토리를 둡니다. `packages/tokens`는 공유 디자인 토큰을 정의하고, `packages/side`는 전체 export를 집계합니다. `www/`는 Docusaurus 문서 앱이며, `docs/`와 `www/docs/`에 MDX 콘텐츠가 있습니다. 공유 정적 자산은 `public/`과 `www/static/`에 둡니다. 새 컴포넌트는 폴더를 복사하지 말고 `.templates/component`와 `scripts/createComponent.ts`로 스캐폴딩하세요. 배포 패키지가 변경되면 `.changeset/`에 릴리스 노트를 추가하세요.

## 빌드, 테스트, 개발 명령어

```bash
mise install                        # Node v22.22.2 + pnpm 10.33.0 설치 (.mise.toml 기반)
pnpm install                        # 의존성 설치 (pnpm 10.33.0, Node v22.22.2)
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

# 문서 사이트
pnpm --filter ./www dev
pnpm --filter ./www build
```

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

## 코딩 스타일 및 네이밍 컨벤션

strict TypeScript를 사용하고, 각 패키지의 `src/index.ts`에서 공개 API를 명시하세요. Biome이 포맷팅 기준입니다: 들여쓰기는 스페이스, 싱글 쿼트, 줄 너비 `120`자. 기존 네이밍 패턴을 따르세요: 패키지 폴더는 kebab-case, React 컴포넌트는 PascalCase, 테스트는 `*.test.tsx`, 스토리는 `*.stories.tsx`, vanilla-extract 스타일은 `*.css.ts`.

import 순서 강제: `node → react → @sipe-team/* → @vanilla-extract/* → @radix-ui/* → 외부 패키지 → 상대 경로` (그룹 사이 빈 줄). pre-commit hook이 lint-staged를 통해 `biome check --write --unsafe` 실행.

## 테스트 가이드라인

모든 동작 변경에 대해 Vitest 커버리지를 추가하거나 업데이트하세요. 테스트는 `happy-dom` 환경에서 실행되며, 검증 대상 컴포넌트 옆에 위치해야 합니다. 접근성 상태, variant 렌더링, controlled/uncontrolled 동작을 커버하세요. Storybook 스토리는 수동 리뷰에 도움이 되지만 테스트를 대체하지 않습니다. 문서 변경은 `pnpm --filter ./www build`로, 컴포넌트 작업은 Storybook에서 해당 스토리를 확인하세요.

## 커밋 및 PR 가이드라인

[Conventional Commits](https://www.conventionalcommits.org/) 사용. 커밋 타입: `build | chore | ci | docs | feat | fix | perf | refactor | revert | style | test` ([`config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) 기준). 브랜치: `<CATEGORY>/<SUBJECT>-<USERNAME>` (하이픈 최소 1개). 카테고리: `feature | fix | docs | style | refactor | test | deploy | chore | settings`. 특수 브랜치 `main`, `dev/*`는 규칙 제외. PR은 `.github/PULL_REQUEST_TEMPLATE.md` 준수. 배포 패키지 변경 시 `.changeset` 항목 포함.

## 배포

Changesets 기반으로 GitHub Package Registry에 릴리스. 패키지는 타입과 함께 ESM + CJS를 export. 공개 API 변경 시 `.changeset` 파일을 포함하세요.
