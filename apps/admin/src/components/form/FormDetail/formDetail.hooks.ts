import {
  FORM_TYPE_CATEGORY,
  GENDER,
  GRADUATION_TYPE_VALUE,
} from '@/constants/form/constant';
import { useFormDetailQuery } from '@/services/form/queries';
import { formatDate, formatPhoneNumber } from '@/utils';

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

  const applicantData = formDetailData && {
    name: formDetailData.applicant.name,
    birthday: formatDate.toShortDateTime(formDetailData.applicant.birthday),
    gender: GENDER[formDetailData.applicant.gender],
    phoneNumber: formatPhoneNumber(formDetailData.applicant.phoneNumber),
    profileImageUrl: formDetailData.applicant.identificationPictureUri,
  };

  const parentData = formDetailData && {
    name: formDetailData.parent.name,
    phoneNumber: formatPhoneNumber(formDetailData.parent.phoneNumber),
    relation: formDetailData.parent.relation,
    address: formDetailData.parent.address,
    zoneCode: formDetailData.parent.zoneCode,
    detailAddress: formDetailData.parent.detailAddress,
  };

  const educationData = formDetailData && {
    graduationType: GRADUATION_TYPE_VALUE[formDetailData.education.graduationType],
    schoolName: formDetailData.education.schoolName,
    graduationYear: formDetailData.education.graduationYear,
    schoolLocation: formDetailData.education.schoolLocation,
    schoolCode: formDetailData.education.schoolCode,
    teacherPhoneNumber: formatPhoneNumber(formDetailData.education.teacherPhoneNumber),
    teacherName: formDetailData.education.teacherName,
    teacherMobilePhoneNumber: formatPhoneNumber(
      formDetailData.education.teacherMobilePhoneNumber
    ),
  };

  return { profileData, applicantData, parentData, educationData };
};
