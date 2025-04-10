import { FORM_TYPE_CATEGORY } from '@/constants/form/constant';
import { useFormDetailQuery } from '@/services/form/queries';

export const useFormDetailDataDecomposition = (id: number) => {
  const { data: formDetailData } = useFormDetailQuery(id);

  const profileData = formDetailData && {
    profileImageUrl: formDetailData.applicant.identificationPictureUri,
    name: formDetailData.applicant.name,
    phoneNumber: formDetailData.applicant.phoneNumber,
    examinationNumber: formDetailData.examinationNumber,
    type:
      formDetailData.changedToRegular && formDetailData.type === 'REGULAR'
        ? '특별전형 -> 일반전형'
        : FORM_TYPE_CATEGORY[formDetailData.type],
    schoolName:
      formDetailData.education.graduationType !== 'QUALIFICATION_EXAMINATION'
        ? formDetailData.education.schoolName
        : '검정고시',
  };

  return { profileData };
};
