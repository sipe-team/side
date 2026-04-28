# Semantic Token

> 상태: 디자이너 검토 요청 중
> 작성일: 2026-04-26
> 기준 모드: **Dark (기본값)**. Light 모드 토큰은 추후 별도 작업 예정 (`tokens/semantic/light/` 현재 비어 있음).

---

## 브랜드 컬러 변경 대응 전략 (리브랜딩 플로우)

**배경:** 반기별로 기수가 바뀔 때마다 브랜드 컬러가 변경됨.

**원칙:** 컴포넌트 코드나 Semantic 토큰 명칭을 수정하는 대신, Semantic 토큰이 참조하는 Primitive 값(alias)만 업데이트하여 일괄 변경.

**관리 방식:** `tokens/` 하위 JSON 파일이 단일 소스(source of truth). Figma Token Studio → Style Dictionary → 코드 자동 생성 파이프라인 구축 예정.

### 토큰 참조 흐름

```
Primitive                         Semantic                  컴포넌트
─────────────────────────────────  ───────────────────────   ─────────────────────
tokens/primitive/color.json        tokens/semantic/dark/
                                   color.json
color.brand.default  #ffb24d  ──▶  color.accent.default ──▶  button background
color.brand.hover    #d9963f  ──▶  color.accent.hover   ──▶  button:hover background
color.brand.subtle   #3b2005  ──▶  color.accent.subtle  ──▶  tag/chip background
```

### 기수 교체 시 수정 파일

| 파일 | 수정 내용 |
|------|----------|
| `tokens/primitive/color.json` | `color.brand.*` 값 3개 교체 |

> **이 파일 하나만 수정하면 됨.** Semantic 토큰은 alias 참조이므로 자동 반영. 컴포넌트 코드 수정 불필요.

> **파이프라인 구축 전 과도기 주의:** 현재 `.ts` 구현체(`themes.css.ts`)가 병행 존재하며, 브랜드 컬러가 hex로 직접 기입돼 있음. 파이프라인 구축 후 해당 파일은 제거 예정이므로 별도 관리 불필요.

### JSON 포맷 (W3C Design Token 표준)

현재 모든 토큰 파일은 W3C Design Token 형식(`$value`, `$type`, `$description`)을 사용하며, Token Studio v2 및 Style Dictionary v4와 호환됨.

```json
// tokens/primitive/color.json
"brand": {
  "default": { "$value": "#ffb24d", "$type": "color", "$description": "브랜드 기본 강조색 (기수별 교체)" },
  "hover":   { "$value": "#d9963f", "$type": "color", "$description": "브랜드 hover 상태색 (기수별 교체)" },
  "subtle":  { "$value": "#3b2005", "$type": "color", "$description": "브랜드 배경용 어두운 색 (기수별 교체)" }
}
```

### 기수별 아카이브 테마

과거 기수 전용 페이지 테마(1st~4th)는 브랜드 컬러와 별개로 영구 보존. 파이프라인 구축 후 `tokens/theme/` 하위로 이관 예정.

---

## 목차

