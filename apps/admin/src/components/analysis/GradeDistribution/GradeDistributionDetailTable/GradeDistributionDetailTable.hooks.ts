import type { GradeDistributionType } from '@/types/analysis/client';

const useMaxMin = (
  formList: GradeDistributionType[] | undefined,
  selectedRound: string
) => {
  const isFirstRound = selectedRound === '1차 합격자';

  const entireFirstRoundMax =
    formList && formList.length > 0
      ? isFirstRound
        ? Math.max(...formList.map((item) => item.firstRoundMax)).toFixed(3)
        : Math.max(...formList.map((item) => item.totalMax ?? 0)).toFixed(3)
      : '0.000';

  const minList = formList
    ? isFirstRound
      ? formList.map((item) => item.firstRoundMin).filter((value) => value !== 0)
      : formList.map((item) => item.totalMin ?? 0).filter((value) => value !== 0)
    : [];

  const entireFirstRoundMin =
    minList.length > 0 ? Math.min(...minList).toFixed(3) : '0.000';

  return { max: entireFirstRoundMax, min: entireFirstRoundMin };
};

export default useMaxMin;
