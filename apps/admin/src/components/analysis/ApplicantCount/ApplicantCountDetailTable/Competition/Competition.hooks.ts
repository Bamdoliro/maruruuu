import type { ApplicantCountType } from '@/types/analysis/client';

const useCompetiton = (formList: ApplicantCountType[] | undefined) => {
  const REGULAR_ADMISSION = 36;
  const SPECIAL_ADMISSION = 28;
  const THE_OTHER_AEDMISSION = 6;

  const { regularCount, specialCount, theOtherCount } = formList?.reduce(
    (acc, item) => {
      if (item.type === 'REGULAR') {
        acc.regularCount += item.count;
      } else if (
        !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(
          item.type
        )
      ) {
        acc.specialCount += item.count;
      } else if (
        item.type === 'SPECIAL_ADMISSION' ||
        item.type === 'NATIONAL_VETERANS_EDUCATION'
      ) {
        acc.theOtherCount += item.count;
      }
      return acc;
    },
    {
      regularCount: 0,
      specialCount: 0,
      theOtherCount: 0,
    }
  ) || { regularCount: 0, specialCount: 0, theOtherCount: 0 };

  const regularCompetitionRate = (regularCount / REGULAR_ADMISSION).toFixed(1);
  const specialCompetitionRate = (specialCount / SPECIAL_ADMISSION).toFixed(1);
  const theOtherCompetitionRate = (theOtherCount / THE_OTHER_AEDMISSION).toFixed(1);

  return {
    regularCount,
    specialCount,
    theOtherCount,
    regularCompetitionRate,
    specialCompetitionRate,
    theOtherCompetitionRate,
  };
};

export default useCompetiton;
