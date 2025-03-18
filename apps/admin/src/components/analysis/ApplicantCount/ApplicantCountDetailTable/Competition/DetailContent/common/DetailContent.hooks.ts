import { ApplicantCountType, FormType } from '@/types/analysis/client';

const useApplicantCounts = (formList: ApplicantCountType[] | undefined) => {
  const getCountByType = (type: FormType) => {
    return formList?.find((item) => item.type === type)?.count ?? 0;
  };

  return {
    regularApplicant: getCountByType('REGULAR'),
    meisterTalentApplicant: getCountByType('MEISTER_TALENT'),
    nationalBasicLivingApplicant: getCountByType('NATIONAL_BASIC_LIVING'),
    nearPovertyApplicant: getCountByType('NEAR_POVERTY'),
    nationalVeteransApplicant: getCountByType('NATIONAL_VETERANS'),
    oneParentApplicant: getCountByType('ONE_PARENT'),
    fromNorthKoreaApplicant: getCountByType('FROM_NORTH_KOREA'),
    multiculturalApplicant: getCountByType('MULTICULTURAL'),
    teenHouseholderApplicant: getCountByType('TEEN_HOUSEHOLDER'),
    multiChildrenApplicant: getCountByType('MULTI_CHILDREN'),
    farmingAndFishingApplicant: getCountByType('FARMING_AND_FISHING'),
    specialAdmissionApplicant: getCountByType('SPECIAL_ADMISSION'),
    nationalVeteransEducationApplicant: getCountByType('NATIONAL_VETERANS_EDUCATION'),
  };
};

export default useApplicantCounts;
