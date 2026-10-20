import type { GradeDistributionType } from '@/types/analysis/client';

const TOTAL_SCORE_ROUNDS = ['2차 전형자', '최종 합격자'];

const isValidScore = (value: number | null | undefined): value is number =>
  typeof value === 'number' && !Number.isNaN(value) && value !== 0;

const getRoundScore = (item: GradeDistributionType, selectedRound: string) => {
  if (TOTAL_SCORE_ROUNDS.includes(selectedRound) && isValidScore(item.totalMax)) {
    return { max: item.totalMax, min: item.totalMin };
  }
  return { max: item.firstRoundMax, min: item.firstRoundMin };
};

export const getMaxMinScore = (
  formList: GradeDistributionType[] | undefined,
  selectedRound: string,
) => {
  const scoreList = (formList ?? []).map((item) => getRoundScore(item, selectedRound));
  const maxList = scoreList.map(({ max }) => max).filter(isValidScore);
  const minList = scoreList.map(({ min }) => min).filter(isValidScore);

  return {
    max: maxList.length > 0 ? Math.max(...maxList).toFixed(3) : '0.000',
    min: minList.length > 0 ? Math.min(...minList).toFixed(3) : '0.000',
  };
};
