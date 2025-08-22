import type {
  FaqCategory,
  FaqCategoryOption,
  ExtendedFaqCategory,
} from '@/types/faq/client';

export const FAQ_CATEGORY: Record<FaqCategory, string> = {
  SCHOOL_LIFE: '학교생활',
  SUBMIT_DOCUMENT: '관련 제출 서류',
  ADMISSION_PROCESS: '입학 과정',
  TOP_QUESTION: '질문 TOP',
} as const;

export const FAQ_CATEGORY_OPTIONS: FaqCategoryOption[] = [
  { value: 'SCHOOL_LIFE', label: '학교생활' },
  { value: 'SUBMIT_DOCUMENT', label: '관련 제출 서류' },
  { value: 'ADMISSION_PROCESS', label: '입학 과정' },
  { value: 'TOP_QUESTION', label: '질문 TOP' },
];

export const EXTENDED_FAQ_CATEGORY: Record<ExtendedFaqCategory, string> = {
  ALL_FAQS: '전체 보기',
  ...FAQ_CATEGORY,
} as const;
