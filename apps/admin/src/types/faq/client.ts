export type FaqCategory =
  | 'SCHOOL_LIFE'
  | 'SUBMIT_DOCUMENT'
  | 'ADMISSION_PROCESS'
  | 'TOP_QUESTION';

export interface Faq {
  id: number;
  title: string;
  content: string;
  category: FaqCategory;
  createdAt: string;
}
