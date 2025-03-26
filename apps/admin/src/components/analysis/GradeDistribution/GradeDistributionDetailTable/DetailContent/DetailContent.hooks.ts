import { FormType, GradeDistributionType } from '@/types/analysis/client';

const useMaxMinByType = (formList: GradeDistributionType[] | undefined) => {
  const getMaxMinByType = (type: FormType) => {
    const entries = formList?.filter((item) => item.type === type);
    if (!entries || entries.length === 0) {
      return { max: 0, min: 0 };
    }
    const max = Math.max(...entries.map((item) => item.totalMax)).toFixed(3);
    const min = Math.min(...entries.map((item) => item.totalMin)).toFixed(3);

    return { max, min };
  };

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
