<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2026-03-21 -->

# admin

마루 어드민 페이지는 부산소프트웨어마이스터고등학교의 입학전형 시스템을 관리하는 Next.js 앱입니다. 관리자는 원서, 공지사항, FAQ, 메시지, 공정관리, 등록 관리 등을 처리합니다.

## 개요

**마루(Maru)**: 부산소프트웨어마이스터고등학교 입학전형 관리 시스템
**역할**: 학교 관리자가 학생 원서, 공지, FAQ, 메시지, 공정관리, 등록 현황을 관리하는 어드민 포탈
**스택**: Next.js 14, React 18, TypeScript, Axios, React Query, Recoil, Emotion styled-components
**인증**: JWT 기반 (Access Token + Refresh Token)

## 주요 파일

- `package.json` - 프로젝트 메타데이터 및 의존성
- `src/middleware.ts` - 라우트 보호 (refresh-token 쿠키 확인)
- `src/apis/instance/instance.ts` - Axios 인스턴스 및 인터셉터 (토큰 갱신 로직)
- `src/constants/common/constant.ts` - 라우트, 쿼리 키, 토큰 상수
- `src/app/layout.tsx` - 루트 레이아웃 (Providers, QueryClient, Styled Components)
- `src/app/page.tsx` - 로그인 페이지 (`/`)
- `tsconfig.json` - TypeScript 설정 (Next.js 프리셋, `@/*` 경로 alias)

## 하위 디렉토리

### src/app

**라우팅**: Next.js 14 App Router 기반

| 경로                | 설명                                             | 인증 필수 |
| ------------------- | ------------------------------------------------ | --------- |
| `/`                 | 로그인 페이지 (LoginContent)                     | No        |
| `/form`             | 원서 목록 및 검색                                | Yes       |
| `/form/[id]`        | 원서 상세 정보 (학생정보, 성적, 문서, 상태 관리) | Yes       |
| `/notice`           | 공지사항 목록                                    | Yes       |
| `/notice/create`    | 공지사항 작성                                    | Yes       |
| `/notice/[id]`      | 공지사항 상세                                    | Yes       |
| `/notice/edit/[id]` | 공지사항 수정                                    | Yes       |
| `/faq`              | FAQ 목록                                         | Yes       |
| `/faq/create`       | FAQ 작성                                         | Yes       |
| `/faq/[id]`         | FAQ 상세                                         | Yes       |
| `/faq/edit/[id]`    | FAQ 수정                                         | Yes       |
| `/message`          | 메시지 발송 관리                                 | Yes       |
| `/fair`             | 공정관리 (공정입장료 등)                         | Yes       |
| `/fair/create`      | 공정관리 항목 생성                               | Yes       |
| `/fair/[id]`        | 공정관리 상세                                    | Yes       |
| `/registration`     | 등록 현황 (원서 접수 상태 추적)                  | Yes       |
| `/analysis`         | 지원자 통계 분석                                 | Yes       |

### src/components

UI 컴포넌트 구조:

```
components/
├── registration/
│   └── RegistrationTable/
│       ├── RegistrationTableHeader
│       └── RegistrationTableItem
├── form/
│   └── FormDetail/
│       ├── ApplicantInfo (지원자 정보)
│       ├── ParentInfo (보호자 정보)
│       ├── EducationInfo (학력 정보)
│       ├── Profile (자기소개서)
│       ├── DocumentInfo (제출 서류)
│       ├── GradesInfo (성적)
│       │   ├── Grade
│       │   ├── Certificate
│       │   ├── QualificationExaminationGrade
│       │   └── QualificationExaminationGradeItem
│       ├── StatusManager (원서 상태 관리)
│       └── ReceiveStatusChangeModal (상태 변경 모달)
└── Provider (전역 상태 및 쿼리 프로바이더)
```

**주의**: 각 FormDetail 서브컴포넌트는 원서 데이터의 특정 섹션을 렌더링합니다. 데이터 타입은 `@/types/form/remote.ts`에 정의됩니다.

### src/services

**API 레이어**: 각 도메인별 폴더 구조 (api.ts, queries.ts, mutations.ts)

| 모듈                  | 역할             | 주요 함수                                                                              |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------- |
| `auth/`               | 인증             | `postLoginAdmin()`, `deleteLogoutAdmin()`                                              |
| `form/`               | 원서 조회/수정   | `getFormList()`, `getFormDetail()`, `patchReceiveStatus()`, `patchSecondRoundResult()` |
| `notice/`             | 공지사항 CRUD    | `getNoticeList()`, `createNotice()`, `updateNotice()`, `deleteNotice()`                |
| `faq/`                | FAQ CRUD         | `getFaqList()`, `createFaq()`, `updateFaq()`, `deleteFaq()`                            |
| `fair/`               | 공정관리 CRUD    | `getFairList()`, `createFair()`, `updateFair()`, `deleteFair()`                        |
| `message/`            | 메시지 발송      | `sendMessage()`                                                                        |
| `analysis/`           | 지원자 분석      | `getApplicantStatistics()`                                                             |
| `registration/`       | 등록 현황        | `getRegistrationList()`                                                                |
| `admin/`              | 관리자 정보      | `getAdminInfo()`                                                                       |
| `QueryClientProvider` | React Query 설정 | -                                                                                      |

