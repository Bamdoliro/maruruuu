export type FaqCategory =
  | 'ALL_FAQS'
  | 'SCHOOL_LIFE'
  | 'SUBMIT_DOCUMENT'
  | 'ADMISSION_PROCESS'
  | 'TOP_QUESTION';

export interface Faq {
  id: number;
  title: string;
  content: string;
  category: FaqCategory | string;
  createdAt: string;
}

export type FaqInput = Omit<Faq, 'id' | 'createdAt'>;
