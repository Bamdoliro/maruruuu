<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2026-03-21 -->

# user

부산소프트웨어마이스터고등학교 학생 입학전형 시스템. 학생이 지원서를 작성하고 합격 결과를 확인하며 입학 등록 서류를 관리하는 Next.js 애플리케이션입니다.

## 개요

**user**는 마루 시스템의 학생 대면 웹 애플리케이션입니다. 다음의 주요 기능을 제공합니다:

- **지원 서류**: 지원자 정보, 교육 경력, 성적, 자원봉사, 인성 정보 등 입학 지원 서류 작성
- **합격 결과**: 1차 합격 발표(필기), 2차 합격 발표(면접) 확인
- **입학 등록**: 합격자의 입학 서류 등록 및 관리
- **공지사항/FAQ**: 입학 전형 관련 정보 조회
- **학교 박람회**: 입학 설명회 및 주요 일정 안내
- **시뮬레이션**: 지원 전 성적 계산 도구

## 주요 파일

| 파일                                      | 용도                                                |
| ----------------------------------------- | --------------------------------------------------- |
| `src/middleware.ts`                       | 점검 시간대 리다이렉트 (INSPECTION 경로 관리)       |
| `src/apis/instance/instance.ts`           | Axios 인스턴스 (토큰 갱신 인터셉터 포함)            |
| `src/apis/authorization/authorization.ts` | Authorization 헤더 생성                             |
| `src/constants/common/constants.ts`       | 라우팅 경로, 일정, 토큰 키, 쿼리 키 정의            |
| `src/app/layout.tsx`                      | 루트 레이아웃 (Provider, QueryClient, Emotion 설정) |
| `src/components/Provider.tsx`             | Recoil, OverlayProvider, GlobalToast 설정           |

## 하위 디렉토리

```
src/
├── apis/                     # API 클라이언트 및 인증
│   ├── instance/            # Axios 인스턴스 (토큰 자동 갱신)
│   ├── authorization/       # 인증 헤더 유틸
│   └── storage/             # LocalStorage 래퍼
├── app/                      # Next.js App Router 페이지 및 레이아웃
│   ├── form/                # 지원 서류 작성 페이지 및 컴포넌트
│   ├── management/          # 지원 상태 관리 페이지
│   ├── result/              # 합격 결과 페이지 (1차, 최종)
│   ├── enrollment/          # 입학 등록 페이지
│   ├── notice/              # 공지사항 목록/상세
│   ├── faq/                 # FAQ 페이지
│   ├── fair/                # 학교 박람회 정보
│   ├── login/               # 로그인 페이지
│   ├── signup/              # 회원가입 페이지
│   ├── tos/                 # 이용약관 (다장 구조)
│   ├── privacy/             # 개인정보보호정책 (다장 구조)
│   ├── inspection/          # 시스템 점검 페이지
│   └── page.tsx             # 메인 대시보드
├── components/              # React 컴포넌트
│   ├── common/              # Header, Footer, Modal 등 공통 컴포넌트
│   ├── form/                # 지원 서류 관련 컴포넌트 및 계산기
│   ├── main/                # 메인 페이지 컴포넌트 (Timeline, Notice 등)
│   ├── fair/                # 박람회 컴포넌트
│   ├── faq/                 # FAQ 컴포넌트
│   ├── enrollment/          # 입학 등록 컴포넌트
│   ├── mobile/              # 모바일 전용 컴포넌트
│   └── management/          # 지원 상태 관리 컴포넌트
├── constants/               # 상수 정의
│   ├── common/constants.ts  # 라우팅, 일정, 토큰, 쿼리 키
│   └── form/                # 지원 서류 관련 상수
├── hooks/                   # 커스텀 React 훅
│   ├── useLoginGuard.tsx    # 로그인 필수 페이지 보호
│   ├── usePageAccessGuard.tsx # 페이지 접근 권한 확인
│   ├── useGradeCaculation.ts # 성적 계산 로직
│   ├── useDownloadFile.ts   # 파일 다운로드
│   ├── useToast.ts          # 토스트 메시지
│   └── useApiError.ts       # API 에러 처리
├── services/                # 비즈니스 로직 및 API 호출
│   ├── auth/                # 인증 서비스 (로그인, 로그아웃, 토큰)
│   ├── form/                # 지원 서류 서비스
│   ├── user/                # 사용자 정보 서비스
│   ├── enrollment/          # 입학 등록 서비스
│   ├── result/              # 합격 결과 서비스
│   ├── fair/                # 박람회 정보 서비스
│   ├── notice/              # 공지사항 서비스
│   └── faq/                 # FAQ 서비스
├── stores/                  # Recoil 상태 관리
├── types/                   # TypeScript 타입 정의
├── utils/                   # 유틸리티 함수
├── schemas/                 # Zod 스키마 (폼 검증)
├── layouts/                 # 재사용 가능한 레이아웃
└── lib/                     # 라이브러리 통합 (Google Analytics, Emotion 레지스트리)
```