**패턴**:

- `api.ts` - Axios 호출 (maru 인스턴스 사용)
- `queries.ts` - React Query `useQuery` 훅
- `mutations.ts` - React Query `useMutation` 훅

### src/types

**타입 정의**: 각 도메인별 클라이언트/서버 타입 분리

| 폴더    | 파일                    | 설명                                                    |
| ------- | ----------------------- | ------------------------------------------------------- |
| `form/` | `client.ts`             | 클라이언트 상태 타입 (FormListType, ReceiveStatusValue) |
| `form/` | `remote.ts`             | API 응답 타입 (GetFormListRes, GetFormDetail)           |
| `auth/` | `remote.ts`             | 인증 API 타입 (PostLoginAuthReq)                        |
| 기타    | `client.ts`/`remote.ts` | 동일 패턴                                               |

### src/store

**전역 상태 관리**: Recoil atoms

| 모듈       | 상태                                                                 | 용도                     |
| ---------- | -------------------------------------------------------------------- | ------------------------ |
| `form/`    | `formListType`, `formListSortingType`, `schoolSearch`, `formToPrint` | 원서 필터링 및 인쇄 대상 |
| `fair/`    | `fairForm`                                                           | 공정관리 폼 상태         |
| `message/` | `messageForm`                                                        | 메시지 폼 상태           |
| `notice/`  | `noticeFile`, `uploadedNoticeFile`                                   | 공지 파일 업로드         |
| `form/`    | `secondRoundResult`, `isFormToPrintSelecting`                        | 2차 결과, 인쇄 선택 상태 |

### src/apis

**저수준 API 유틸리티**

| 파일                   | 역할                            |
| ---------------------- | ------------------------------- |
| `instance/instance.ts` | Axios 인스턴스 생성 및 인터셉터 |
| `token/`               | 인증 헤더 헬퍼                  |
| `cookie/`              | 쿠키 유틸                       |
| `storage/`             | 스토리지 유틸                   |

### src/constants

**상수 정의**

| 파일                       | 내용                                  |
| -------------------------- | ------------------------------------- |
| `common/constant.ts`       | 라우트, 쿼리 키, 토큰 키              |
| `form/`, `faq/`, `notice/` | 각 도메인별 상수 (enum 값, 필터 옵션) |

### src/hooks

| 파일             | 역할                      |
| ---------------- | ------------------------- |
| `useApiError.ts` | API 에러 핸들링 커스텀 훅 |
| `index.ts`       | 훅 export                 |

### src/layouts

| 파일            | 역할                                         |
| --------------- | -------------------------------------------- |
| `AppLayout.tsx` | 사이드바, 헤더, 네비게이션을 포함한 레이아웃 |

### src/lib

스타일드 컴포넌트 레지스트리 및 기타 라이브러리 설정

## AI 에이전트 안내

### 작업 시 주의사항

1. **인증 플로우 이해하기**
   - refresh-token 쿠키가 없으면 로그인 페이지로 리다이렉트
   - access-token 만료 시 interceptor가 자동 갱신
   - 갱신 실패 시 localStorage 초기화 후 로그인 페이지로 이동

2. **상태 관리 분리**
   - Recoil: 전역 필터/선택 상태 (formListType, schoolSearch 등)
   - React Query: 서버 데이터 캐싱 (useFormListQuery 등)
   - 로컬 상태: 컴포넌트 내 useState (폼 입력 등)

3. **타입 안정성**
   - `remote.ts`는 API 응답 구조 (서버와의 계약)
   - `client.ts`는 클라이언트 UI 로직의 타입 (필터, 정렬 옵션)
   - 타입 변경 시 양쪽 모두 확인

4. **API 호출**
   - `maru` 인스턴스는 baseURL, 토큰 자동 주입, 재시도 로직을 제공
   - authorization() 헬퍼로 쉽게 Bearer 토큰 추가
   - 폼 데이터는 authorization.FormData() 사용

5. **파일 업로드**
   - notice, fair 등에서 파일 업로드 시 FormData 사용
   - Recoil store에 임시 저장 후 제출

6. **쿼리 캐싱 전략**
   - queryKey는 `src/constants/common/constant.ts`의 KEY 사용
   - 필터/정렬 변경 시 자동으로 쿼리 재실행 (dependency 배열에 포함)
   - invalidateQueries로 수동 캐시 무효화 가능

### 라우팅 구조

**Next.js 14 App Router 기반**

