import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { AnalysisApplicantCountReq, GetApplicantCountRes } from '@/types/analysis/remote';

export const getApplicantCount = async ({ type }: AnalysisApplicantCountReq) => {
  const { data } = await maru.get<GetApplicantCountRes>(
    `/analysis/number-of-applicants?type=${type}`,
    authorization()
  );
  return data;
};
