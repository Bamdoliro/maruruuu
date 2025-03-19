export type FairType = 'STUDENT_AND_PARENT' | 'TEACHER';

export type FairStatus =
  | 'APPLICATION_ENDED'
  | 'CLOSED'
  | 'APPLICATION_IN_PROGRESS'
  | 'APPLICATION_NOT_STARTED'
  | 'APPLICATION_EARLY_CLOSED';

export interface Fair {
  start: string;
  capacity: number;
  place: string;
  type: FairType;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
}

export interface FairData {
  id: number;
  start: string;
  place: string;
  applicationStartDate: string;
  applicationEndDate: string;
  status: FairStatus;
}
