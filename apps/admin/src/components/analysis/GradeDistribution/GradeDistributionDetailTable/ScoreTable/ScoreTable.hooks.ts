import type { GradeDistributionType } from '@/types/analysis/client';

const useScoreStatus = (formList: GradeDistributionType[] | undefined) => {
  const regularRoundMax = formList
    ? Math.max(
        ...formList
          .filter((item) => item.type === 'REGULAR')
          .map((item) => item.firstRoundMax)
      ).toFixed(3)
    : undefined;

  const SpecialAdmissionRoundMax = formList
    ? Math.max(
        ...formList
          .filter(
            (item) =>
              !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(
                item.type
              )
          )
          .map((item) => item.firstRoundMax)
      ).toFixed(3)
    : undefined;

  const regularRoundMin = formList
    ? Math.min(
        ...formList
          .filter((item) => item.type === 'REGULAR')
          .map((item) => item.firstRoundMin)
      ).toFixed(3)
    : undefined;

  const specialAdmissionRoundMinCom = formList
    ? formList
        .filter(
          (item) =>
            !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(
              item.type
            ) && item.firstRoundMin !== 0
        )
        .map((item) => item.firstRoundMin)
        .reduce((min, value) => Math.min(min, value), Infinity)
        .toFixed(3)
    : '0.000';

  const specialAdmissionRoundMin =
    specialAdmissionRoundMinCom === 'Infinity' ? '0.000' : specialAdmissionRoundMinCom;

  const regularRoundAvg = formList
    ?.filter((item) => ['REGULAR'].includes(item.type))
    .map((item) => item.firstRoundAvg.toFixed(3));

  const SpecialAdmissionData =
    formList
      ?.filter(
        (item) =>
          !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(
            item.type
          )
      )
      .filter((item) => item.firstRoundAvg !== 0) || [];

  const totalRoundAvg = SpecialAdmissionData.reduce(
    (sum, item) => sum + item.firstRoundAvg,
    0
  );

  const SpecialAdmissionRoundAvg =
    totalRoundAvg !== 0
      ? (totalRoundAvg / SpecialAdmissionData.length).toFixed(3)
      : '0.000';

  return {
    regularRoundMax,
    SpecialAdmissionRoundMax,
    regularRoundMin,
    specialAdmissionRoundMin,
    regularRoundAvg,
    SpecialAdmissionRoundAvg,
  };
};

export default useScoreStatus;
