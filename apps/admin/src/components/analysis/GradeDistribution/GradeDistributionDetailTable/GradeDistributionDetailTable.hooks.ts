import { GradeDistributionType } from '@/types/analysis/client';

const useMaxMin = (formList: GradeDistributionType[] | undefined) => {
  const entireFirstRoundMax =
    formList && formList.length > 0
      ? Math.max(...formList.map((item) => item.firstRoundMax)).toFixed(3)
      : '0.000';

  const minList = formList
    ? formList.map((item) => item.firstRoundMin).filter((value) => value !== 0)
    : [];

  const entireFirstRoundMin =
    minList.length > 0 ? Math.min(...minList).toFixed(3) : '0.000';

  return { max: entireFirstRoundMax, min: entireFirstRoundMin };
};

export default useMaxMin;
