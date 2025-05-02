# @sipe-team/reset

A modern CSS reset library that provides consistent styling across different browsers while maintaining essential defaults.

[한국어 문서](#sipe-teamreset-1)

## Features

### 1. Box Model Reset
Normalizes box model for all elements including pseudo-elements and backdrop:
```css
*,
*::before,
*::after,
*::backdrop {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-width: 0;
  border-style: solid;
}
```

### 2. Typography Reset
Provides essential typography settings:
- Prevents font-size adjustments in mobile browsers
- Sets default line-height for better readability
- Ensures proper text wrapping for headings and paragraphs
```css
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  line-height: 1.5;
}

:where(p, h1, h2, h3, h4, h5, h6) {
  overflow-wrap: break-word;
}
```

### 3. Form Elements Reset
Normalizes form elements across browsers:
- Removes default appearance
- Inherits font and color properties
- Prevents text selection on buttons
- Allows only vertical resizing for textareas
- Fixes Firefox placeholder opacity
```css
button, input, select, textarea {
  -webkit-appearance: none;
  appearance: none;
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
}

button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  cursor: pointer;
  user-select: none;
}

textarea {
  resize: vertical;
}

::placeholder {
  opacity: 1;
}
```

### 4. Table Reset
Normalizes table structure:
```css
table {
  border-collapse: collapse;
  border-spacing: 0;
  text-indent: 0;
}

th {
  text-align: inherit;
}
```

### 5. Root & Document Level Reset
Ensures proper viewport height handling and stacking context:
```css
body {
  min-height: 100vh;
  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
}

#root {
  isolation: isolate;
}
```

### 6. Semantic Elements Reset
Normalizes display property for semantic HTML elements:
```css
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, main {
  display: block;
}
```

### 7. Media Elements Reset
Ensures responsive behavior for media elements:
```css
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

### 8. Lists & Links Reset
Removes default styling from lists and links:
```css
ol, ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}
```

### 9. User Experience Reset
Implements smooth scrolling with motion preferences consideration:
```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

## Installation

Using npm:
```bash
npm install @sipe-team/reset
```

Using yarn:
```bash
yarn add @sipe-team/reset
```

Using pnpm:
```bash
pnpm add @sipe-team/reset
```

## Usage

### Using the CSS Directly
Import the CSS file directly in your application:

```javascript
import '@sipe-team/reset/reset.css';
```

### Using the Reset Component
Add the Reset component to your application root:

```tsx
import { Reset } from '@sipe-team/reset';

function App() {
  return (
    <ThemeProvider>
      <Reset />
      {children}
    </ThemeProvider>
  );
}
```

The `Reset` component applies global CSS styles to the entire application and renders nothing to the DOM. It should be placed once at the top level of your application.

### Recommended Approach
While both methods work, directly importing the CSS file is recommended for these reasons:

1. **More explicit** - Directly importing CSS clearly communicates the intention
2. **Performance** - Avoids an unnecessary React component rendering cycle
3. **Simplicity** - Follows the conventional pattern used by most CSS reset libraries
4. **Bundle optimization** - May be more efficiently processed by bundlers

```javascript
// Recommended
import '@sipe-team/reset/reset.css';
```

---

# @sipe-team/reset

다양한 브라우저에서 일관된 스타일링을 제공하면서 필수적인 기본값을 유지하는 모던 CSS 리셋 라이브러리입니다.

## 특징

### 1. 박스 모델 리셋
의사 요소와 backdrop을 포함한 모든 요소의 박스 모델을 정규화합니다:
```css
*,
*::before,
*::after,
*::backdrop {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-width: 0;
  border-style: solid;
}
```

### 2. 타이포그래피 리셋
다음과 같은 필수적인 타이포그래피 설정을 제공합니다:
- 모바일 브라우저에서의 폰트 크기 자동 조정을 방지합니다
- 가독성을 위한 기본 행간을 설정합니다
- 제목과 단락의 적절한 텍스트 줄바꿈을 보장합니다
```css
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  line-height: 1.5;
}

:where(p, h1, h2, h3, h4, h5, h6) {
  overflow-wrap: break-word;
}
```

### 3. 폼 요소 리셋
브라우저 간 폼 요소를 다음과 같이 정규화합니다:
- 기본 외형을 제거합니다
- 폰트와 색상 속성을 상속하도록 설정합니다
- 버튼의 텍스트 선택을 방지합니다
- textarea의 수직 리사이즈만 허용합니다
- Firefox에서 placeholder가 흐려 보이는 문제를 해결합니다
```css
button, input, select, textarea {
  -webkit-appearance: none;
  appearance: none;
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
}

button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  cursor: pointer;
  user-select: none;
}

textarea {
  resize: vertical;
}

::placeholder {
  opacity: 1;
}
```

### 4. 테이블 리셋
테이블 구조를 정규화합니다:
```css
table {
  border-collapse: collapse;
  border-spacing: 0;
  text-indent: 0;
}

th {
  text-align: inherit;
}
```

### 5. 루트 및 문서 레벨 리셋
적절한 뷰포트 높이 처리와 쌓임 맥락을 보장합니다:
```css
body {
  min-height: 100vh;
  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
}

#root {
  isolation: isolate;
}
```

### 6. 시맨틱 요소 리셋
시맨틱 HTML 요소의 display 속성을 정규화합니다:
```css
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, main {
  display: block;
}
```

### 7. 미디어 요소 리셋
미디어 요소의 반응형 동작을 보장합니다:
```css
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

### 8. 목록 및 링크 리셋
목록과 링크의 기본 스타일을 제거합니다:
```css
ol, ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}
```

### 9. 사용자 경험 리셋
모션 선호도를 고려한 부드러운 스크롤링을 구현합니다:
```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

## 설치

npm 사용:
```bash
npm install @sipe-team/reset
```

yarn 사용:
```bash
yarn add @sipe-team/reset
```

pnpm 사용:
```bash
pnpm add @sipe-team/reset
```

## 사용 방법

### CSS 직접 사용하기
애플리케이션에 CSS 파일을 직접 가져옵니다:

```javascript
import '@sipe-team/reset/reset.css';
```

### Reset 컴포넌트 사용하기
애플리케이션 루트에 Reset 컴포넌트를 추가합니다:

```tsx
import { Reset } from '@sipe-team/reset';

function App() {
  return (
    <ThemeProvider>
      <Reset />
      {children}
    </ThemeProvider>
  );
}
```

`Reset` 컴포넌트는 전체 애플리케이션에 전역 CSS 스타일을 적용하고 DOM에는 아무것도 렌더링하지 않습니다. 애플리케이션의 최상위 레벨에 한 번만 배치해야 합니다.

### 권장 접근법
두 가지 방법 모두 작동하지만, CSS 파일을 직접 가져오는 방식이 다음과 같은 이유로 권장됩니다:

1. **더 명시적** - CSS를 직접 가져오는 것이 의도를 명확하게 전달합니다
2. **성능** - 불필요한 React 컴포넌트 렌더링 사이클을 피할 수 있습니다
3. **단순성** - 대부분의 CSS 리셋 라이브러리에서 사용하는 일반적인 패턴을 따릅니다
4. **번들 최적화** - 번들러에 의해 더 효율적으로 처리될 수 있습니다

```javascript
// 권장 방법
import '@sipe-team/reset/reset.css';
```