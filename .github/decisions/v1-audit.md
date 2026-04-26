# v1 토큰 사용 현황 감사

> 작성일: 2026-04-17  
> 목적: v2 설계 의사결정을 위한 v1 토큰 정의·사용 현황 파악

---

## 1. 토큰 정의 목록 (`packages/tokens`)

### 1.1 Color

**Primitive (팔레트)**

| 그룹 | 범위 | 예시 |
|------|------|------|
| black/white | 2개 | `#131518`, `#ffffff` |
| gray | 50–950 (11단계) | `#fafafa` ~ `#111111` |
| red | 50–950 (11단계) | `#fef2f2` ~ `#1f0808` |
| orange | 50–950 (11단계) | `#fff7ed` ~ `#220a04` |
| yellow | 50–950 (11단계) | `#fefce8` ~ `#281304` |
| green | 50–950 (11단계) | `#f0fdf4` ~ `#03190c` |
| teal | 50–950 (11단계) | `#f0fdfa` ~ `#021716` |
| blue | 50–950 (11단계) | `#eff6ff` ~ `#0c142e` |
| cyan | 50–950 (11단계) | `#ecfeff` ~ `#051b24` |
| purple | 50–950 (11단계) | `#faf5ff` ~ `#1a032e` |
| pink | 50–950 (11단계) | `#fdf2f8` ~ `#2c0514` |

**Semantic**

| 키 | 참조 | 실제 값 |
|---|---|---|
| success | green500 | `#22c55e` |
| warning | orange400 | `#fb923c` |
| danger | red500 | `#ef4444` |
| positive | blue400 | `#60a5fa` |

**Theme (4개 테마)**

| 테마 | primary | secondary | background |
|------|---------|-----------|------------|
| theme1st | `#01fe13` | `#01fe13` | `#000000` |
| theme2nd | `#03ff31` | `#06ffe3` | `#131518` |
| theme3rd | `#00ffff` | `#00ff99` | `#0d0d0d` |
| theme4th | `#f4a1a0` | `#f4a1a0` | `#0f1010` |

---

### 1.2 Typography

| 카테고리 | 값 |
|---------|---|
| fontSize | 12, 14, 16, 18, 20, 24, 28, 32, 36, 48 |
| fontWeight | regular(400), medium(500), semiBold(600), bold(700) |
| lineHeight | regular(1.5), compact(1.3) |

---

### 1.3 Effects

**Border Radius**

| 키 | 값 |
|---|---|
| none | 0 |
| sm | 2px |
| md | 4px |
| lg | 8px |
| xl | 12px |
| full | 9999px |

**Shadows**

| 키 | 값 |
|---|---|
| none | none |
| sm | `0 1px 2px 0 rgba(0,0,0,0.05)` |
| md | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)` |
| lg | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` |
| xl | `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)` |
| 2xl | `0 25px 50px -12px rgba(0,0,0,0.25)` |

**Z-Index**

| 키 | 값 |
|---|---|
| hide | -1 |
| base | 0 |
| dropdown | 1000 |
| sticky | 1100 |
| fixed | 1200 |
| overlay | 1300 |
| modal | 1400 |
| popover | 1500 |
| toast | 1600 |
| tooltip | 1700 |

**Opacity**: 0, 0.05, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 0.95, 1 (15단계)

**Border Width**: none(0), thin(1px), medium(2px), thick(4px)

**Border Style**: solid, dashed, dotted

---

### 1.4 Layout

**Spacing**

| 키 | 값 |
|---|---|
| 0 | 0px |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 16 | 64px |
| 20 | 80px |
| 24 | 96px |

**Breakpoints**: sm(0), md(780px), lg(1060px)

**Grid**: 12컬럼, gutter sm(8)/md(16)/lg(24)

---

### 1.5 Theme Contract Vars (`vars`)

`packages/tokens/src/theme/contract.css.ts` 에서 export되는 CSS 변수 계약:

- `vars.color`: primary, secondary, background, text, gradient
- `vars.spacing`: xs, sm, md, lg, xl
- `vars.typography.fontSize`: 050–900
- `vars.typography.lineHeight`: regular, compact
- `vars.typography.fontWeight`: regular, medium, semiBold, bold
- `vars.typography.fontFamily`
- `vars.radius`: none, sm, md, lg, xl, full
- `vars.shadows`: none, sm, md, lg, xl, 2xl
- `vars.mode`, `vars.theme`

