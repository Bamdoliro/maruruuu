import { AnalysisApplicantCountType, ApplicantCount } from './client';

export interface AnalysisApplicantCountReq {
  type: AnalysisApplicantCountType;
}

export interface GetApplicantCountRes {
  dataList: ApplicantCount[];
}
