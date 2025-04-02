import type { ApplicantCountType } from '@/types/analysis/client';

const useTotal = (formList: ApplicantCountType[] | undefined) => {
  const total = formList?.reduce((sum, item) => sum + item.count, 0) || 0;
  const competitionRate = total ? (total / 64).toFixed(2) : '0.00';

  return { total, competitionRate };
};

export default useTotal;
