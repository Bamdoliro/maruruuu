export type FormStatus =
  | 'RECEIVED'
  | 'FIRST_FAILED'
  | 'FAILED'
  | 'FINAL_SUBMITTED'
  | 'SUBMITTED'
  | 'APPROVED'
  | 'NO_SHOW'
  | 'FIRST_PASSED'
  | 'PASSED'
  | 'REJECTED'
  | 'ENTERED';

export type FormType =
  | 'MULTI_CHILDREN'
  | 'ONE_PARENT'
  | 'FROM_NORTH_KOREA'
  | 'MULTICULTURAL'
  | 'NATIONAL_BASIC_LIVING'
  | 'SPECIAL_ADMISSION'
  | 'NATIONAL_VETERANS_EDUCATION'
  | 'REGULAR'
  | 'NEAR_POVERTY'
  | 'MEISTER_TALENT'
  | 'FARMING_AND_FISHING'
  | 'NATIONAL_VETERANS'
  | 'TEEN_HOUSEHOLDER';

export type GraduationType = 'EXPECTED' | 'GRADUATED' | 'QUALIFICATION_EXAMINATION';

export type PassStatusType = '합격' | '불합격' | '미정';

export type ExportExcelType =
  | '전체 내보내기'
  | '1차 전형 결과'
  | '2차 전형 결과'
  | '최종 합격자';

export interface Form {
  id: number;
  examinationNumber: number | null;
  name: string;
  birthday: string;
  graduationType: GraduationType;
  school: string;
  status: FormStatus;
  type: FormType;
  isChangedToRegular: boolean;
  totalScore: number | null;
  hasDocument: boolean | null;
  firstRoundPassed: boolean | null;
  secondRoundPassed: boolean | null;
}

export type FormListType = '모두 보기' | '검토해야 하는 원서 모아보기' | '정렬';

export type FormSort = 'total-score-asc' | 'total-score-desc' | 'form-id';

export interface FormListSortingType {
  status: FormStatus | null;
  type: FormType | null;
  sort: FormSort | null;
}
