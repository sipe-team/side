# SIDE v2 토큰 네이밍 컨벤션

> 이 문서의 규칙은 `tokens/**/*.json` → codegen → `contract.css.ts` / `themes.css.ts` 파이프라인 전반에 적용된다.

---

## 1. 구분자 결정

세 가지 표현 형식에 서로 다른 구분자를 사용하며, 변환 규칙은 고정이다.

| 형식 | 구분자 | 예시 |
|---|---|---|
| **JSON 키** | `.` (점, 중첩 객체) | `color.blue.500` |
| **VE vars 경로** | `.` (객체 접근) + `[]` (숫자 키) | `vars.color.blue[500]` |
| **CSS 변수명** | `-` (하이픈) | `--side-color-blue-500` |

### 변환 규칙

```
JSON key path: color.blue.500
     ↓  join('-')
CSS var name:  --side-color-blue-500
     ↓  TS 객체 경로
VE vars path:  vars.color.blue['500']
```

> **camelCase 금지**: CSS 변수명에는 하이픈만 사용한다. `--side-fontWeight-bold`가 아니라 `--side-font-weight-bold`.

---

## 2. Primitive Layer 네이밍

### 2.1 색상 (color)

```
color.<hue>.<step>

예시:
  color.gray.50     → --side-color-gray-50
  color.blue.500    → --side-color-blue-500
  color.red.950     → --side-color-red-950
  color.black       → --side-color-black
  color.white       → --side-color-white
```

- `<hue>`: `gray | red | orange | yellow | green | teal | blue | cyan | purple | pink | black | white`
- `<step>`: `50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950`
- `black`, `white`는 step 없이 단일 값
- v1의 `gray50` 형태(camelCase + 숫자 붙이기)는 **폐기** — `.` 분리가 표준

### 2.2 간격 (spacing)

```
spacing.<multiplier>

예시:
  spacing.1   → --side-spacing-1   (= 4px)
  spacing.2   → --side-spacing-2   (= 8px)
  spacing.4   → --side-spacing-4   (= 16px)
```

- 값은 `multiplier × 4px` 규칙으로 계산
- v1의 키(0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)를 유지하되 JSON에서 문자열 키로 저장 (`"1"`, `"2"`)
- `spacing.0`은 `0px`, 토큰으로 정의하되 사용 빈도는 낮다

### 2.3 둥근 모서리 (radius)

```
radius.<scale>

예시:
  radius.none   → --side-radius-none  (= 0)
  radius.sm     → --side-radius-sm    (= 2px)
  radius.md     → --side-radius-md    (= 4px)
  radius.lg     → --side-radius-lg    (= 8px)
  radius.xl     → --side-radius-xl    (= 12px)
  radius.full   → --side-radius-full  (= 9999px)
```

- 스케일: `none | sm | md | lg | xl | full` (v1 동일 유지)

### 2.4 타이포그래피 (typography)

```
typography.fontSize.<value>
typography.fontWeight.<name>
typography.lineHeight.<name>
typography.fontFamily.<name>

예시:
  typography.fontSize.12    → --side-typography-font-size-12
  typography.fontWeight.semiBold → --side-typography-font-weight-semi-bold
  typography.lineHeight.regular  → --side-typography-line-height-regular
```

- `fontSize`: 숫자 값을 키로 사용 (`12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 48`)
- `fontWeight`: 시맨틱 이름 (`regular | medium | semiBold | bold`)
- CSS 변수명 변환 시 camelCase → kebab-case (`semiBold` → `semi-bold`)

### 2.5 그림자 (shadow)

```
shadow.<scale>

예시:
  shadow.none → --side-shadow-none
  shadow.sm   → --side-shadow-sm
  shadow.md   → --side-shadow-md
  shadow.lg   → --side-shadow-lg
  shadow.xl   → --side-shadow-xl
  shadow.2xl  → --side-shadow-2xl
```

### 2.6 Z축 (z)

```
z.<role>

예시:
  z.hide      → --side-z-hide      (= -1)
  z.base      → --side-z-base      (= 0)
  z.dropdown  → --side-z-dropdown  (= 1000)
  z.sticky    → --side-z-sticky    (= 1100)
  z.modal     → --side-z-modal     (= 1400)
  z.toast     → --side-z-toast     (= 1600)
  z.tooltip   → --side-z-tooltip   (= 1700)
```

- v1 `zIndex` 키 이름을 `z`로 단축 (CSS var에서 `z-index`와 혼동 없음)

### 2.7 애니메이션 (motion) — v2 신규

```
motion.duration.<name>
motion.easing.<name>

예시:
  motion.duration.fast    → --side-motion-duration-fast    (= 100ms)
  motion.duration.normal  → --side-motion-duration-normal  (= 200ms)
  motion.duration.slow    → --side-motion-duration-slow    (= 300ms)
  motion.duration.slower  → --side-motion-duration-slower  (= 500ms)

  motion.easing.default   → --side-motion-easing-default   (= ease-in-out)
  motion.easing.decelerate → --side-motion-easing-decelerate (= cubic-bezier(0,0,0.2,1))
  motion.easing.accelerate → --side-motion-easing-accelerate (= cubic-bezier(0.4,0,1,1))
  motion.easing.spring    → --side-motion-easing-spring    (= cubic-bezier(0.4,0,0.2,1))
```

