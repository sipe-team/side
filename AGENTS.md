# 저장소 가이드라인

## 프로젝트 구조 및 모듈 구성

`packages/*`에 배포 가능한 컴포넌트와 유틸리티가 위치합니다. 각 패키지는 `src/`에 구현체를, `tsup.config.ts`에 빌드 설정을, 컴포넌트 파일 옆에 테스트/스토리를 둡니다. `packages/tokens`는 공유 디자인 토큰을 정의하고, `packages/side`는 전체 export를 집계합니다. `www/`는 Docusaurus 문서 앱이며, `docs/`와 `www/docs/`에 MDX 콘텐츠가 있습니다. 공유 정적 자산은 `public/`과 `www/static/`에 둡니다. 새 컴포넌트는 폴더를 복사하지 말고 `.templates/component`와 `scripts/createComponent.ts`로 스캐폴딩하세요. 배포 패키지가 변경되면 `.changeset/`에 릴리스 노트를 추가하세요.

## 빌드, 테스트, 개발 명령어

- `pnpm install`: Node `22` 환경에서 워크스페이스를 설치합니다.
- `pnpm create:component`: 템플릿에서 새 컴포넌트 패키지를 스캐폴딩합니다.
- `pnpm dev:storybook`: `http://localhost:6006`에서 Storybook을 실행합니다.
- `pnpm test`: `packages/*`에 대한 Vitest 워크스페이스를 실행합니다.
- `pnpm --filter ./packages/button build`: `tsup`으로 단일 패키지를 빌드합니다. 편집 중인 패키지 경로로 교체하세요.
- `pnpm --filter ./www dev`: 문서 사이트를 로컬에서 시작합니다.
- `pnpm format` / `pnpm lint`: Biome 포맷팅 및 린트 수정을 적용합니다.

## 코딩 스타일 및 네이밍 컨벤션

strict TypeScript를 사용하고, 각 패키지의 `src/index.ts`에서 공개 API를 명시하세요. Biome이 포맷팅 기준입니다: 들여쓰기는 스페이스, 싱글 쿼트, 줄 너비 `120`자. 기존 네이밍 패턴을 따르세요: 패키지 폴더는 kebab-case, React 컴포넌트는 PascalCase, 테스트는 `*.test.tsx`, 스토리는 `*.stories.tsx`, vanilla-extract 스타일은 `*.css.ts`. 색상, 간격, 라운딩 값은 하드코딩하지 말고 `packages/tokens` 값을 사용하세요.

## 테스트 가이드라인

모든 동작 변경에 대해 Vitest 커버리지를 추가하거나 업데이트하세요. 테스트는 `happy-dom` 환경에서 실행되며, 검증 대상 컴포넌트 옆에 위치해야 합니다. 접근성 상태, variant 렌더링, controlled/uncontrolled 동작을 커버하세요. Storybook 스토리는 수동 리뷰에 도움이 되지만 테스트를 대체하지 않습니다. 문서 변경은 `pnpm --filter ./www build`로, 컴포넌트 작업은 Storybook에서 해당 스토리를 확인하세요.

## 커밋 및 PR 가이드라인

`feat(chip): add removable variant`와 같은 Conventional Commits를 사용하세요. scope는 짧게, subject는 영어로, `commitlint.config.ts`를 만족하도록 50자 이내로 작성하세요. PR은 `.github/PULL_REQUEST_TEMPLATE.md`를 따르세요: 변경 사항 요약, UI 변경 시 시각 자료 첨부, 스펙과 테스트 추가 여부 확인. 배포 패키지에 영향을 주는 변경이면 `.changeset` 항목을 포함하고 PR 설명에 릴리스 영향을 명시하세요.
