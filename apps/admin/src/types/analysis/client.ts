export type AreaCategory =
  | 'BUSAN'
  | 'OTHER_AREA'
  | '강서구'
  | '금정구'
  | '기장군'
  | '남구'
  | '동구'
  | '동래구'
  | '부산진구'
  | '북구'
  | '사상구'
  | '사하구'
  | '서구'
  | '수영구'
  | '연제구'
  | '영도구'
  | '중구'
  | '해운대구'
  | '';

export type FormType =
  | 'REGULAR'
  | 'MEISTER_TALENT'
  | 'NATIONAL_BASIC_LIVING'
  | 'NEAR_POVERTY'
  | 'NATIONAL_VETERANS'
  | 'ONE_PARENT'
  | 'FROM_NORTH_KOREA'
  | 'MULTICULTURAL'
  | 'TEEN_HOUSEHOLDER'
  | 'MULTI_CHILDREN'
  | 'FARMING_AND_FISHING'
  | 'SPECIAL_ADMISSION'
  | 'NATIONAL_VETERANS_EDUCATION';

export type AnalysisApplicantType =
  | 'FIRST_PASSED'
  | 'FAILED'
  | 'PASSED'
  | 'NO_SHOW'
  | 'RECEIVED'
  | 'FIRST_FAILED'
  | 'ENTERED';

export type AnalysisApplicantCountType = 'CURRENT' | 'ORIGINAL';

export type FormTypeMainCategory = 'REGULAR' | 'SPECIAL' | 'SUPERNUMERARY';

export type GenderRatioCategory =
  | 'REGULAR'
  | 'MEISTER_TALENT'
  | 'SOCIAL_INTEGRATION'
  | 'SPECIAL_ADMISSION'
  | 'NATIONAL_VETERANS_EDUCATION';

export interface ApplicantCountType {
  type: FormType;
  count: number;
}

export interface GradeDistributionType {
  type: FormType;
  firstRoundMax: number;
  firstRoundMin: number;
  firstRoundAvg: number;
  totalMax: number;
  totalMin: number;
  totalAvg: number;
}

export interface GenderRatioType {
  category: GenderRatioCategory;
  busanMale: number;
  busanFemale: number;
  otherLocationMale: number;
  otherLocationFemale: number;
}

export interface GraduatedSchoolStatus {
  applicantName: string;
  schoolName: string;
  schoolAddress: string;
}

export interface GenderRatioCount {
  maleCount: number;
  femaleCount: number;
  regularRatio: GenderRatio;
  specialRatio: GenderRatio;
  supernumeraryRatio: GenderRatio;
}

export interface GenderRatio {
  totalMale: number;
  totalFemale: number;
}
