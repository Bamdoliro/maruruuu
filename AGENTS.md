<!-- Generated: 2026-03-21 -->

# maruruuu - AI 에이전트 안내

## 개요

**maruruuu**(마루)는 부산소프트웨어마이스터 고등학교의 입학 전형 시스템입니다. 학생 지원서 접수, 결과 확인, 공지사항 관리 등을 위한 웹 애플리케이션입니다.

이 프로젝트는 **pnpm 모노레포**로 구성되어 있으며, Turbo를 사용한 빌드 최적화와 공유 라이브러리 중심의 아키텍처를 따릅니다.

**주요 기술 스택**

- **런타임**: Node.js, pnpm 9.0.0+
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript 5.5.4
- **상태관리**: Recoil, React Query
- **스타일링**: Emotion (CSS-in-JS)
- **빌드**: Turbo 2.3.3+, Next.js
- **린팅**: ESLint 8.0+, Prettier 3.0+
- **패키지 관리**: pnpm-workspace

---

## 주요 파일

| 파일                  | 설명                                                           |
| --------------------- | -------------------------------------------------------------- |
| `package.json`        | 루트 workspace 설정, 공통 스크립트, 린팅 규칙                  |
| `pnpm-workspace.yaml` | pnpm workspace 경로 정의 (`apps/*`, `packages/*`, `configs/*`) |
| `turbo.json`          | Turbo 빌드 태스크 설정 (build, dev, lint, check-types)         |
| `.husky/`             | Git 훅 설정 (자동 린팅, prettier)                              |
| `.eslintrc.json`      | ESLint 설정 (workspace root)                                   |
| `tsconfig.json`       | 루트 TypeScript 설정 (모든 패키지가 상속)                      |
| `LICENSE`             | MIT 라이선스                                                   |

---

## 하위 디렉토리

### apps/

| 디렉토리     | 용도                                              |
| ------------ | ------------------------------------------------- |
| `apps/admin` | 관리자 대시보드 (학생 지원서 관리, 공지사항, FAQ) |
| `apps/user`  | 학생용 애플리케이션 (지원서 작성, 결과 확인)      |

**공통 구조**

```
apps/{admin|user}/
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # React 컴포넌트
│   ├── lib/          # 유틸리티, API 클라이언트
│   └── styles/       # 전역 스타일
├── public/           # 정적 자산
├── next.config.js    # Next.js 설정
├── tsconfig.json     # TypeScript 설정 (root 상속)
└── package.json
```

### packages/

| 디렉토리                 | 용도                                                |
| ------------------------ | --------------------------------------------------- |
| `packages/design-system` | Emotion 기반 디자인 토큰 (색상, 타이포그래피, 간격) |
| `packages/ui`            | 재사용 가능한 React UI 컴포넌트                     |
| `packages/hooks`         | 커스텀 React 훅 (상태, 폼, API 데이터 관리)         |
| `packages/icon`          | SVG 아이콘 컴포넌트                                 |
| `packages/utils`         | 유틸리티 함수 (포매팅, 유효성 검사, 헬퍼)           |

**패키지 모두 ESM 모듈 (`"type": "module"`)이며, 이름 규칙은 `@maru/*`입니다.**

### configs/

| 디렉토리                   | 용도                                          |
| -------------------------- | --------------------------------------------- |
| `configs/eslint-config`    | ESLint 기본 설정                              |
| `configs/eslint-config-ts` | TypeScript 특화 ESLint 규칙                   |
| `configs/eslint-config-js` | JavaScript 특화 ESLint 규칙                   |
| `configs/tsconfig`         | 공유 TypeScript 설정 (기본, strict, react 등) |

---

## AI 에이전트 안내

### 작업 시 주의사항

#### 1. 모노레포 구조 이해

- **Turbo 의존성**: 빌드는 `turbo run build`로 실행됩니다. 각 패키지는 `^build` 의존성을 선언하고 있어 **상향식(bottom-up) 빌드**가 발생합니다.
- **workspace 프로토콜**: 모든 내부 의존성은 `"workspace:*"`를 사용합니다. 버전 관리는 각 패키지의 `package.json`에서 수행됩니다.
- **패키지 격리**: 각 패키지는 독립적인 린트 규칙과 설정을 가질 수 있습니다. 공유 설정은 `configs/`에서 제공됩니다.

