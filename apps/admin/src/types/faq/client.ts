export type FaqCategory =
  | 'SCHOOL_LIFE'
  | 'SUBMIT_DOCUMENT'
  | 'ADMISSION_PROCESS'
  | 'TOP_QUESTION';

export type ExtendedFaqCategory = FaqCategory | 'ALL_FAQS';

export interface Faq {
  id: number;
  title: string;
  content: string;
  category: FaqCategory;
  createdAt: string;
}

export type FaqInput = Omit<Faq, 'id' | 'createdAt'>;

export interface FaqCategoryOption {
  value: FaqCategory;
  label: string;
}
