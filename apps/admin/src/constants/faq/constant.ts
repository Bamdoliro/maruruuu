import type { FaqCategory } from '@/types/faq/client';

export const FAQ_CATEGORY: Record<FaqCategory, string> = {
  ALL_FAQS: '모든 자주 묻는 질문',
  SCHOOL_LIFE: '학교생활',
  SUBMIT_DOCUMENT: '관련 제출 서류',
  ADMISSION_PROCESS: '입학 과정',
  TOP_QUESTION: '질문 TOP',
} as const;
