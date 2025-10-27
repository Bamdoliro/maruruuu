import type { FormType, GradeDistributionType } from '@/types/analysis/client';

const useMaxMinByType = (formList: GradeDistributionType[] | undefined) => {
  const getMaxMinByType = (type: FormType) => {
    const filtered = formList?.filter((item) => item.type === type);
    if (!filtered?.length) return { max: '0', min: '0' };

    const isValid = (v: number | null | undefined): v is number =>
      typeof v === 'number' && !Number.isNaN(v);

    const maxValues = filtered
      .flatMap((item) => [item.totalMax, item.firstRoundMax])
      .filter(isValid);

    const minValues = filtered
      .flatMap((item) => [item.totalMin, item.firstRoundMin])
      .filter(isValid);

    if (!maxValues.length || !minValues.length) return { max: '0', min: '0' };

    return {
      max: Math.max(...maxValues).toFixed(3),
      min: Math.min(...minValues).toFixed(3),
    };
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