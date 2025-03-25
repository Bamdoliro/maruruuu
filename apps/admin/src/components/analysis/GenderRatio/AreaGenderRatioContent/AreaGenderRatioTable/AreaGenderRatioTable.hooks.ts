import { GenderRatioType } from '@/types/analysis/client';

const useCalculateGenderRatio = (formList: GenderRatioType[] = []) => {
  const calculateTotals = (data: GenderRatioType[]) => {
    return data.reduce(
      (acc, item) => {
        acc.busanMaleTotal += item.busanMale || 0;
        acc.busanFemaleTotal += item.busanFemale || 0;
        acc.otherLocationMaleTotal += item.otherLocationMale || 0;
        acc.otherLocationFemaleTotal += item.otherLocationFemale || 0;
        return acc;
      },
      {
        busanMaleTotal: 0,
        busanFemaleTotal: 0,
        otherLocationMaleTotal: 0,
        otherLocationFemaleTotal: 0,
      }
    );
  };

  const totals = calculateTotals(formList);
  const totalMale = totals.busanMaleTotal + totals.otherLocationMaleTotal;
  const totalFemale = totals.busanFemaleTotal + totals.otherLocationFemaleTotal;
  const total = totalMale + totalFemale;

  return {
    ...totals,
    totalMale,
    totalFemale,
    total,
  };
};

export default useCalculateGenderRatio;