> v1 감사에서 확인된 분산된 duration 값 (`0.15s, 0.2s, 0.3s, 1.2s, 1.5s, 2s`)을 `fast/normal/slow/slower` + 별도 animation 전용 키로 통합

### 2.8 불투명도 (opacity)

```
opacity.<step>

예시:
  opacity.0    → --side-opacity-0    (= 0)
  opacity.50   → --side-opacity-50   (= 0.5)
  opacity.100  → --side-opacity-100  (= 1)
```

- step: `0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100`
- 퍼센트 단위로 표현 (0.5 → `50`)

### 2.9 테두리 (border)

```
border.width.<name>
border.style.<name>

예시:
  border.width.none   → --side-border-width-none   (= 0)
  border.width.thin   → --side-border-width-thin   (= 1px)
  border.width.medium → --side-border-width-medium (= 2px)
  border.width.thick  → --side-border-width-thick  (= 4px)
```

---

## 3. Semantic Layer 네이밍

### 3.1 색상 카테고리 (color)

Semantic 색상은 **역할(role)** 기반으로 명명한다. Primitive에 있는 색상 이름을 Semantic에 쓰지 않는다.

```
color.<category>.<role>[.<variant>]

카테고리:
  text     — 텍스트
  bg       — 배경
  border   — 경계선
  icon     — 아이콘
  status   — 상태 (success/warning/error/info)
  brand    — 테마 브랜드 색
```

**text**

| 키 | 용도 |
|---|---|
| `color.text.primary` | 본문 기본 텍스트 |
| `color.text.secondary` | 보조 텍스트, 설명 |
| `color.text.tertiary` | 더 약한 힌트, placeholder |
| `color.text.disabled` | 비활성 텍스트 |
| `color.text.inverse` | 어두운 배경 위 밝은 텍스트 |
| `color.text.link` | 링크 텍스트 |
| `color.text.onAccent` | accent 배경 위 텍스트 |

**bg**

| 키 | 용도 |
|---|---|
| `color.bg.base` | 페이지 최상위 배경 |
| `color.bg.surface` | 카드·패널 배경 |
| `color.bg.overlay` | 모달·드로어 배경 |
| `color.bg.subtle` | 구분선 없이 영역 구분할 때 |
| `color.bg.accent` | 강조 배경 (brand primary) |
| `color.bg.disabled` | 비활성 입력 배경 |

**border**

| 키 | 용도 |
|---|---|
| `color.border.default` | 일반 경계선 |
| `color.border.subtle` | 미세 구분선 |
| `color.border.focused` | 포커스 링 |
| `color.border.error` | 에러 상태 경계선 |
| `color.border.disabled` | 비활성 경계선 |

**icon**

| 키 | 용도 |
|---|---|
| `color.icon.default` | 기본 아이콘 |
| `color.icon.secondary` | 보조 아이콘 |
| `color.icon.disabled` | 비활성 아이콘 |
| `color.icon.onAccent` | accent 배경 위 아이콘 |

**status**

| 키 | 용도 |
|---|---|
| `color.status.success` | 성공·완료 |
| `color.status.warning` | 경고 |
| `color.status.error` | 오류 (v1 `danger` → `error`로 변경) |
| `color.status.info` | 정보 (v1 `positive` → `info`로 변경) |
| `color.status.success.bg` | 성공 상태 배경 |
| `color.status.error.bg` | 오류 상태 배경 |

> v1 `danger` → `error`, `positive` → `info` 로 명칭 변경. 더 범용적이고 산업 표준에 가깝다.

**brand**

| 키 | 용도 |
|---|---|
| `color.brand.primary` | 테마 주 색상 (SIPE 기수별 상이) |
| `color.brand.secondary` | 테마 보조 색상 |
| `color.brand.gradient` | 그라디언트 (CSS value 전체) |
| `color.brand.onPrimary` | primary 배경 위 텍스트 |

### 3.2 상태 접미사 (state suffix)

상태를 가지는 토큰은 마지막 세그먼트에 상태를 붙인다. 기본 상태(default)는 접미사를 생략한다.

| 접미사 | 의미 | 예시 |
|---|---|---|
| _(없음)_ | 기본 상태 | `color.text.primary` |
| `.hover` | 마우스 오버 | `color.bg.accent.hover` |
| `.active` | 클릭/누름 | `color.bg.accent.active` |
| `.disabled` | 비활성 | `color.text.disabled` |
| `.focus` | 키보드 포커스 | `color.border.focused` (별도 카테고리로 분리) |
| `.selected` | 선택됨 | `color.bg.surface.selected` |

> `focus`는 `color.border.focused`처럼 `border` 카테고리 안에서 표현하는 것을 우선한다. 단독 `color.bg.xxx.focus`는 복합 상태에서만 사용.

---

