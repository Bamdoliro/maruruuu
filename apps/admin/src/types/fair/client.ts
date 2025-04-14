export type FairType = 'STUDENT_AND_PARENT' | 'TEACHER';

export type StatusType = 'open' | 'closed' | 'full';

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
  type: string;
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

export interface AttendeeData {
  schoolName: string;
  name: string;
  type: string;
  phoneNumber: string;
  headcount: number;
  question: string;
}

export interface FairDetailData {
  start: string;
  place: string;
  applicationStartDate: string;
  applicationEndDate: string;
  status: FairStatus;
  attendeeList: AttendeeData[];
}
export interface FairDataInput {
  start: string;
  capacity: number;
  place: string;
  type: string;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
  date: string;
  time: string;
}
