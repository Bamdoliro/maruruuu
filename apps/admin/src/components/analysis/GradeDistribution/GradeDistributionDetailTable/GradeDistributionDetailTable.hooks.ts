import type { GradeDistributionType } from '@/types/analysis/client';
import { getMaxMinScore } from './GradeDistributionDetailTable.utils';

const useMaxMin = (
  formList: GradeDistributionType[] | undefined,
  selectedRound: string,
) => getMaxMinScore(formList, selectedRound);

export default useMaxMin;
