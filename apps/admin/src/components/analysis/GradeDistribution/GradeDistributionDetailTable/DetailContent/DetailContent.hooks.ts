import type { FormType, GradeDistributionType } from '@/types/analysis/client';
import { getMaxMinScore } from '../GradeDistributionDetailTable.utils';

const useMaxMinByType = (
  formList: GradeDistributionType[] | undefined,
  selectedRound: string,
) => {
  const getMaxMinByType = (type: FormType) =>
    getMaxMinScore(
      formList?.filter((item) => item.type === type),
      selectedRound,
    );

  return {
    regularApplicant: getMaxMinByType('REGULAR'),
    meisterTalentApplicant: getMaxMinByType('MEISTER_TALENT'),
    nationalBasicLivingApplicant: getMaxMinByType('NATIONAL_BASIC_LIVING'),
    nearPovertyApplicant: getMaxMinByType('NEAR_POVERTY'),
    nationalVeteransApplicant: getMaxMinByType('NATIONAL_VETERANS'),
    oneParentApplicant: getMaxMinByType('ONE_PARENT'),
    fromNorthKoreaApplicant: getMaxMinByType('FROM_NORTH_KOREA'),
    multiculturalApplicant: getMaxMinByType('MULTICULTURAL'),
    teenHouseholderApplicant: getMaxMinByType('TEEN_HOUSEHOLDER'),
    multiChildrenApplicant: getMaxMinByType('MULTI_CHILDREN'),
    farmingAndFishingApplicant: getMaxMinByType('FARMING_AND_FISHING'),
    specialAdmissionApplicant: getMaxMinByType('SPECIAL_ADMISSION'),
    nationalVeteransEducationApplicant: getMaxMinByType('NATIONAL_VETERANS_EDUCATION'),
  };
};

export default useMaxMinByType;