#### 2. 애플리케이션 간 차이점

- **admin** (`apps/admin/`): 서버/API 중심. 학생 목록 관리, 지원서 검토, 통계 대시보드.
  - 엄격한 린팅: `next lint --max-warnings 0` (경고 불허)
  - 더 많은 서버 유틸리티 필요

- **user** (`apps/user/`): 클라이언트 중심. 폼 입력, 이미지 업로드, 지도 주소 검색.
  - 추가 라이브러리: `react-daum-postcode`, `smartcrop`, `dayjs`, `zod`
  - 경고 허용: `next lint` (경고 제한 없음)

#### 3. pnpm 명령 사용

```bash
# 루트에서 모노레포 전체 설치
pnpm install

# 특정 패키지에만 의존성 추가
pnpm add -w -D @types/node        # 루트에 추가
pnpm add -r --filter=admin axios  # admin 앱에만 추가

# Turbo를 통한 빌드
pnpm build                        # 모든 패키지 빌드
pnpm dev                          # admin, user 앱만 개발 모드 (packages 제외)
pnpm lint                         # 모든 패키지 린팅
```

#### 4. TypeScript 설정

- **기본 tsconfig**: `configs/tsconfig/base.json` (모든 패키지가 상속)
- **앱별 tsconfig**: `apps/{admin|user}/tsconfig.json` (Next.js와 React 특화)
- **strict 모드**: 활성화됨. null/undefined 안전성 필수.

#### 5. ESLint & Prettier 자동화

- **husky**: Git 훅으로 커밋 전 자동 린팅 및 포매팅
- **lint-staged**: 변경된 파일만 린팅
- **포매팅 규칙**: `prettier --write` 실행 후 커밋

---

### 테스트

**현재 상태**: 테스트 프레임워크(Jest, Vitest 등)가 구성되어 있지 않습니다.

테스트가 필요한 경우:

1. **단위 테스트** (유틸리티, 훅): Vitest 권장
2. **통합 테스트** (컴포넌트, 페이지): @testing-library/react + Vitest
3. **E2E 테스트**: Playwright 또는 Cypress

#### 수동 검증 방법

```bash
# 앱 시작
pnpm dev

# 각 앱이 별도 포트로 실행됩니다

# 타입 체크
pnpm check-types

# 린팅
pnpm lint

# 포매팅 검증
pnpm format
```

---

### 공통 패턴

#### 1. 컴포넌트 작성 (Emotion + UI 패키지)

```typescript
// packages/ui/components/Button.tsx
import styled from '@emotion/styled';
import { designSystem } from '@maru/design-system';

const StyledButton = styled.button`
  padding: ${designSystem.spacing.md};
  background-color: ${designSystem.colors.primary};
  color: white;
  border: none;
  border-radius: ${designSystem.borderRadius.md};
  font-family: ${designSystem.typography.body.fontFamily};
  cursor: pointer;

  &:hover {
    background-color: ${designSystem.colors.primaryDark};
  }
`;

export const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StyledButton>{children}</StyledButton>
);
```

#### 2. 커스텀 훅 (Recoil 상태)

```typescript
// packages/hooks/useAuth.ts
import { useRecoilState } from 'recoil';
import { authAtom } from './atoms';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);

  const login = async (credentials: LoginCredentials) => {
    const data = await authApi.login(credentials);
    setAuth(data);
  };

  return { auth, login };
};
```

#### 3. 유틸리티 함수

```typescript
// packages/utils/format.ts
export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
```

#### 4. API 클라이언트 (Axios + React Query)

```typescript
// apps/user/src/lib/api.ts
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // .env에서 설정
});

export const useApplications = () => {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await apiClient.get('/applications');
      return data;
    },
  });
};
```

#### 5. Next.js 페이지 구조

```typescript
// apps/user/src/app/apply/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@maru/hooks';
import { ApplicationForm } from '@/components/ApplicationForm';

export default function ApplyPage() {
  const { auth } = useAuth();

  if (!auth) return <div>로그인이 필요합니다.</div>;

  return <ApplicationForm />;
}
```

---

### 의존성

#### 내부 의존성 그래프

