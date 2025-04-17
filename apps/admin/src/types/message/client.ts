export type RecipientType =
  | 'FINAL_SUBMITTED'
  | 'RECEIVED'
  | 'REJECTED'
  | 'FIRST_PASSED'
  | 'MEISTER_TALENT'
  | 'REGULAR'
  | 'PASSED';

export interface MessageForm {
  title: string;
  recipient: RecipientType;
  content: string;
}
