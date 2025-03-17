import { KEY } from '@/constants/common/constant';
import { AnalysisApplicantCountReq } from '@/types/analysis/remote';
import { useQuery } from '@tanstack/react-query';
import { getApplicantCount } from './api';

export const useApplicantCountQuery = (type: AnalysisApplicantCountReq) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.APPLICANT_COUNT, type] as const,
    queryFn: () => getApplicantCount(type),
  });

  return { data: data?.dataList, ...restQuery };
};