1. [Color](#1-color)
2. [Spacing](#2-spacing)
3. [Radius](#3-radius)
4. [Typography](#4-typography)

---

## 1. Color

### 1-1. Background

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `color.background.base` | `{color.gray.950}` | `#111111` | 가장 어두운 기본 페이지 배경 | 1. 페이지 전체 기본 배경 (`<body>`) 2. 모달·시트 내부 배경 |
| `color.background.subtle` | `{color.gray.900}` | `#18181b` | base보다 약간 밝은 표면. 계층 구분 | 1. 카드·섹션 표면 배경 2. 사이드바·패널 배경 |
| `color.background.muted` | `{color.gray.800}` | `#27272a` | 비활성 또는 흐릿한 배경 | 1. 비활성(disabled) 입력 필드 배경 2. 스켈레톤 로딩 배경 |

### 1-2. Foreground (텍스트·아이콘)

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `color.foreground.default` | `{color.white}` | `#ffffff` | 어두운 배경 위에서 최고 대비를 가지는 기본 전경 | 1. 본문 텍스트 2. 헤딩·레이블 기본 색상 |
| `color.foreground.subtle` | `{color.gray.400}` | `#a1a1aa` | 보조 정보임을 시각적으로 구분 | 1. 보조 설명 텍스트 2. 인풋 힌트·캡션 |
| `color.foreground.muted` | `{color.gray.500}` | `#71717a` | 최소한의 대비로 존재감을 낮춤 | 1. 인풋 placeholder 텍스트 2. 비활성 아이콘 |
| `color.foreground.onAccent` | `{color.white}` | `#ffffff` | 강조색 배경 위에서 가독성 확보 | 1. 강조색 배경 위 버튼 레이블 2. 배지·칩 내부 텍스트 |

### 1-3. Border

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `color.border.default` | `{color.gray.700}` | `#3f3f46` | 기본 구분선. 어두운 배경에서 시각적으로 튀지 않는 수준 | 1. 인풋·셀렉트 기본 테두리 2. 카드·구분선 보더 |
| `color.border.strong` | `{color.gray.500}` | `#71717a` | 상호작용 또는 강조가 필요한 테두리 | 1. 호버 상태 인풋 테두리 강조 2. 구분 구역 강조 선 |
| `color.border.focus` | `{color.blue.400}` | `#60a5fa` | 포커스 상태임을 명확히 표시 (접근성) | 1. 키보드 포커스 링 색상 2. 활성 탭 언더라인 |

### 1-4. Accent (인터랙티브 강조)

> `color.brand.*` primitive는 기수가 바뀔 때 이 3개 값만 교체하면 전체 accent 색상이 일괄 변경됩니다.

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `color.accent.default` | `{color.brand.default}` | `#ffb24d` | 주요 액션·브랜드 포인트 색상 (`--primary`) | 1. Primary CTA 버튼 배경 2. 인터랙티브 링크 텍스트 |
| `color.accent.hover` | `{color.brand.hover}` | `#d9963f` | 상호작용 피드백: hover·press 상태 (`--primary-hover`) | 1. Primary 버튼 호버·프레스 배경 2. 링크 호버 색상 |
| `color.accent.subtle` | `{color.brand.subtle}` | `#3b2005` | 강조색의 어두운 배경. 과도한 강조 없이 어필 | 1. 선택된 칩·태그 배경 2. 인포 배너 배경 |

### 1-5. Status

#### Success (성공·완료)

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `color.status.success.foreground` | `{color.green.400}` | `#4ade80` | 어두운 배경에서 가독성 있는 성공 색상 | 1. 성공 상태 텍스트·아이콘 2. 완료 배지 레이블 |
| `color.status.success.background` | `{color.green.900}` | `#042713` | 성공 영역을 어둡고 은은하게 표현 | 1. 성공 토스트·배너 배경 2. 완료 상태 인풋 배경 |
| `color.status.success.border` | `{color.green.700}` | `#116932` | 성공 상태 컨테이너 테두리 | 1. 성공 인풋 테두리 2. 성공 알림 카드 보더 |

#### Warning (경고·주의)

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `color.status.warning.foreground` | `{color.orange.400}` | `#fb923c` | 어두운 배경에서 가독성 있는 경고 색상 | 1. 경고 텍스트·아이콘 2. 주의 배지 레이블 |
| `color.status.warning.background` | `{color.orange.900}` | `#3b1106` | 경고 영역을 어둡고 은은하게 표현 | 1. 경고 배너·토스트 배경 2. 주의 섹션 하이라이트 |
| `color.status.warning.border` | `{color.orange.700}` | `#92310a` | 경고 상태 컨테이너 테두리 | 1. 경고 인풋 테두리 2. 주의 알림 카드 보더 |

#### Danger (오류·위험)

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `color.status.danger.foreground` | `{color.red.400}` | `#f87171` | 어두운 배경에서 가독성 있는 오류 색상 | 1. 오류 메시지 텍스트·아이콘 2. 삭제·위험 액션 레이블 |
| `color.status.danger.background` | `{color.red.900}` | `#300c0c` | 오류 영역을 어둡고 은은하게 표현 | 1. 에러 토스트·배너 배경 2. 유효성 오류 인풋 배경 |
| `color.status.danger.border` | `{color.red.700}` | `#991919` | 오류 상태 컨테이너 테두리 | 1. 에러 인풋 테두리 2. 위험 액션 확인 다이얼로그 보더 |

#### Info (정보·안내)

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `color.status.info.foreground` | `{color.blue.400}` | `#60a5fa` | 어두운 배경에서 가독성 있는 정보 색상 | 1. 정보 텍스트·아이콘 2. 도움말 툴팁 레이블 |
| `color.status.info.background` | `{color.blue.900}` | `#14204a` | 정보 영역을 어둡고 은은하게 표현 | 1. 정보 배너 배경 2. 안내 섹션 배경 |
| `color.status.info.border` | `{color.blue.700}` | `#173da6` | 정보 상태 컨테이너 테두리 | 1. 정보 알림 카드 보더 2. 도움말 박스 테두리 |

---

## 2. Spacing

### 2-1. Component (컴포넌트 내부 간격)

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `spacing.component.xs` | `{spacing.4}` | `4px` | 아주 촘촘한 내부 간격 | 1. 아이콘-텍스트 사이 간격 2. 태그·배지 내부 상하 패딩 |
| `spacing.component.sm` | `{spacing.8}` | `8px` | 작은 컴포넌트 내부 패딩 | 1. 버튼 상하 패딩 2. 인풋 상하 패딩 |
| `spacing.component.md` | `{spacing.12}` | `12px` | 중간 컴포넌트 내부 패딩 | 1. 인풋 좌우 패딩 2. 셀렉트 내부 패딩 |
| `spacing.component.lg` | `{spacing.16}` | `16px` | 넓은 내부 여백이 필요한 컴포넌트 | 1. 카드 내부 패딩 2. 드롭다운 메뉴 항목 패딩 |
| `spacing.component.xl` | `{spacing.24}` | `24px` | 오버레이 계열 컴포넌트의 여백 | 1. 모달 내부 패딩 2. 시트 상단 여백 |

### 2-2. Layout (레이아웃 간격)

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `spacing.layout.sm` | `{spacing.32}` | `32px` | 소규모 레이아웃 단위 간격 | 1. 섹션 간 수직 간격 2. 폼 그룹 사이 간격 |
| `spacing.layout.md` | `{spacing.40}` | `40px` | 중간 레이아웃 여백 | 1. 페이지 좌우 여백(모바일) 2. 카드 그리드 간격 |
| `spacing.layout.lg` | `{spacing.48}` | `48px` | 넓은 레이아웃 여백 | 1. 페이지 좌우 여백(태블릿) 2. 대형 섹션 내부 패딩 |
| `spacing.layout.xl` | `{spacing.64}` | `64px` | 최대 레이아웃 여백 | 1. 페이지 콘텐츠 최대 좌우 여백(데스크탑) 2. 히어로 섹션 상하 패딩 |

---

## 3. Radius

| 토큰 | Primitive 참조 | 실제 값 | 의도 | 사용 시나리오 |
|------|---------------|---------|------|--------------|
| `radius.component.sm` | `{radius.2}` | `2px` | 아주 미묘한 모서리 처리 | 1. 태그·배지 모서리 2. 툴팁 모서리 |
| `radius.component.md` | `{radius.4}` | `4px` | 일반 인터랙티브 요소의 기본 모서리 | 1. 버튼 모서리 2. 인풋·셀렉트 모서리 |
| `radius.component.lg` | `{radius.8}` | `8px` | 컨테이너 계열의 부드러운 모서리 | 1. 카드 모서리 2. 드롭다운·팝오버 모서리 |
| `radius.component.xl` | `{radius.12}` | `12px` | 오버레이 계열의 큰 모서리 | 1. 다이얼로그·모달 모서리 2. 바텀 시트 상단 모서리 |
| `radius.component.full` | `{radius.full}` | `9999px` | 완전한 원형·필(Pill) 처리 | 1. 아바타·프로필 이미지 원형 처리 2. 필(Pill) 스타일 버튼·칩 |
| `radius.layout.sm` | `{radius.4}` | `4px` | 페이지 레벨 인라인 박스의 모서리 | 1. 콜아웃·배너 모서리 2. 레이아웃 그리드 셀 모서리 |
| `radius.layout.md` | `{radius.8}` | `8px` | 섹션·패널 수준의 모서리 | 1. 섹션 컨테이너·페이지 카드 모서리 2. 사이드바 패널 모서리 |
| `radius.layout.lg` | `{radius.12}` | `12px` | 주요 콘텐츠 영역의 큰 모서리 | 1. 히어로·피처 섹션 배경 모서리 2. 주요 콘텐츠 영역 래퍼 모서리 |

---

## 4. Typography

### 4-1. Font Family / Line Height

| 토큰 | Primitive 참조 | 의도 | 사용 시나리오 |
|------|---------------|------|--------------|
| `typography.fontFamily.base` | `{typography.fontFamily.base}` | 전체 UI의 단일 폰트 패밀리 | 1. 모든 UI 텍스트 기본 폰트 2. 코드 블록 외 전체 텍스트 |
| `typography.lineHeight.default` | `{typography.lineHeight.regular}` | 본문 읽기에 최적화된 행간 (1.5) | 1. 본문 단락 행간 2. 멀티라인 인풋 텍스트 행간 |
| `typography.lineHeight.tight` | `{typography.lineHeight.compact}` | 제목·UI 요소에 적합한 좁은 행간 (1.3) | 1. 헤딩·제목 행간 2. 버튼·레이블 단행 텍스트 행간 |

### 4-2. 스케일

| 토큰 | fontSize | fontWeight | 의도 | 사용 시나리오 |
|------|----------|-----------|------|--------------|
| `typography.display` | `{typography.fontSize.48}` | `{typography.fontWeight.bold}` | 가장 크고 임팩트 있는 텍스트 | 1. 랜딩 히어로 헤딩 2. 최상위 마케팅 카피 |
| `typography.heading.lg` | `{typography.fontSize.32}` | `{typography.fontWeight.bold}` | 페이지 최상위 제목 | 1. 페이지 제목(h1) 2. 다이얼로그 메인 제목 |
| `typography.heading.md` | `{typography.fontSize.24}` | `{typography.fontWeight.semiBold}` | 섹션 단위 제목 | 1. 섹션 제목(h2) 2. 카드 헤딩 |
| `typography.heading.sm` | `{typography.fontSize.20}` | `{typography.fontWeight.semiBold}` | 서브섹션 제목 | 1. 서브섹션 제목(h3) 2. 리스트 그룹 레이블 |
| `typography.body.lg` | `{typography.fontSize.18}` | `{typography.fontWeight.regular}` | 읽기 편한 큰 본문 | 1. 긴 형식 본문 텍스트 2. 소개 단락 |
| `typography.body.md` | `{typography.fontSize.16}` | `{typography.fontWeight.regular}` | 일반 UI 본문의 기준 크기 | 1. 일반 UI 본문 텍스트 2. 폼 인풋 입력값 |
| `typography.body.sm` | `{typography.fontSize.14}` | `{typography.fontWeight.regular}` | 보조 텍스트용 작은 본문 | 1. 보조 설명 텍스트 2. 테이블 셀 텍스트 |
| `typography.label` | `{typography.fontSize.14}` | `{typography.fontWeight.medium}` | 폼·UI 레이블 (본문보다 약간 굵게) | 1. 폼 필드 레이블 2. 버튼 텍스트 |
| `typography.caption` | `{typography.fontSize.12}` | `{typography.fontWeight.regular}` | 부수적 정보의 최소 크기 | 1. 이미지 캡션 2. 에러·힌트 메시지 |

---

## 검토 요청 사항

- [ ] `color.accent.*` — orange 계열로 반영됐습니다. 실제 UI에서 강조색 계층(default / hover / subtle)이 적절한지 확인 부탁드립니다.
- [ ] `color.background.*` — gray.950 / gray.900 / gray.800 3단계 계층이 실제 UI에서 충분히 구분되는지 확인
- [ ] `color.status.*` — 각 상태별 400(fg) / 900(bg) / 700(border) 조합 적합성 검토
- [ ] `spacing.layout.*` — 반응형 breakpoint별 여백 값 적합성 검토
- [ ] Light 모드 semantic 토큰 — 향후 별도 검토 예정 (`tokens/semantic/light/` 현재 비어 있음)