---

## 2. 컴포넌트별 토큰 사용 매트릭스

| 패키지 | `@sipe-team/tokens` import | `vars` 사용 | 하드코딩 |
|-------|---------------------------|-------------|---------|
| button | ✅ `vars` | ✅ | ✗ |
| input | ⚠️ `color` (raw 팔레트) | ✗ | ✅ |
| card | ⚠️ `color` (raw 팔레트) | ✗ | ✅ |
| badge | ⚠️ `color`, `fontSize` (raw) | ✗ | ✅ |
| chip | ⚠️ `color` (raw 팔레트) | ✗ | ✅ |
| checkbox | ⚠️ `color` (raw 팔레트) | ✗ | ✅ |
| radio | ⚠️ `color` (raw 팔레트) | ✗ | ✅ |
| switch | ⚠️ `color` (raw 팔레트) | ✗ | ✅ |
| accordion | ⚠️ `color` (raw 팔레트) | ✗ | ✅ |
| avatar | ✗ | ✗ | ✅ |
| skeleton | ⚠️ `color`, `radius` (raw) | ✅ (radius만) | ✅ |
| tooltip | ✗ | ✗ | ✅ |
| divider | ⚠️ `color` (raw 팔레트) | ✗ | ✅ |
| flex | ✗ | ✗ | ✗ (레이아웃 유틸) |
| grid | ✗ | ✗ | ✗ (레이아웃 유틸) |
| typography | ✅ `fontSize`, `fontWeight`, `lineHeight` | ✅ | ✗ |

> **요약**: `button`, `typography` 만 `vars`를 올바르게 사용. 대부분의 컴포넌트는 raw 팔레트 값(`color.grayXXX`)을 직접 참조하거나 hex/px를 하드코딩.

---

## 3. 누락 토큰 유형

| 카테고리 | 상태 | 비고 |
|---------|------|------|
| Animation Duration | ❌ 미정의 | 0.15s, 0.2s, 0.3s, 1.5s, 2s 등 분산 사용 |
| Animation Easing | ❌ 미정의 | ease-in-out, cubic-bezier(0.4,0,0.2,1), ease 등 분산 사용 |
| Component Dimensions | ❌ 미정의 | 버튼 height, 아바타 size, 칩 height 등 컴포넌트별 직접 기입 |
| Spacing (px단위 직접) | ⚠️ 부분 정의 | `vars.spacing` xs–xl 정의되어 있으나 컴포넌트에서 미사용 |
| Box Shadow (커스텀) | ⚠️ 부분 정의 | shadows 토큰 존재하나 컴포넌트에서 미사용 |
| Z-Index | ⚠️ 부분 정의 | 토큰 정의되어 있으나 Tooltip에서 `zIndex: 1000` 직접 기입 |
| Border Width | ⚠️ 부분 정의 | 토큰 정의되어 있으나 `1px` 직접 기입 |
| Outline / Focus Ring | ❌ 미정의 | outline-offset(2px, 3px), outline-color 직접 기입 |

---

## 4. 컴포넌트별 하드코딩 값 수집

### 4.1 Border-Radius

| 값 | 사용 컴포넌트 | 대응 토큰 |
|---|---|---|
| `2px` | skeleton (radius.sm 사용) | `vars.radius.sm` ✅ |
| `4px` | checkbox, avatar, tooltip, switch | `vars.radius.md` (미사용) |
| `8px` | card, accordion, tooltip, input | `vars.radius.lg` (미사용) |
| `12px` | card, accordion | `vars.radius.xl` (미사용) |
| `50%` / `100px` / `100px` | radio, avatar, chip | `vars.radius.full` (미사용) |
| `9999px` | chip | `vars.radius.full` (미사용) |

### 4.2 Transition / Animation

