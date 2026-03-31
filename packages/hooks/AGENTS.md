<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2026-03-21 -->

# hooks

## 개요

`@maru/hooks`는 마루 프로젝트에서 재사용 가능한 React Custom Hooks를 제공하는 패키지입니다.
입력 처리, 이벤트 처리, 상태 관리 등 자주 필요한 로직을 캡슐화하여 여러 컴포넌트에서 활용합니다.

**핵심 책임:**

- Custom Hook 라이브러리 제공
- Recoil 상태 관리 통합
- DOM 및 입력 이벤트 처리 유틸리티

## 주요 파일

| 파일                      | 용도                                  |
| ------------------------- | ------------------------------------- |
| `src/useBooleanState.ts`  | boolean 상태 토글 (on, off, toggle)   |
| `src/useDebounceInput.ts` | 입력 값 디바운싱 (검색 입력 등)       |
| `src/useInterval.ts`      | 반복 실행 효과 관리                   |
| `src/useOutsideClick.ts`  | DOM 외부 클릭 감지 (드롭다운 닫기 등) |
| `src/useToast.ts`         | 토스트 알림 표시 (Recoil 상태 기반)   |
| `index.ts`                | 공개 export                           |

## AI 에이전트 안내

### 작업 시 주의사항

1. **새 Hook 추가**: 항상 `/src/` 폴더에 파일 생성 후 `index.ts`에서 export.
   - 파일명: `use{HookName}.ts`
   - 단일 책임 원칙 준수 (한 Hook = 한 기능)

2. **Recoil 상태 의존**: `useToast`, `useInterval` 등에서 Recoil atom/selector를 사용 가능.
   - 전역 상태 정의는 별도의 상태 관리 패키지로 중앙화 권장
   - Hook 내부에서 atom 정의 시, 중복 생성 방지 (useRecoilState의 key 유일성 확인)

3. **React 18 호환성**: 모든 Hook은 Strict Mode에서 이중 호출 안전성 검증 필수.
   - cleanup 함수 누락 오류 확인
   - 외부 부수 효과는 `useEffect` 또는 `useLayoutEffect`로 관리

4. **TypeScript 엄격성**: `tsconfig.json`에서 strict mode 활성화 상태.
   - 모든 매개변수, 반환값에 타입 명시 필수
   - `any` 타입 사용 금지

### 의존성

| 패키지       | 유형           | 버전    | 용도                             |
| ------------ | -------------- | ------- | -------------------------------- |
| `recoil`     | dependency     | ^0.7.7  | 전역 상태 관리                   |
| `es-toolkit` | dependency     | ^1.0.0  | 유틸리티 함수 모음 (debounce 등) |
| `react`      | peerDependency | ^18.0.0 | React 페이지 제공자              |

**다운스트림 의존:**

- `@maru/ui` — 입력, 드롭다운, 토스트 컴포넌트에서 Hook 사용
- 모든 앱(`admin`, `user`) — 입력 처리, 전역 상태 접근

### 추천 작업 흐름

**새 Hook 작성:**

1. `/src/use{HookName}.ts` 파일 생성
2. 타입 정의, 매개변수, 반환값 명시
3. `useEffect`/`useLayoutEffect`로 부수 효과 관리
4. `index.ts`에서 export 추가
5. `pnpm lint`로 TypeScript, ESLint 검증

**Hook에서 Recoil 사용:**

1. atom/selector는 Hook 외부에서 정의 (중복 생성 방지)
2. Hook은 `useRecoilState`, `useSetRecoilState` 등만 호출
3. 상태 초기화/리셋 로직은 명확하게 구현

**Hook 테스트:**

- UI 컴포넌트에서 실제 사용 후 동작 확인
- useDebounceInput: 검색 입력 후 API 호출 지연 확인
- useOutsideClick: 모달/드롭다운 외부 클릭 시 닫힘 확인
- useToast: 토스트 메시지 표시/자동 사라짐 확인
