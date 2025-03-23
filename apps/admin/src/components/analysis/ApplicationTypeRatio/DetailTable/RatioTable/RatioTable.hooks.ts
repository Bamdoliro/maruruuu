import { ApplicantCountType } from '@/types/analysis/client';

const useScoreRatio = (formList: ApplicantCountType[] | undefined) => {
  const totalCount = formList?.reduce((sum, item) => sum + item.count, 0) || 0;

  const regularCount =
    formList
      ?.filter((item) => item.type === 'REGULAR')
      .reduce((sum, item) => sum + item.count, 0) || 0;

  const specialAdmissionCount =
    formList
      ?.filter(
        (item) =>
          !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(
            item.type
          )
      )
      .reduce((sum, item) => sum + item.count, 0) || 0;

  const otherCount =
    formList
      ?.filter(
        (item) =>
          item.type === 'SPECIAL_ADMISSION' || item.type === 'NATIONAL_VETERANS_EDUCATION'
      )
      .reduce((sum, item) => sum + item.count, 0) || 0;

  const regularRatio =
    totalCount !== 0 ? ((regularCount / totalCount) * 100).toFixed(1) + '%' : 0;
  const specialAdmissionRatio =
    totalCount !== 0 ? ((specialAdmissionCount / totalCount) * 100).toFixed(1) + '%' : 0;
  const otherRatio =
    totalCount !== 0 ? ((otherCount / totalCount) * 100).toFixed(1) + '%' : 0;

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
