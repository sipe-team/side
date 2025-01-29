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

Using pnpm:
```bash
pnpm add @sipe-team/reset
```

## Usage

### Global Reset
Import the CSS file in your application:
```javascript
import '@sipe-team/reset/style.css';
```

### Component Reset
For component-level reset:
```tsx
import { Reset } from '@sipe-team/reset';

// Basic usage
function App() {
  return (
    <Reset>
      <div>Your content here</div>
    </Reset>
  );
}

// With custom class name
function CustomApp() {
  return (
    <Reset className="custom-class">
      <div>Your content here</div>
    </Reset>
  );
}

// As a different element
function MainApp() {
  return (
    <Reset asChild>
      <main>Your content here</main>
    </Reset>
  );
}
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
테이블 구조를 다음과 같이 정규화합니다:
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

### 5. 루트 & 문서 레벨 리셋
올바른 뷰포트 높이 처리와 쌓임 맥락을 다음과 같이 보장합니다:
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
시맨틱 HTML 요소의 display 속성을 다음과 같이 정규화합니다:
```css
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, main {
  display: block;
}
```

### 7. 미디어 요소 리셋
미디어 요소의 반응형 동작을 다음과 같이 보장합니다:
```css
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

### 8. 목록 & 링크 리셋
목록과 링크의 기본 스타일을 다음과 같이 제거합니다:
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
모션 선호도를 고려한 부드러운 스크롤을 다음과 같이 구현합니다:
```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

## 설치 방법

npm 사용:
```bash
npm install @sipe-team/reset
```

pnpm 사용:
```bash
pnpm add @sipe-team/reset
```

## 사용 방법

### 전역 리셋
애플리케이션에 CSS 파일을 임포트해 주세요:
```javascript
import '@sipe-team/reset/style.css';
```

### 컴포넌트 리셋
컴포넌트 레벨의 리셋이 필요한 경우:
```tsx
import { Reset } from '@sipe-team/reset';

// 기본 사용법
function App() {
  return (
    <Reset>
      <div>컨텐츠</div>
    </Reset>
  );
}

// 커스텀 클래스명 사용
function CustomApp() {
  return (
    <Reset className="custom-class">
      <div>컨텐츠</div>
    </Reset>
  );
}

// 다른 요소로 렌더링
function MainApp() {
  return (
    <Reset asChild>
      <main>컨텐츠</main>
    </Reset>
  );
}
```