| 값 | 사용 컴포넌트 |
|---|---|
| `0.15s ease-in-out` | checkbox, radio |
| `0.2s ease-in-out` | button, chip |
| `0.3s ease-in-out` | tooltip |
| `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | accordion (height) |
| `0.3s ease` | accordion (transform), skeleton |
| `150ms ease-in-out` | switch |
| `1.2s ease-in-out infinite` | skeleton |
| `1.5s ease-in-out infinite` | skeleton |
| `2s ease-in-out infinite` | skeleton |
| `2s infinite` | skeleton |

### 4.3 Spacing (padding / margin / gap)

| 값 | 사용 컴포넌트 |
|---|---|
| `4px` | chip, badge |
| `6px` | checkbox (container padding), radio (container gap) |
| `8px` | input, tooltip, radio, switch, badge, chip, checkbox |
| `10px` | checkbox, radio (lg size) |
| `12px` | input, badge, accordion, chip |
| `16px` | input, accordion, badge, chip |
| `20px` | card, accordion, chip |
| `24px` | badge |
| `-1px` | switch (thumb 위치 계산) |

### 4.4 색상 하드코딩 (토큰 미참조)

| 값 | 사용 컴포넌트 | 비고 |
|---|---|---|
| `#3B82F6` | checkbox | checked 상태 배경 (blue500에 해당) |
| `#1a202c` | accordion | 배경색 |
| `#2d3748` | accordion, avatar | 배경색 / 텍스트색 |
| `#e2e8f0` | avatar | 배경색 |
| `#000000` | tooltip | CSS 변수 fallback |
| `#ffffff` | tooltip | 텍스트색 |
| `rgba(0, 0, 0, 0.2)` | tooltip | box-shadow |
| `#ccc`, `#f9f9f9`, `#e6e6e6` | tooltip | 경계·배경 |

### 4.5 Component Dimensions (height / width)

| 컴포넌트 | 값 |
|---------|---|
| button | height: `32px`(sm), `48px`(lg) |
| input | defaultActionSize: `24px` |
| avatar | size: 24, 32, 40, 70, 96px |
| chip | height: `24px`, `32px`, `40px` |
| checkbox | inputSize: `16px`, `20px`, `24px` |
| radio | inputSize: `12px`, `16px`, `20px`; `::after` 4/6/8px |
| switch | 계산값: width 32–48px, height 16–24px |
| tooltip | maxWidth: `250px` |

### 4.6 Typography 하드코딩

| 값 | 사용 컴포넌트 | 비고 |
|---|---|---|
| fontSize: 12, 14, 16px | chip, input, switch, tooltip, avatar | `0.8rem` 포함 |
| fontWeight: 600 | badge, chip | semiBold 토큰 미사용 |
| lineHeight: `16px`, `20px`, `24px` | chip | compact/regular 토큰 미사용 |

---

## 5. 요약 및 v2 설계 시사점

### 토큰 정의 완성도

| 카테고리 | 정의 | `vars` 사용 | 평가 |
|---------|------|-------------|------|
| Color (팔레트) | ✅ 150+ | ⚠️ 선택적 | raw 팔레트 직접 참조가 주류 |
| Color (semantic) | ✅ 4개 | ❌ | 미사용 |
| FontSize | ✅ 10개 | ⚠️ typography만 | 대부분 px 문자열 직접 기입 |
| FontWeight | ✅ 4개 | ⚠️ typography만 | badge, chip 하드코딩 |
| LineHeight | ✅ 2개 | ⚠️ 부분 | chip은 px 직접 기입 |
| BorderRadius | ✅ 6개 | ⚠️ skeleton만 | 7개 컴포넌트 하드코딩 |
| Shadows | ✅ 6개 | ❌ | 전혀 미사용 |
| ZIndex | ✅ 10개 | ❌ | tooltip 하드코딩 |
| Opacity | ✅ 15개 | ❌ | 전혀 미사용 |
| Spacing | ✅ 13개 | ❌ | `vars.spacing` 미사용 |
| BorderWidth | ✅ 4개 | ❌ | `1px` 하드코딩 |
| **Animation Duration** | ❌ | ❌ | v2 신규 필요 |
| **Animation Easing** | ❌ | ❌ | v2 신규 필요 |
| **Component Dimensions** | ❌ | ❌ | v2 신규 필요 |

### 핵심 문제

1. **토큰이 있어도 안 쓴다** — radius, shadows, zIndex, spacing 모두 정의되어 있지만 대부분 컴포넌트에서 미사용
2. **raw 팔레트 직접 참조** — `vars` 대신 `color.grayXXX`를 직접 import하는 패턴이 주류 (button, typography 제외)
3. **animation 토큰 전무** — duration/easing이 컴포넌트마다 제각각 (5가지 이상의 서로 다른 duration 혼재)
4. **치수(dimension) 토큰 전무** — 컴포넌트 height/width/size를 직접 기입하는 방식
5. **완전 미연동 컴포넌트** — avatar, tooltip은 토큰 import 자체 없음