```
apps/admin
├── @maru/design-system
├── @maru/hooks
├── @maru/icon
├── @maru/ui
│   ├── @maru/design-system
│   ├── @maru/hooks
│   ├── @maru/icon
│   └── @maru/utils
├── @maru/utils
├── @maru/eslint-config (devDep)
└── @maru/tsconfig (devDep)

apps/user
├── @maru/design-system
├── @maru/hooks
├── @maru/icon
├── @maru/ui (위 동일)
├── @maru/utils
├── @maru/eslint-config (devDep)
└── @maru/tsconfig (devDep)

packages/ui
├── @maru/design-system
├── @maru/hooks
├── @maru/icon
└── @maru/utils

packages/hooks
├── recoil
└── es-toolkit
```

#### 주요 외부 의존성

| 라이브러리                          | 버전      | 용도                           |
| ----------------------------------- | --------- | ------------------------------ |
| `react`, `react-dom`                | ^18.2.0   | 페어 의존성 (peerDependencies) |
| `next`                              | ^14.0.0   | 프레임워크                     |
| `typescript`                        | 5.5.4     | 언어                           |
| `@emotion/react`, `@emotion/styled` | ^11.14.0+ | CSS-in-JS                      |
| `recoil`                            | ^0.7.7    | 전역 상태 관리                 |
| `@tanstack/react-query`             | ^5.66.0   | 서버 상태 관리                 |
| `axios`                             | ^1.7.9    | HTTP 클라이언트                |
| `jwt-decode`                        | ^4.0.0    | JWT 파싱                       |
| `react-cookie`                      | ^7.2.2    | 쿠키 관리 (admin)              |
| `react-daum-postcode`               | ^3.2.0    | 주소 검색 (user)               |
| `zod`                               | ^3.24.2   | 스키마 유효성 검사 (user)      |
| `dayjs`                             | ^1.11.13  | 날짜 유틸리티 (user)           |
| `turbo`                             | ^2.3.3    | 모노레포 빌드                  |

#### 피어 의존성 주의

- **react**, **react-dom**은 모든 패키지에서 `peerDependencies`로 선언됩니다.
- 앱 레벨(`apps/admin`, `apps/user`)에서만 명시적으로 설치되어야 합니다.
- 패키지 추가 시 `peerDependencies`와 `devDependencies`의 구분을 정확히 하세요.

---

## 에이전트 작업 예시

### 기능 구현 흐름

1. **feature 추가** (예: 새 폼 필드)

   ```bash
   # 1. 디자인 토큰 확장 (필요시)
   # packages/design-system/colors.ts 수정

   # 2. UI 컴포넌트 생성
   # packages/ui/components/TextField.tsx 작성

   # 3. 앱에서 사용
   # apps/user/src/components/ApplicationForm.tsx 에서 import

   # 4. 빌드 및 테스트
   pnpm build && pnpm check-types && pnpm lint
   ```

2. **버그 수정**
   - 먼저 `pnpm check-types`로 타입 오류 확인
   - `pnpm lint`로 린트 오류 확인
   - 해당 패키지 빌드: `turbo run build --filter=@maru/hooks`
   - Turbo 캐시 무효화 필요 시: `turbo build --no-cache`

3. **의존성 업그레이드**
   ```bash
   pnpm update react@latest react-dom@latest -r
   pnpm check-types && pnpm lint && pnpm build
   ```

---

## 유용한 Turbo 명령

```bash
# 특정 패키지만 빌드
pnpm turbo run build --filter=admin

# 캐시 무효화
pnpm turbo run build --no-cache

# 의존성 그래프 확인
pnpm turbo --graph

# 변경사항 영향도 확인
pnpm turbo run build --filter=[HEAD^]
```

---

## 환경 변수

각 앱은 자신의 `.env` 파일에서 환경 변수를 관리합니다.

---

## 자주 묻는 질문

**Q: 패키지 추가 후 앱에서 인식이 안 됨**
A: `pnpm install` 후 IDE 재시작 및 `tsconfig.json` paths 확인. 경로는 일반적으로 자동 생성됩니다.

**Q: Turbo 캐시가 오래됨**
A: `pnpm turbo run build --no-cache` 실행

**Q: ESLint/Prettier 자동 수정이 안 됨**
A: `pnpm format` 또는 `pnpm lint -- --fix` 수동 실행

**Q: 개발 중 앱이 자동 새로고침이 안 됨**
A: `turbo.json`의 `dev` 태스크는 `persistent: true`입니다. 서버 재시작 시도.

---

**마지막 업데이트**: 2026-03-21
