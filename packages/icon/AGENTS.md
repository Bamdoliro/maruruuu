<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2026-03-21 -->

# icon

## 개요

`@maru/icon`은 마루 프로젝트에서 사용하는 SVG 아이콘 컴포넌트 라이브러리입니다.
각 아이콘은 독립적인 React 컴포넌트로 제공되며, 크기, 색상, 회전 등 props로 커스터마이징 가능합니다.

**핵심 책임:**

- 40+ 아이콘 컴포넌트 제공 (추가 버튼, 화살표, 체크, 클릭, 캘린더 등)
- SVG 최적화 및 접근성(accessibility) 보장
- 일관된 아이콘 인터페이스 제공

## 주요 파일

| 파일                    | 용도                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `src/Icon*.tsx` (40+개) | 개별 아이콘 컴포넌트 (예: IconAdd, IconSearch, IconCalendar) |
| `index.ts`              | 모든 아이콘 export                                           |

## 아이콘 목록

**기본 아이콘:**

- IconAdd, IconClose, IconSearch, IconFilter, IconUpload, IconDownload

**네비게이션:**

- IconArrowTop, IconArrowBottom, IconArrowLeft, IconArrowRight, IconArrowDropdown, IconArrowOutward

**상태 표현:**

- IconCheck, IconCheckCircle, IconCheckDocument, IconError, IconCancelCircle, IconVisibleEye, IconInvisibleEye

**도메인 특화:**

- IconSchool, IconCalendar, IconClock, IconPhone, IconCall, IconPerson, IconBadge
- IconAdmission (입시), IconLoader (로딩)

**브랜드:**

- IconRoundBamdoliro, IconRoundInstagram

## AI 에이전트 안내

### 작업 시 주의사항

1. **아이콘 추가**: 디자이너가 제공한 SVG를 React 컴포넌트로 변환.

   ```tsx
   // 예시: IconAdd.tsx
   export default function IconAdd(props: SVGProps<SVGSVGElement>) {
     return (
       <svg viewBox="0 0 24 24" {...props}>
         <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" />
       </svg>
     );
   }
   ```

2. **SVG 최적화**:
   - viewBox 속성 필수 (크기 조정을 위해)
   - `currentColor` 사용으로 색상 상속 가능
   - 불필요한 속성 제거 (width, height는 CSS로 관리)

3. **접근성**:
   - 의미있는 아이콘: `aria-label` 또는 `title` 제공
   - 장식용 아이콘: `aria-hidden="true"` 추가

4. **props 일관성**: 모든 아이콘이 SVGProps<SVGSVGElement>를 확장하여 일관된 인터페이스 제공.
   - 부모에서 크기 제어: `className`, `width`, `height`, `style` 등 가능

5. **export 추가**: 새 아이콘 생성 후 반드시 `index.ts`에서 export 추가.

### 의존성

| 패키지  | 유형           | 버전    | 용도                |
| ------- | -------------- | ------- | ------------------- |
| `react` | peerDependency | ^18.0.0 | React 컴포넌트 기반 |

**다운스트림 의존:**

- `@maru/ui` — 버튼, 입력, 드롭다운 등의 아이콘 사용
- 모든 앱(`admin`, `user`) — UI 렌더링

### 추천 작업 흐름

**아이콘 추가:**

1. 디자이너로부터 SVG 파일 수신
2. `/src/Icon{Name}.tsx` 파일 생성
3. SVG를 React 컴포넌트로 변환
   - viewBox, stroke/fill 속성 확인
   - currentColor 사용으로 색상 상속 활성화
4. `index.ts`에서 export 추가
5. `pnpm lint`로 TypeScript 검증

**아이콘 사용 (UI 컴포넌트에서):**

```tsx
import { IconSearch } from '@maru/icon';

export function SearchBar() {
  return (
    <div>
      <IconSearch width={20} height={20} />
      <input placeholder="검색..." />
    </div>
  );
}
```

**아이콘 크기/색상 제어:**

- CSS 클래스: `className="w-5 h-5 text-blue-500"`
- 인라인: `width={20} height={20} style={{ color: 'blue' }}`
- stroke/fill 직접 설정: `<IconAdd stroke="blue" />`

**접근성 고려:**

```tsx
// 의미있는 아이콘
<IconSearch aria-label="검색 실행" />

// 장식용 아이콘
<IconAdd aria-hidden="true" />
```
