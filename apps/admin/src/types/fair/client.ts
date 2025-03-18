export type FairType = 'STUDENT_AND_PARENT' | 'TEACHER';

export type FairStatus =
  | 'APPLICATION_ENDED' // 신청 종료됨
  | 'CLOSED' // 종료됨
  | 'APPLICATION_IN_PROGRESS' // 신청 진행 중
  | 'APPLICATION_NOT_STARTED' // 신청 진행 시작 전
  | 'APPLICATION_EARLY_CLOSED'; // 신청 조기 종료

export interface Fair {
  start: string;
  capacity: number;
  place: String;
  type: FairType;
  applicationStartDate: String | null;
  applicationEndDate: String | null;
}

export interface FairData {
  start: string;
  place: String;
  applicationStartDate: String | null;
  applicationEndDate: String | null;
  status: FairStatus;
}
