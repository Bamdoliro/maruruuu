import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import {
  AnalysisApplicantCountReq,
  GetApplicantCountRes,
  AnalysisApplicantTypeReq,
  GetGradeDistributionRes,
  GenderRatioStatusReq,
  GetGenderRatioRes,
  GraduatedSchoolStatusReq,
  GetGraduatedSchoolRes,
} from '@/types/analysis/remote';

export const getApplicantCountList = async ({ type }: AnalysisApplicantCountReq) => {
  const { data } = await maru.get<GetApplicantCountRes>(
    `/analysis/number-of-applicants?type=${type}`,
    authorization()
  );
  return data;
};

export const getGradeDistributionList = async ({
  statusList,
}: AnalysisApplicantTypeReq) => {
  const { data } = await maru.get<GetGradeDistributionRes>(
    `/analysis/grade-distribution?statusList=${statusList.join('&statusList=')}`,
    authorization()
  );
  return data;
};

export const getGenderRatioList = async ({
  statusList,
  mainCategory,
  type,
}: GenderRatioStatusReq) => {
  const { data } = await maru.get<GetGenderRatioRes>(
    `/analysis/gender-ratio?statusList=${statusList.join('&statusList=')}&mainCategory=${mainCategory}&type=${type}`,
    authorization()
  );
  return data;
};

export const getGraduatedSchoolList = async ({
  statusList,
  isBusan,
  gu,
}: GraduatedSchoolStatusReq) => {
  const { data } = await maru.get<GetGraduatedSchoolRes>(
    `/analysis/school-status?statusList=${statusList.join(
      '&statusList='
    )}&isBusan=${isBusan}&gu=${gu}`,
    authorization()
  );
  return data;
};