## 4. 계열 접두사 규칙 요약

| 카테고리 | Primitive 접두사 | Semantic 접두사 | VE vars 경로 |
|---|---|---|---|
| 색상 | `color.<hue>.<step>` | `color.<role>.*` | `vars.color.*` |
| 간격 | `spacing.<n>` | — (Primitive 직접 사용) | `vars.spacing[n]` |
| 둥근 모서리 | `radius.<scale>` | — (Primitive 직접 alias) | `vars.radius.*` |
| 그림자 | `shadow.<scale>` | `shadow.<role>` | `vars.shadow.*` |
| Z축 | `z.<role>` | — (Primitive 직접 사용) | `vars.z.*` |
| 타이포그래피 | `typography.*` | — (Primitive 직접 사용) | `vars.typography.*` |
| 애니메이션 | `motion.duration.*` / `motion.easing.*` | — | `vars.motion.*` |
| 불투명도 | `opacity.<step>` | — | `vars.opacity[n]` |
| 테두리 두께 | `border.width.*` | — | `vars.border.width.*` |

Semantic이 없는 카테고리(spacing, radius 등)는 컴포넌트에서 Primitive vars를 직접 참조한다.

---

## 5. VE Contract 키 규칙

### 숫자 키 처리

TypeScript 객체 키는 숫자로 시작할 수 없다. 숫자 키는 **문자열 키**로 선언한다.

```ts
// 올바른 예
const primitiveVars = createGlobalThemeContract({
  color: {
    gray: {
      '50': null,   // 문자열 키
      '500': null,
      '950': null,
    },
  },
  spacing: {
    '1': null,
    '4': null,
  },
});

// 접근 시
vars.color.gray['500']    // bracket notation
vars.spacing['4']
```

### camelCase → kebab-case 변환

Contract 매핑 함수가 자동으로 변환한다:

```ts
createGlobalThemeContract(
  { typography: { fontWeight: { semiBold: null } } },
  (_, path) => `side-${path.map(toKebab).join('-')}`,
  // → --side-typography-font-weight-semi-bold
);

function toKebab(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
```

---

## 6. JSON 파일 키 예시

### `tokens/primitive/color.json`

```json
{
  "color": {
    "black": { "value": "#131518", "type": "color" },
    "white": { "value": "#ffffff", "type": "color" },
    "gray": {
      "50":  { "value": "#fafafa", "type": "color" },
      "500": { "value": "#71717a", "type": "color" },
      "950": { "value": "#111111", "type": "color" }
    },
    "blue": {
      "500": { "value": "#3b82f6", "type": "color" }
    }
  }
}
```

### `tokens/semantic/light/color.json`

```json
{
  "color": {
    "text": {
      "primary":   { "value": "{color.gray.950}", "type": "color" },
      "secondary": { "value": "{color.gray.600}", "type": "color" },
      "disabled":  { "value": "{color.gray.400}", "type": "color" },
      "inverse":   { "value": "{color.white}",    "type": "color" }
    },
    "bg": {
      "base":    { "value": "{color.gray.50}",  "type": "color" },
      "surface": { "value": "{color.white}",    "type": "color" }
    },
    "status": {
      "success": { "value": "{color.green.500}", "type": "color" },
      "warning": { "value": "{color.orange.400}", "type": "color" },
      "error":   { "value": "{color.red.500}",   "type": "color" },
      "info":    { "value": "{color.blue.400}",  "type": "color" }
    }
  }
}
```

### `tokens/semantic/dark/color.json`

```json
{
  "color": {
    "text": {
      "primary":   { "value": "{color.gray.50}",  "type": "color" },
      "secondary": { "value": "{color.gray.400}", "type": "color" },
      "disabled":  { "value": "{color.gray.600}", "type": "color" },
      "inverse":   { "value": "{color.gray.950}", "type": "color" }
    },
    "bg": {
      "base":    { "value": "{color.gray.950}", "type": "color" },
      "surface": { "value": "{color.gray.900}", "type": "color" }
    }
  }
}
```

---

## 7. 금지 패턴

| 금지 패턴 | 이유 | 대안 |
|---|---|---|
| Semantic에 hex 직접 사용 | 다크모드 전환 불가 | Primitive alias `{color.gray.950}` |
| Primitive에 의미론 이름 | 역할이 고정되어 확장 어려움 | `color.primary` → `color.brand.primary` (Semantic에) |
| 컴포넌트에서 `primitiveVars` import | Primitive는 내부 구현 세부사항 | `vars` (Semantic) 만 import |
| CSS var에 camelCase | CSS 관례 위반 | `--side-font-weight-semi-bold` |
| `danger`, `positive` 이름 | 비표준, 혼동 유발 | `error`, `info` |
| `vars.spacing.xs` 같은 t-shirt size | 범위가 불명확, 확장 어려움 | `vars.spacing['2']` (4px 단위 scale) |

> v1의 `vars.spacing.xs/sm/md/lg/xl` 패턴은 **v2에서 폐기**. 숫자 스케일이 컴포넌트 조합 시 훨씬 예측 가능하다.
