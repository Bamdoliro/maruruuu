<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2026-03-21 -->

# design-system

## 개요

`@maru/design-system`은 마루 프로젝트의 디자인 토큰과 글로벌 스타일을 제공하는 기초 패키지입니다.
색상, 타이포그래피, 글로벌 CSS를 중앙집중식으로 관리하며, Emotion 기반 CSS-in-JS 솔루션을 사용합니다.

**핵심 책임:**

- 컬러 팔레트 정의 (회색 계열, 브랜드 색상, 상태 색상)
- 타이포그래피 시스템 (Display, Heading, Paragraph, Button, Caption)
- 글로벌 스타일 및 폰트 로딩

## 주요 파일

| 파일             | 용도                                                    |
| ---------------- | ------------------------------------------------------- |
| `src/color.ts`   | 색상 토큰 정의 (gray50~gray900, 브랜드 색상, 상태 색상) |
| `src/font.ts`    | 타이포그래피 시스템 (D1-D3, H1-H6, p1-p3, btn1-btn3 등) |
| `src/global.tsx` | Emotion GlobalStyle 컴포넌트 (폰트 페이스, 리셋 스타일) |
| `index.ts`       | 공개 export (color, font, GlobalStyle)                  |

## AI 에이전트 안내

### 작업 시 주의사항

1. **색상 변경**: `src/color.ts`의 hex 값 수정 시, 모든 참조 패키지(`@maru/ui`, `@maru/hooks`)의 테스트를 실행하세요.

   ```bash
   pnpm lint
   ```

2. **타이포그래피 추가/수정**: 새로운 폰트 스타일 추가 후 UI 컴포넌트에서 실제 사용 확인 필수.
   - `fontGenerator()` 함수의 매개변수: weight, size (rem), lineHeight (%), letterSpacing (px)

3. **글로벌 스타일 변경**: `src/global.tsx` 수정 시 모든 앱(`admin`, `user`)에서 렌더링 확인 필수.
   - React 18의 strictMode에서 이중 실행 가능 인지 확인

4. **의존성 추가 금지**: 이미 Emotion과 React/React-DOM이 peerDependency로 지정됨.
   색상/폰트 로직만 관리하고, UI 컴포넌트 로직은 `@maru/ui`로 위임.

### 의존성

| 패키지            | 유형           | 버전     | 용도                             |
| ----------------- | -------------- | -------- | -------------------------------- |
| `@emotion/react`  | dependency     | ^11.14.0 | CSS-in-JS 런타임                 |
| `@emotion/styled` | dependency     | ^11.14.1 | styled 컴포넌트 (미사용, 호환성) |
| `react`           | peerDependency | ^18.0.0  | React 페이지 제공자              |
| `react-dom`       | peerDependency | ^18.0.0  | DOM 렌더링                       |

**다운스트림 의존:**

- `@maru/ui` — 색상과 폰트를 사용하여 컴포넌트 스타일링
- `@maru/hooks` — 토스트 등에서 브랜드 색상 참조 가능
- 모든 앱(`admin`, `user`) — GlobalStyle 초기화

### 추천 작업 흐름

**색상 추가:**

1. `src/color.ts`에서 상수 추가
2. `pnpm lint`로 TypeScript 오류 확인
3. `@maru/ui` 컴포넌트에서 참조 테스트

**폰트 스타일 추가:**

1. `src/font.ts`에서 `fontGenerator()` 호출로 스타일 정의
2. `src/global.tsx`에서 필요시 @font-face 추가
3. `@maru/ui`의 Text, Button 등에서 사용 확인

**글로벌 스타일 변경:**

1. `src/global.tsx` 수정
2. 각 앱에서 `<GlobalStyle />`이 최상위에서 렌더되는지 확인
3. 개발 서버에서 스타일 적용 확인
