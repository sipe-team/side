# SIDE v2 토큰 아키텍처

## 1. 레퍼런스 디자인 시스템 비교

| 시스템 | 계층 수 | Primitive 키 | Semantic 키 예시 | 다크모드 전환 | 비고 |
|---|---|---|---|---|---|
| **Toss TDS** | 2 (Primitive → Semantic) | `blue-500` | `color-background-primary` | `data-tds-theme` attribute | Semantic만 CSS var 노출 |
| **Atlassian** | 3 (Base → Semantic → Component) | `color.blue.500` | `color.text.accent.blue` | `data-color-mode` attribute | Component 계층이 방대해 유지보수 부담 |
| **Adobe Spectrum** | 3 (Global → Alias → Component) | `--spectrum-blue-500` | `--spectrum-accent-color-default` | CSS selector 교체 | Alias = Semantic, 가장 세분화 |
| **shadcn/ui** ⚠️ | 2 (Scale → Semantic) | 직접 노출 안 함 | `--background`, `--primary` | `.dark` class | 컴포넌트 모음이지 디자인 시스템이 아님 — 토큰 구조 레퍼런스로만 참고 |
| **Radix Colors** ⚠️ | 1 (Primitive scale 제공) | `--blue-9` (12단계) | Semantic은 소비자가 정의 | 별도 dark scale 제공 | 색상 팔레트 도구 — 디자인 시스템 아님. 단계별 의미 고정(9=solid, 11=text)이 Primitive 설계에 참고할 만함 |
| **11번가** | 2 (Brand → Semantic) | `Gray_01`, `11STREET_Red` | `text-primary`, `icon-disabled` | 없음 (라이트 전용) | 브랜드 색상 중심; CSS var 기반 테마 없음 |
| **쏘카 SOCARFRAME 2.0** | 3 (Primitive → Semantic → Component) | `tw-blue-100` | `tw-text-primary-strong` | `data-theme` attribute | Tailwind 기반 — VE 미사용; Figma Code Connect 연동 |
| **G마켓 GDS** | 2 (Core Palette → Semantic) | `Green-500`, `Gray-900` | `text-primary`, `bg-white` | 없음 (라이트 전용) | 2021년 v1.0; WCAG 2.0 기반 색상 스케일 |
| **라인 LDSM** | 2+ (Primitive → Semantic 확인) | 미공개 (SPA 렌더링) | `line-semantic-colors` | 미확인 | Semantic 계층 존재 확인; 컴포넌트 라이브러리 규모 큼 |
| **카카오스타일 지그재그** ✅ | 2 (Primitive → Semantic) | 미공개 | — | `data-theme` attribute | **VE `createGlobalThemeContract` 사용** — 현 프로젝트와 구조 가장 유사 |

