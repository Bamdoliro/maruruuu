<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2026-03-21 -->

# ui

## 개요

`@maru/ui`는 마루 프로젝트의 재사용 가능한 UI 컴포넌트 라이브러리입니다.
입력창, 버튼, 드롭다운, 테이블, 모달, 토스트 등 애플리케이션 전반에서 필요한 컴포넌트를 제공합니다.
`@maru/design-system`의 색상/폰트, `@maru/hooks`의 로직, `@maru/icon`의 아이콘을 조합하여 일관성 있는 UI를 구성합니다.

**핵심 책임:**

- UI 컴포넌트 구현 (입력, 버튼, 드롭다운, 테이블, 모달 등)
- 컴포넌트 스타일 관리 (design-system 토큰 사용)
- 폼 상태 및 이벤트 처리 (hooks 활용)

## 주요 파일 및 컴포넌트

| 디렉토리    | 컴포넌트                                                                                        | 용도                           |
| ----------- | ----------------------------------------------------------------------------------------------- | ------------------------------ |
| `Button/`   | Button, TextButton, UnderlineButton                                                             | 버튼 (스타일 변형 3가지)       |
| `Input/`    | Input, SearchInput, FormInput, CellInput, ButtonInput, PreviewInput, CheckInput, TimeLimitInput | 입력 필드 (8가지 변형)         |
| `CheckBox/` | CheckBox                                                                                        | 체크박스                       |
| `Radio/`    | Radio, RadioGroup                                                                               | 라디오 버튼                    |
| `Dropdown/` | Dropdown, SubDropdown                                                                           | 드롭다운 (중첩 지원)           |
| `Textarea/` | Textarea, ConditionalMessage                                                                    | 텍스트 영역                    |
| `Table/`    | Th, Td                                                                                          | 테이블 셀                      |
| `Flex/`     | Row, Column                                                                                     | Flex 레이아웃 헬퍼             |
| `Text/`     | Text                                                                                            | 텍스트 래퍼 (폰트 스타일 적용) |
| `Modal/`    | Modal                                                                                           | 모달 대화상자                  |
| `Confirm/`  | Confirm                                                                                         | 확인 대화상자                  |
| `Toast/`    | Toast                                                                                           | 토스트 알림                    |
| `Loader/`   | Loader                                                                                          | 로딩 표시기                    |
| `Switch/`   | Switch                                                                                          | 토글 스위치                    |

## AI 에이전트 안내

### 작업 시 주의사항

1. **컴포넌트 구조**: 각 컴포넌트는 독립적 폴더에 위치.

   ```
   Button/
   ├── Button.tsx (메인 컴포넌트)
   ├── Button.type.ts (타입 정의)
   └── Button.style.ts (스타일)
   ```

2. **디자인 시스템 사용**: `@maru/design-system`의 color, font 필수 사용.

   ```tsx
   import { color, font } from '@maru/design-system';

   const ButtonStyle = css`
     ${font.btn1}
     color: ${color.white};
     background-color: ${color.maruDefault};
   `;
   ```

3. **Hook 통합**: 입력, 토스트, 드롭다운 등에서 `@maru/hooks` 활용.
   - useDebounceInput: 검색 입력
   - useToast: 토스트 표시
   - useOutsideClick: 드롭다운 닫기

4. **아이콘 사용**: `@maru/icon`의 컴포넌트를 import하여 버튼, 입력 등에 삽입.

   ```tsx
   import { IconSearch } from '@maru/icon';

   export function SearchInput() {
     return <IconSearch /> + <input />;
   }
   ```

5. **Emotion CSS-in-JS**: 모든 스타일은 Emotion으로 작성.
   - styled 컴포넌트 또는 css 함수 사용
   - classNames 대신 css props 선호

6. **타입 안전성**: 각 컴포넌트의 props를 `.type.ts` 파일에서 정의.

   ```tsx
   // Button.type.ts
   export type ButtonStyleType = 'primary' | 'secondary' | 'outline';

   export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     styleType?: ButtonStyleType;
     disabled?: boolean;
   }
   ```

7. **접근성**: form 요소의 label, aria-\* 속성 필수.
   - Input: id, name, type 명시
   - CheckBox/Radio: htmlFor, id 일치
   - Modal/Confirm: role, aria-label

### 의존성

| 패키지                    | 유형           | 버전         | 용도                |
| ------------------------- | -------------- | ------------ | ------------------- |
| `@maru/design-system`     | dependency     | workspace:\* | 색상, 폰트 토큰     |
| `@maru/hooks`             | dependency     | workspace:\* | Custom hooks        |
| `@maru/icon`              | dependency     | workspace:\* | SVG 아이콘          |
| `@maru/utils`             | dependency     | workspace:\* | 유틸리티 함수       |
| `@emotion/react`          | dependency     | ^11.14.0     | CSS-in-JS           |
| `@emotion/styled`         | dependency     | ^11.14.1     | styled 컴포넌트     |
| `react-spinners`          | dependency     | ^0.13.8      | 로딩 애니메이션     |
| `@types/react-datepicker` | dependency     | ^6.2.0       | 날짜 입력 타입      |
| `react`                   | peerDependency | ^18.0.0      | React 페이지 제공자 |
| `react-dom`               | peerDependency | ^18.0.0      | DOM 렌더링          |

**다운스트림 의존:**

- 모든 앱(`admin`, `user`) — UI 컴포넌트 사용

### 추천 작업 흐름

**새 컴포넌트 추가:**

1. 새 폴더 생성 `/src/{ComponentName}/`
2. `{ComponentName}.type.ts`에서 타입 정의
3. `{ComponentName}.tsx`에서 컴포넌트 구현
4. design-system 색상/폰트 사용
5. `index.ts`에서 export 추가
6. `pnpm lint`로 TypeScript, ESLint 검증

**기존 컴포넌트 수정:**

1. 스타일 변경: `.style.ts` 또는 컴포넌트 내 css 함수 수정
2. props 추가: `.type.ts`에서 타입 정의 후 컴포넌트에 반영
3. 동작 변경: hooks 추가/수정 또는 이벤트 핸들러 변경
4. 수정 후 앱에서 렌더링 확인

**컴포넌트 테스트:**

- Input: 입력값 변경, 유효성 검사 메시지 표시
- Button: 클릭 이벤트 발생, disabled 상태
- Dropdown: 열기/닫기, 항목 선택, 중첩 드롭다운
- Modal/Confirm: 열기/닫기, 버튼 동작
- Toast: 자동 사라짐, 다중 토스트 표시

### 주의: 의존성 순환 방지

- `ui` → `design-system`, `hooks`, `icon`, `utils` (OK)
- `design-system` ↛ `ui` (역방향 금지)
- `hooks` ↛ `ui` (역방향 금지, hooks는 순수 로직만)
- `icon` ↛ `design-system`, `hooks` (금지)
