<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2026-03-21 -->

# utils

## 개요

`@maru/utils`는 마루 프로젝트에서 자주 사용하는 유틸리티 함수와 스타일 헬퍼를 제공하는 패키지입니다.
날짜 포맷팅, 링크 변환, Flex 레이아웃 스타일 등 도메인 특화 로직을 중앙화하여 코드 중복을 방지합니다.

**핵심 책임:**

- 날짜/시간 포맷팅 함수
- URL/링크 변환 함수
- CSS Flex 레이아웃 헬퍼
- Emotion 기반 스타일 유틸리티

## 주요 파일

| 파일                           | 용도                                            |
| ------------------------------ | ----------------------------------------------- |
| `functions/formatTime.ts`      | 시간 포맷팅 (예: "14:30")                       |
| `functions/formatCreatedAt.ts` | 생성 시각 포맷팅 (예: "2024년 3월 21일")        |
| `functions/formatPostedAt.ts`  | 게시 시각 포맷팅 (상대시간, 예: "2시간 전")     |
| `functions/convertLink.ts`     | URL 문자열 → 링크 객체 변환                     |
| `styles/flex.ts`               | Flex 레이아웃 CSS 헬퍼 (row, column, center 등) |
| `index.ts`                     | 공개 export                                     |

## AI 에이전트 안내

### 작업 시 주의사항

1. **함수 추가**: `/functions/` 폴더에 새 파일 생성 후 `index.ts`에서 export.
   - 파일명: 명사 + 동사형 또는 camelCase (예: `formatTime.ts`, `convertLink.ts`)
   - 단일 책임 원칙 준수 (한 파일 = 한 기능 또는 관련 함수들)

2. **날짜 포맷팅**: JavaScript Date 또는 ISO 문자열 처리 시 타임존 고려.

   ```tsx
   // formatCreatedAt: 한국 시간 기준 ("2024년 3월 21일")
   // formatPostedAt: 상대시간 ("2시간 전", "어제")
   // formatTime: 시간만 추출 ("14:30")
   ```

3. **스타일 유틸**: `flex.ts`는 Emotion의 css 객체를 반환.

   ```tsx
   import { flex } from '@maru/utils';
   import { css } from '@emotion/react';

   const MyStyle = css`
     ${flex.row}
     ${flex.center}
     gap: 8px;
   `;
   ```

4. **Recoil 상태 접근**: utils에서는 Recoil을 직접 사용하지 않음 (순수 함수 유지).
   - 상태 관련 로직은 `@maru/hooks`로 위임
   - utils는 받은 데이터만 변환/포맷팅

5. **타입 안전성**: 모든 함수에 명시적 매개변수 타입 및 반환값 타입 지정.

   ```tsx
   export default function formatTime(date: Date): string {
     return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
   }
   ```

6. **의존성 추가**: Recoil, Emotion 이미 포함. 추가 라이브러리 필요시 논의 후 추가.

### 의존성

| 패키지            | 유형           | 버전     | 용도                       |
| ----------------- | -------------- | -------- | -------------------------- |
| `@emotion/react`  | dependency     | ^11.14.0 | CSS-in-JS (flex 스타일)    |
| `@emotion/styled` | dependency     | ^11.14.1 | styled 컴포넌트 (호환성)   |
| `recoil`          | dependency     | ^0.7.7   | 상태 관리 (미사용, 호환성) |
| `react`           | peerDependency | ^18.0.0  | React 페이지 제공자        |
| `react-dom`       | peerDependency | ^18.0.0  | DOM 렌더링                 |

**다운스트림 의존:**

- `@maru/ui` — 날짜 포맷팅, Flex 스타일 사용
- 모든 앱(`admin`, `user`) — 날짜, 링크 변환, 레이아웃 스타일

### 추천 작업 흐름

**날짜 포맷팅 함수 추가:**

1. `/functions/format{Purpose}.ts` 파일 생성
2. 목적에 맞는 포맷팅 로직 구현 (한국 시간 기준)
3. 타입 정의: `(input: Date | string): string`
4. `index.ts`에서 export 추가
5. `pnpm lint`로 TypeScript 검증

**Flex 스타일 추가:**

1. `/styles/flex.ts`에서 새로운 스타일 객체 정의
   ```tsx
   export const flex = {
     row: css`
       display: flex;
       flex-direction: row;
     `,
     column: css`
       display: flex;
       flex-direction: column;
     `,
     center: css`
       justify-content: center;
       align-items: center;
     `,
   };
   ```
2. 테스트: 컴포넌트에서 `flex.{style}` 사용 확인

**함수 사용 (UI 컴포넌트에서):**

```tsx
import {
  formatCreatedAt,
  formatPostedAt,
  formatTime,
  convertLink,
  flex,
} from '@maru/utils';

export function PostCard({ createdAt, content }) {
  return (
    <div
      css={css`
        ${flex.column} gap: 8px;
      `}
    >
      <time>{formatCreatedAt(createdAt)}</time>
      <span>{formatPostedAt(createdAt)}</span>
      <p>{content}</p>
    </div>
  );
}
```

**링크 변환:**

```tsx
const link = convertLink('https://example.com/page?id=123');
// { href: 'https://example.com/page?id=123', text: 'example.com' }
```

### 성능 고려사항

- formatPostedAt은 상대시간 계산 시 정확도 vs 성능 트레이드오프 고려
- Flex 스타일은 css 객체로 정의되어 컴포넌트 렌더링 시마다 재계산 가능 → memoization 검토
