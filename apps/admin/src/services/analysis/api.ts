import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import {
  AnalysisApplicantCountReq,
  GetApplicantCountRes,
  AnalysisApplicantTypeReq,
  GetGradeDistributionRes,
} from '@/types/analysis/remote';

export const getApplicantCountList = async ({ type }: AnalysisApplicantCountReq) => {
  const { data } = await maru.get<GetApplicantCountRes>(
    `/analysis/number-of-applicants?type=${type}`,
    authorization()
  );
  return data;
};

export const getGradeDistributionList = async ({ statusList }: AnalysisApplicantTypeReq) => {
  const { data } = await maru.get<GetGradeDistributionRes>(
    `/analysis/grade-distribution?type=${statusList}`,
    authorization()
  );
  return data;
};
