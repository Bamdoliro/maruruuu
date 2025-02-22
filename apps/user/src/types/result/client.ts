export interface Result {
  id: number;
  name: string;
  type: string;
  changedToRegular: boolean;
  passed: boolean;
}

export type ResultStep = 'MAIN' | 'RESULT';