- **Toss**: Component 계층은 컴포넌트 `.css.ts` 내부 변수로 처리해서 2계층으로 충분함
- **Atlassian**: Component 계층을 토큰 패키지에 넣으면 컴포넌트 변경마다 토큰 패키지 릴리스가 강제되는 결합이 생김
- **Radix Colors**: 단계별 의미를 고정한 방식(9=solid bg, 11=text)이 Semantic 색상 역할 분리에 참고할 만함
- **shadcn/ui**: HSL 분리 대신 opacity 변형이 필요한 색상은 별도 토큰으로 명시하는 게 VE 방식에 더 맞음
- **카카오스타일**: VE 기반 한국 디자인 시스템 중 가장 직접적인 레퍼런스 — [기술 블로그](https://devblog.kakaostyle.com/ko/2024-12-13-1-rebuilding-frontend-design-system/) 참고

---

## 2. 계층 구조 결정

```
┌──────────────────────────────────────────────────┐
│  Semantic Layer  (목적·의미 기반 alias)           │
│  vars.color.text.primary                         │
│  vars.color.bg.surface                           │
│  CSS: --side-color-text-primary                  │
└────────────────────┬─────────────────────────────┘
                     │ alias only
┌────────────────────▼─────────────────────────────┐
│  Primitive Layer  (원시값 척도)                   │
│  vars.color.blue[500]                            │
│  vars.spacing[4]                                 │
│  CSS: --side-color-blue-500                      │
└──────────────────────────────────────────────────┘
```

## 3. 계층별 허용 범위 원칙

### Primitive Layer

- hex, px, rem, ms, 숫자 스케일 값 등 원시값만 허용
- 다른 토큰 참조, 의미론적 이름 사용은 하지 않음 
- 라이트/다크 모드에 따라 값이 바뀌지 않는다 — 순수 팔레트

```json
// 올바른 예
{ "color": { "blue": { "500": "#3b82f6" } } }

// 금지 예 — Primitive에 Semantic 명명을 쓰는 것
{ "color": { "primary": "#3b82f6" } }
```

### Semantic Layer

- Primitive token에 대한 alias만 허용
- hex, px 등 원시값 직접 사용 금지
- 모드(light/dark)마다 **동일 키에 다른 Primitive를 할당**하는 방식으로 구현

```json
// 올바른 예 — Primitive alias
{ "color": { "text": { "primary": "{color.gray.950}" } } }

// 금지 예 — Primitive 값 직접 기입
{ "color": { "text": { "primary": "#131518" } } }
```

---

## 4. Vanilla Extract 파일 역할 정의

### 파일 목록

```
packages/tokens/src/
├── primitive/
│   └── theme.css.ts         # createGlobalTheme — 단일 구현, contract 불필요
├── semantic/
│   ├── contract.css.ts      # createGlobalThemeContract (prefix 적용) — Semantic CSS var 계약 선언
│   ├── _values.ts           # light/dark 순수 값 객체 (CSS 생성 없음)
│   ├── light.css.ts         # createGlobalTheme(':root', ...) — 라이트 모드 값
│   └── dark.css.ts          # createGlobalTheme + globalStyle @media — 다크 모드 값
└── index.ts                 # vars (semantic)만 re-export
```

### `primitive/theme.css.ts`

구현체가 하나뿐이므로 contract 없이 `createGlobalTheme`만으로 충분하다. 반환값 `primitiveVars`는 패키지 내부(`semantic/`)에서만 참조하며 외부로 노출하지 않는다.

```ts
import { createGlobalTheme } from '@vanilla-extract/css';

// 단일 전역 주입 — 모드와 무관하게 항상 동일한 값
// primitiveVars는 semantic 계층 내부 전용 — index.ts에서 export하지 않는다
export const primitiveVars = createGlobalTheme(':root', {
  color: {
    blue: { '500': '#3b82f6', '600': '#2563eb' },
    gray: { '50': '#fafafa', '950': '#111111' },
  },
  spacing: { '1': '4px', '2': '8px' },
  // ...
});
```

### `semantic/contract.css.ts`

```ts
import { createGlobalThemeContract } from '@vanilla-extract/css';

export const vars = createGlobalThemeContract(
  {
    color: {
      text: { primary: null, secondary: null, disabled: null, inverse: null, /* ... */ },
      bg: { base: null, surface: null, overlay: null, /* ... */ },
      border: { default: null, focused: null, error: null, /* ... */ },
      icon: { default: null, secondary: null, disabled: null },
      status: { success: null, warning: null, error: null, info: null },
      // 테마 브랜드 색상
      brand: { primary: null, secondary: null, gradient: null },
    },
    // Semantic spacing/radius는 Primitive를 그대로 alias
    // 컴포넌트에서 vars.radius.md 처럼 쓰기 위해 재노출
    radius: { none: null, sm: null, md: null, lg: null, xl: null, full: null },
  },
  (_, path) => `side-${path.join('-')}`,
);
```

### `semantic/_values.ts`

CSS를 생성하지 않는 순수 값 객체. `light.css.ts`와 `dark.css.ts` 두 파일이 동일한 값 객체를 각각 참조해야 하므로 별도 분리한다.

```ts
// _values.ts
import { primitiveVars } from '../primitive/theme.css';

export const lightValues = {
  color: {
    text: {
      primary: primitiveVars.color.gray['950'],
      secondary: primitiveVars.color.gray['600'],
      disabled: primitiveVars.color.gray['400'],
      inverse: primitiveVars.color.gray['50'],
    },
    bg: {
      base: primitiveVars.color.gray['50'],
      surface: primitiveVars.color.white,
    },
    brand: {
      primary: '#f4a1a0',  // 예외: 브랜드 색은 테마별 고유값
    },
    // ...
  },
  radius: primitiveVars.radius,
  // ...
};

export const darkValues = {
  color: {
    text: {
      primary: primitiveVars.color.gray['50'],
      secondary: primitiveVars.color.gray['400'],
      disabled: primitiveVars.color.gray['600'],
      inverse: primitiveVars.color.gray['950'],
    },
    bg: {
      base: primitiveVars.color.gray['950'],
      surface: primitiveVars.color.gray['900'],
    },
    // ...
  },
  // ...
};
```

### `semantic/dark.css.ts`

다크 모드가 기본값이므로 `:root`에 darkValues를 주입한다.

```ts
import { createGlobalTheme } from '@vanilla-extract/css';
import { vars } from './contract.css';
import { darkValues } from './_values';

// 기본값: 다크 모드
createGlobalTheme(':root', vars, darkValues);
```

### `semantic/light.css.ts`

`createGlobalTheme`은 빌드타임 함수라 미디어 쿼리 안에 직접 넣을 수 없다. `data-mode="light"` 단독으로는 `prefers-color-scheme: light` 유저를 JS 토글 없이 커버할 수 없으므로 `globalStyle`로 시스템 라이트모드를 별도 처리한다.

우선순위: `[data-mode="light"]` selector specificity > `@media` → `data-mode`가 명시된 경우 항상 우선된다. 단, 사용자가 시스템을 라이트로 설정했는데 `data-mode="dark"`가 명시된 경우 `@media`가 이겨버리는 충돌이 생기므로 이를 방어하는 `[data-mode="dark"]` override를 추가한다.

```ts
import { assignVars, createGlobalTheme, globalStyle } from '@vanilla-extract/css';
import { vars } from './contract.css';
import { darkValues, lightValues } from './_values';

// ① JS 토글 방식 (data-mode attribute 기반)
createGlobalTheme('[data-mode="light"]', vars, lightValues);

// ② 시스템 라이트모드 (JS 토글 없이도 동작)
globalStyle('body', {
  '@media': {
    '(prefers-color-scheme: light)': {
      vars: assignVars(vars, lightValues),
    },
  },
});

// ③ data-mode="dark" 명시 시 @media를 덮어씀 (우선순위 방어)
globalStyle('[data-mode="dark"]', {
  vars: assignVars(vars, darkValues),
});
```

> **설계 원칙**: `light.css.ts` / `dark.css.ts`는 **codegen 대상**이다. `tokens/**/*.json`에서 자동 생성되며, 수동 편집하지 않는다. `contract.css.ts`는 타입 계약이므로 JSON 스키마 변경 시 함께 갱신된다.

---

## 5. 다크 모드 확장성

### 파일 구조

```
tokens/
├── primitive/
│   ├── color.json          # 불변 팔레트 (모드 무관)
│   ├── spacing.json
│   ├── radius.json
│   └── typography.json
└── semantic/
    ├── light/
    │   └── color.json      # 라이트 모드 alias 맵
    ├── dark/
    │   └── color.json      # 다크 모드 alias 맵
    └── brand/
        ├── 1st.json        # 각 SIPE 기수별 브랜드 색
        ├── 2nd.json
        ├── 3rd.json
        └── 4th.json
```

### Theme Switching 메커니즘

```
<html data-mode="light" data-theme="4th">
  → vars가 semantic/light + brand/4th 조합으로 결정됨

<html data-mode="dark" data-theme="4th">
  → vars가 semantic/dark + brand/4th 조합으로 결정됨
```

CSS 우선순위:
1. `:root` — 기본 다크 모드 (4th 테마)
2. `@media (prefers-color-scheme: light)` — 시스템 라이트모드 (JS 토글 없이 동작)
3. `[data-mode="light"]` — 라이트 모드 명시 override (②보다 specificity 높음)
4. `[data-mode="dark"]` — 다크 모드 명시 override (②의 @media 충돌 방어)
5. `[data-theme="Nth"]` — 브랜드 색상 override (primary, secondary, gradient)

### Tokens Studio Sets 구조

```
Sets:
  - primitive/color        (global, always active)
  - primitive/spacing      (global, always active)
  - primitive/radius       (global, always active)
  - primitive/typography   (global, always active)
  - semantic/light/color   (theme set: mode=light)
  - semantic/dark/color    (theme set: mode=dark)
  - brand/1st              (theme set: theme=1st)
  - brand/2nd              (theme set: theme=2nd)
  - brand/3rd              (theme set: theme=3rd)
  - brand/4th              (theme set: theme=4th)
```

---

## 6. Vanilla Extract Contract 패턴

### createGlobalThemeContract의 역할

`createGlobalThemeContract`는 **타입의 근거**다:
- CSS 변수명을 매핑 함수 하나로 일관되게 결정한다.
- TypeScript 타입을 생성해 잘못된 토큰 참조를 컴파일 타임에 잡는다.
- `createGlobalTheme`에 값 주입 시 계약 키를 모두 채웠는지 타입으로 강제한다.

```ts
// contract가 있으면 이 코드는 타입 에러
createGlobalTheme(':root', vars, {
  color: { text: { primary: '#000' } }
  // TS Error: color.text.secondary 누락
});
```

### 컴포넌트에서의 사용

```ts
// packages/button/src/Button.css.ts
import { vars } from '@sipe-team/tokens'; // Semantic vars만 import

export const buttonRecipe = recipe({
  base: {
    backgroundColor: vars.color.bg.surface,
    color: vars.color.text.primary,
    borderRadius: vars.radius.md,
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.brand.primary,
      },
    },
  },
});
```

컴포넌트는 **Semantic vars만** import한다. `primitiveVars`는 `semantic/` 내부에서만 참조하며, `index.ts`에서 export하지 않는다. 소비자가 `primitiveVars.color.blue['500']`을 컴포넌트에 직접 사용하기 시작하면 semantic 계층이 형식적으로 전락하므로 노출 자체를 차단한다.

```ts
// index.ts
export { vars } from './semantic/contract.css';   // 소비자용
// primitiveVars는 export하지 않는다
```
