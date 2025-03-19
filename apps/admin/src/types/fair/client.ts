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
  place: String;
  type: FairType;
  applicationStartDate: String | null;
  applicationEndDate: String | null;
}

export interface FairData {
  id: number;
  start: string;
  place: String;
  applicationStartDate: String | null;
  applicationEndDate: String | null;
  status: FairStatus;
}