```
app/
├── page.tsx (로그인, 인증 불필요)
├── form/
│   ├── page.tsx (원서 목록)
│   └── [id]/
│       └── page.tsx (원서 상세)
├── notice/
│   ├── page.tsx (공지 목록)
│   ├── create/
│   │   └── page.tsx
│   ├── [id]/
│   │   └── page.tsx
│   └── edit/[id]/
│       └── page.tsx
├── faq/
│   ├── page.tsx (FAQ 목록)
│   ├── create/page.tsx
│   ├── [id]/page.tsx
│   └── edit/[id]/page.tsx
├── fair/, message/, registration/, analysis/
│   └── (동일 패턴)
└── layout.tsx (루트 레이아웃, Provider 감싸기)
```

**middleware.ts**에서 인증이 필요한 경로를 보호합니다. 상세 경로는 `middleware.ts`의 `config.matcher`를 참고하세요.

### 인증 흐름

인증은 JWT 기반이며, `src/apis/instance/instance.ts`의 interceptor가 토큰 갱신을 자동 처리합니다.
상세 흐름은 `src/services/auth/mutations.ts`와 `src/apis/instance/instance.ts`를 참고하세요.

### 테스트

**단위 테스트**:

- Recoil atoms: `renderHook` + `recoilState`
- API 함수: Axios 모킹 (jest.mock)
- React Query hooks: `renderHook` + QueryClientProvider

**통합 테스트**:

- 로그인 → 원서 조회 → 상세보기 플로우
- 필터 변경 → 쿼리 재실행 확인
- 에러 시나리오: 401 → 토큰 갱신 → 재시도

**E2E 테스트** (권장):

- Playwright/Cypress로 로그인부터 데이터 수정까지 시나리오 검증

**로컬 개발**:

```bash
pnpm dev
```

**타입 확인**:

```bash
pnpm check-types
```

**린트**:

```bash
pnpm lint  # max-warnings 0 (모든 경고를 에러로 취급)
```

**포매팅**:

```bash
pnpm format
```

### 의존성

**핵심 라이브러리**:

| 패키지                          | 버전    | 용도                 |
| ------------------------------- | ------- | -------------------- |
| next                            | 14.0.0  | 프레임워크           |
| react                           | 18.2.0  | UI 라이브러리        |
| typescript                      | 5.5.4   | 타입 검사            |
| axios                           | 1.7.9   | HTTP 클라이언트      |
| @tanstack/react-query           | 5.66.0  | 서버 상태 관리       |
| recoil                          | 0.7.7   | 전역 클라이언트 상태 |
| @emotion/react, @emotion/styled | 11.14.x | CSS-in-JS            |
| jwt-decode                      | 4.0.0   | JWT 파싱             |
| react-cookie                    | 7.2.2   | 쿠키 관리            |
| react-toastify                  | 11.0.3  | 토스트 알림          |

**워크스페이스 내부 패키지** (monorepo):

| 패키지              | 용도                      |
| ------------------- | ------------------------- |
| @maru/design-system | 색상 팔레트 (color)       |
| @maru/ui            | 버튼, 입력, 컬럼 컴포넌트 |
| @maru/icon          | 아이콘 세트               |
| @maru/hooks         | 커스텀 훅 유틸            |
| @maru/utils         | flex 유틸 함수            |
| @maru/eslint-config | ESLint 설정 (shared)      |
| @maru/tsconfig      | TypeScript 설정 (shared)  |

**주의**:

- React 18.2.0+, react-dom 18.2.0+ peerDependencies 필요
- Next.js 14는 ESM 기본 (type: "module")

### 확장 가이드

**새 기능 추가 시**:

1. **타입 정의**

   ```
   src/types/{domain}/
   ├── client.ts (UI 로직)
   └── remote.ts (API 응답)
   ```

2. **API 함수**

   ```
   src/services/{domain}/api.ts
   ```

3. **React Query hooks**

   ```
   src/services/{domain}/queries.ts  (읽기)
   mutations.ts (쓰기)
   ```

4. **Recoil 상태** (필요시)

   ```
   src/store/{domain}/
   ```

5. **라우트 추가**

   ```
   src/app/{feature}/page.tsx
   ```

6. **미들웨어 업데이트** (보호 필요시)

   ```
   src/middleware.ts matcher 배열에 추가
   ```

7. **상수 추가**
   ```
   src/constants/{domain}/constant.ts
   ```

### 문제 해결

**401 무한 루프**:

- `src/apis/instance/instance.ts` interceptor 로직 확인

**쿼리 캐시 안 갱신**:

- queryKey가 dependency 배열에 포함되는지 확인
- mutation 후 `queryClient.invalidateQueries({ queryKey: [...] })`

**타입 에러**:

- remote.ts 업데이트 후 client.ts 확인
- API 응답 구조 변경 시 양쪽 동기화

**CORS 에러**:

- 환경변수 및 백엔드 CORS 설정 확인

---

**마지막 업데이트**: 2026-03-21
**관련 문서**: [마루 프로젝트 README](../../README.md)
