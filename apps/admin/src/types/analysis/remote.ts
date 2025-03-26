import type {
  AnalysisApplicantCountType,
  ApplicantCountType,
  AnalysisApplicantType,
  GradeDistributionType,
  FormTypeMainCategory,
  GenderRatioType,
  AreaCategory,
  GraduatedSchoolStatus,
} from './client';

export interface AnalysisApplicantCountReq {
  type: AnalysisApplicantCountType;
}

export interface GetApplicantCountRes {
  dataList: ApplicantCountType[];
}

export interface AnalysisApplicantTypeReq {
  statusList: AnalysisApplicantType[];
}

export interface GetGradeDistributionRes {
  dataList: GradeDistributionType[];
}

export interface GenderRatioStatusReq {
  statusList: AnalysisApplicantType[];
  mainCategory: FormTypeMainCategory;
  type: AnalysisApplicantCountType;
}

export interface GetGenderRatioRes {
  dataList: GenderRatioType[];
}

export interface GraduatedSchoolStatusReq {
  statusList: AnalysisApplicantType[];
  isBusan: boolean;
  gu?: AreaCategory | null;
}

export interface GetGraduatedSchoolRes {
  dataList: GraduatedSchoolStatus[];
}
