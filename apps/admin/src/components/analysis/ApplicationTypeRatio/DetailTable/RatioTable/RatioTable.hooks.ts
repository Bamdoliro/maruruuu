import type { ApplicantCountType } from '@/types/analysis/client';

const useScoreRatio = (formList: ApplicantCountType[] | undefined) => {
  const { totalCount, regularCount, specialAdmissionCount, otherCount } =
    formList?.reduce(
      (acc, item) => {
        acc.totalCount += item.count;
        if (item.type === 'REGULAR') {
          acc.regularCount += item.count;
        } else if (
          item.type === 'SPECIAL_ADMISSION' ||
          item.type === 'NATIONAL_VETERANS_EDUCATION'
        ) {
          acc.otherCount += item.count;
        } else {
          acc.specialAdmissionCount += item.count;
        }
        return acc;
      },
      {
        totalCount: 0,
        regularCount: 0,
        specialAdmissionCount: 0,
        otherCount: 0,
      }
    ) || { totalCount: 0, regularCount: 0, specialAdmissionCount: 0, otherCount: 0 };

  const calculateRatio = (count: number) =>
    totalCount !== 0 ? ((count / totalCount) * 100).toFixed(1) + '%' : '0%';

  const regularRatio = calculateRatio(regularCount);
  const specialAdmissionRatio = calculateRatio(specialAdmissionCount);
  const otherRatio = calculateRatio(otherCount);

  return {
    regularCount,
    specialAdmissionCount,
    otherCount,
    regularRatio,
    specialAdmissionRatio,
    otherRatio,
  };
};

export default useScoreRatio;