## AI 에이전트 안내

### 작업 시 주의사항

**절대 금지**:

- 환경 변수 검증 없이 API 엔드포인트 변경 금지
- `middleware.ts`의 점검 시간대 로직 수정 시 `SCHEDULE` 상수 동기화 필수
- 토큰 갱신 로직 변경 (`instance.ts` 인터셉터) 시 테스트 필수

**필수 확인**:

- 지원 서류 작성 페이지: 폼 상태 저장(`useSaveForm`)과 제출(`useExportForm`) 분리 확인
- 합격 결과 페이지: 합격자만 접근 가능하도록 `usePageAccessGuard` 사용 여부 확인
- 입학 등록: 최종 합격 발표 이후에만 접근 가능하도록 일정 검증 확인

### 라우팅 구조

모든 경로는 `src/constants/common/constants.ts`의 `ROUTES`에 정의됩니다.

| 경로            | 기능           | 인증 필요 | 접근 제한     |
| --------------- | -------------- | --------- | ------------- |
| `/`             | 메인 대시보드  | X         | X             |
| `/form`         | 지원 서류 작성 | O         | 지원 기간 내  |
| `/management`   | 지원 상태 관리 | O         | X             |
| `/result/first` | 1차 합격 결과  | O         | 1차 발표 후   |
| `/result/final` | 최종 합격 결과 | O         | 최종 발표 후  |
| `/enrollment`   | 입학 등록      | O         | 최종 합격자만 |
| `/notice`       | 공지사항       | X         | X             |
| `/faq`          | FAQ            | X         | X             |
| `/fair`         | 학교 박람회    | X         | X             |
| `/login`        | 로그인         | X         | 미인증자만    |
| `/signup`       | 회원가입       | X         | 미인증자만    |
| `/inspection`   | 시스템 점검    | X         | 점검 시간대만 |

### 인증 흐름

**토큰 관리**:

JWT 기반 인증. 상세 흐름은 `src/apis/instance/instance.ts`와 `src/apis/storage/storage.ts`를 참고하세요.

**요청 권한 확인**:

- 페이지 진입 시 `useLoginGuard()` 훅으로 로그인 상태 확인
- 특정 페이지는 `usePageAccessGuard()` 훅으로 추가 권한 검증

### 지원 서류 작성

**흐름**:

1. 학생이 지원 서류 페이지(`/form`)에 진입
2. `form/page.tsx`가 `FormWrapper` 컴포넌트를 렌더링
3. `FormStatusManager`가 현재 작성 상태(Type → Applicant → Education → Grade → Guardian → Introduction)를 관리
4. 각 섹션에서 `useSaveForm` 훅으로 임시 저장
5. 모든 섹션 작성 후 `useExportForm` 훅으로 최종 제출

**주요 파일**:

- `src/app/form/page.tsx`: 지원 서류 메인 페이지
- `src/components/form/FormWrapper/FormWrapper.tsx`: 폼 레이아웃
- `src/services/form/`: 지원 서류 API 호출
- `src/schemas/form/`: Zod 검증 스키마

### 성적 계산

**개요**:

