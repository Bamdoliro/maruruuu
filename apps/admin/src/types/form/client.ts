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

export interface FormDetail {
  id: number;
  examinationNumber: number;
  applicant: UserInfo;
  parent: ParentInfo;
  education: EducationInfo;
  grade: {
    subjectList: Subject[];
    attendance1: Attendance;
    attendance2: Attendance;
    attendance3: Attendance;
    volunteerTime1: number;
    volunteerTime2: number;
    volunteerTime3: number;
    certificateList: string[];
  };
  document: {
    coverLetter: string;
    statementOfPurpose: string;
  };
  formUrl: string;
  type: FormType;
  status: FormStatus;
  changedToRegular: boolean;
}

export interface UserInfo {
  identificationPictureUri: string;
  name: string;
  phoneNumber: string;
  birthday: string;
  gender: 'MALE' | 'FEMALE';
}

export interface ParentInfo {
  name: string;
  phoneNumber: string;
  relation: string;
  zoneCode: string;
  address: string;
  detailAddress: string;
}

export interface EducationInfo {
  graduationType: GraduationType;
  graduationYear: string;
  schoolName: string;
  schoolLocation: string;
  schoolCode: string;
  schoolPhoneNumber: string;
  schoolAddress: string;
  teacherName: string;
  teacherMobilePhoneNumber: string;
}

export type AchievementLevel = 'A' | 'B' | 'C' | 'D' | 'E' | '-';

export interface AchievementLevelsGroup {
  subjectName: string;
  achievementLevels: AchievementLevel[];
  grades: number[];
  semesters: number[];
}

export interface Subject {
  grade: number;
  semester: number;
  subjectName: string;
  achievementLevel: AchievementLevel;
}

export interface Attendance {
  absenceCount: number;
  latenessCount: number;
  earlyLeaveCount: number;
  classAbsenceCount: number;
}
