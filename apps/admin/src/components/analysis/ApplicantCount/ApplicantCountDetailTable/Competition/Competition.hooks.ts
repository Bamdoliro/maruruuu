import { ApplicantCountType } from '@/types/analysis/client';

const useCompetiton = (formList: ApplicantCountType[] | undefined) => {
  const regularCount =
    formList
      ?.filter((item) => (item.type = 'REGULAR'))
      .reduce((sum, item) => sum + item.count, 0) || 0;

  const specialCount =
    formList
      ?.filter(
        (item) =>
          !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(
            item.type
          )
      )
      .reduce((sum, item) => sum + item.count, 0) || 0;

  const theOtherCount =
    formList
      ?.filter(
        (item) =>
          item.type === 'SPECIAL_ADMISSION' || item.type === 'NATIONAL_VETERANS_EDUCATION'
      )
      .reduce((sum, item) => sum + item.count, 0) || 0;

  const regularCompetitionRate = (regularCount / 36).toFixed(1);
  const specialCompetitionRate = (specialCount / 28).toFixed(1);
  const theOtherCompetitionRate = (theOtherCount / 3).toFixed(1);

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