- `src/hooks/useGradeCaculation.ts`: 고등학교 성적, 검정고시, 해외 성적 계산 로직
- `src/components/form/Calculators/`: 학생용 계산기 UI

**주의**:

- 성적 계산 알고리즘은 교육청 기준에 따라 변경될 수 있으므로 상수로 정의된 가중치 확인 필수
- 검정고시 점수 변환 공식 확인 필수

### 테스트

**개발 서버**:

```bash
pnpm dev
```

**타입 검사**:

```bash
pnpm check-types
```

**빌드**:

```bash
pnpm build
pnpm start
```

**린트**:

```bash
pnpm lint
```

**포매팅**:

```bash
pnpm format
```

### 의존성

#### 주요 라이브러리

| 라이브러리                          | 버전     | 용도                 |
| ----------------------------------- | -------- | -------------------- |
| `next`                              | ^14.0.0  | React 프레임워크     |
| `react`                             | ^18.2.0  | UI 라이브러리        |
| `axios`                             | ^1.7.9   | HTTP 클라이언트      |
| `@tanstack/react-query`             | ^5.66.0  | 서버 상태 관리       |
| `recoil`                            | ^0.7.7   | 클라이언트 상태 관리 |
| `@emotion/react`, `@emotion/styled` | ^11.14.x | CSS-in-JS            |
| `dayjs`                             | ^1.11.13 | 날짜 처리            |
| `zod`                               | ^3.24.2  | 데이터 스키마 검증   |
| `jwt-decode`                        | ^4.0.0   | JWT 토큰 파싱        |

#### 워크스페이스 패키지

모든 내부 패키지는 workspace 프로토콜로 관리됩니다:

| 패키지                | 용도               |
| --------------------- | ------------------ |
| `@maru/design-system` | 글로벌 스타일      |
| `@maru/ui`            | 재사용 UI 컴포넌트 |
| `@maru/hooks`         | 공유 커스텀 훅     |
| `@maru/icon`          | 아이콘 세트        |
| `@maru/utils`         | 유틸리티 함수      |
| `@maru/eslint-config` | ESLint 설정        |
| `@maru/tsconfig`      | TypeScript 설정    |

#### 외부 UI 라이브러리

| 라이브러리                                     | 용도                 |
| ---------------------------------------------- | -------------------- |
| `@toss/react`                                  | 토스 React 유틸      |
| `@toss/use-overlay`                            | 모달/오버레이 관리   |
| `@suspensive/react`, `@suspensive/react-query` | Suspense 향상        |
| `react-daum-postcode`                          | 주소 검색 (Daum API) |
| `smartcrop`                                    | 이미지 크롭          |

## 에이전트 라우팅

### 형식 수정 및 UI 변경

**대상**: `executor` 또는 `designer`

- 페이지 레이아웃 변경
- 컴포넌트 스타일 수정
- 마크업 재구성

### 지원 서류/결과 로직 수정

**대상**: `executor` 또는 `deep-executor`

- 지원 서류 필드 추가/삭제
- 성적 계산 알고리즘 변경
- 폼 검증 규칙 수정

### 인증/토큰 흐름 변경

**대상**: `security-reviewer` + `executor`

- 토큰 관리 로직 변경
- 인증 미들웨어 수정
- API 인터셉터 변경

### 일정 기반 접근 제어 추가

**대상**: `executor` + `test-engineer`

- `SCHEDULE` 상수 추가
- `middleware.ts` 또는 `usePageAccessGuard` 수정
- 테스트 케이스 작성

### 새 서비스/API 통합

**대상**: `executor` + `document-specialist`

- `src/services/` 하위에 새 서비스 생성
- API 호출 패턴 작성 및 검증
- 에러 처리 추가

### 성능 최적화

**대상**: `quality-reviewer`

- 쿼리 캐싱 전략 검토 (`useQuery` 설정)
- 컴포넌트 렌더링 최적화
- 번들 사이즈 분석

### 모바일 호환성

**대상**: `qa-tester` 또는 `designer`

- 반응형 레이아웃 검증
- 모바일 전용 컴포넌트 테스트
- 터치 인터랙션 검증
