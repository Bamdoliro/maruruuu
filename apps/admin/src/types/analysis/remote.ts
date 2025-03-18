import {
  AnalysisApplicantCountType,
  ApplicantCountType,
  AnalysisApplicantType,
  GradeDistributionType,
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
