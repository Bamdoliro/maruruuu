import type { ApplicantCountType, FormType } from '@/types/analysis/client';

const useApplicantRatios = (formList: ApplicantCountType[] | undefined) => {
  const getRatioByType = (type: FormType) => {
    const totalCount = formList?.reduce((sum, item) => sum + item.count, 0) || 0;
    if (totalCount === 0) return '0%';

    const entry = formList?.find((item) => item.type === type);
    return entry ? ((entry.count / totalCount) * 100).toFixed(3) + '%' : '0%';
  };

  return {
    regularApplicant: getRatioByType('REGULAR'),
    meisterTalentApplicant: getRatioByType('MEISTER_TALENT'),
    nationalBasicLivingApplicant: getRatioByType('NATIONAL_BASIC_LIVING'),
    nearPovertyApplicant: getRatioByType('NEAR_POVERTY'),
    nationalVeteransApplicant: getRatioByType('NATIONAL_VETERANS'),
    oneParentApplicant: getRatioByType('ONE_PARENT'),
    fromNorthKoreaApplicant: getRatioByType('FROM_NORTH_KOREA'),
    multiculturalApplicant: getRatioByType('MULTICULTURAL'),
    teenHouseholderApplicant: getRatioByType('TEEN_HOUSEHOLDER'),
    multiChildrenApplicant: getRatioByType('MULTI_CHILDREN'),
    farmingAndFishingApplicant: getRatioByType('FARMING_AND_FISHING'),
    specialAdmissionApplicant: getRatioByType('SPECIAL_ADMISSION'),
    nationalVeteransEducationApplicant: getRatioByType('NATIONAL_VETERANS_EDUCATION'),
  };
};

export default useApplicantRatios;
