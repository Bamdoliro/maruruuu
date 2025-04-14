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
    profileImageUrl: formDetailData.applicant?.identificationPictureUri || '',
    name: formDetailData.applicant?.name || '이름 없음',
    phoneNumber: formatPhoneNumber(
      formDetailData.applicant?.phoneNumber || '전화번호 없음'
    ),
    examinationNumber: formDetailData.examinationNumber || '수험번호 없음',
    type:
      formDetailData.changedToRegular && formDetailData.type === 'REGULAR'
        ? '특별전형 -> 일반전형'
        : FORM_TYPE_CATEGORY[formDetailData.type] || '전형 정보 없음',
    schoolName:
      formDetailData.education?.graduationType !== 'QUALIFICATION_EXAMINATION'
        ? formDetailData.education?.schoolName || '학교 이름 없음'
        : '검정고시',
  };

  const applicantData = formDetailData && {
    name: formDetailData.applicant?.name || '이름 없음',
    birthday: formatDate.toShortDateTime(formDetailData.applicant?.birthday || ''),
    gender: GENDER[formDetailData.applicant?.gender] || '성별 정보 없음',
    phoneNumber: formatPhoneNumber(formDetailData.applicant?.phoneNumber || ''),
    profileImageUrl: formDetailData.applicant?.identificationPictureUri || '',
  };

  const parentData = formDetailData && {
    name: formDetailData.parent?.name || '이름 없음',
    phoneNumber: formatPhoneNumber(formDetailData.parent?.phoneNumber || ''),
    relation: formDetailData.parent?.relation || '관계 정보 없음',
    address: formDetailData.parent?.address || '주소 없음',
    zoneCode: formDetailData.parent?.zoneCode || '지역 코드 없음',
    detailAddress: formDetailData.parent?.detailAddress || '상세 주소 없음',
  };

  const educationData = formDetailData && {
    graduationType:
      GRADUATION_TYPE_VALUE[formDetailData.education?.graduationType] ||
      '졸업 유형 정보 없음',
    schoolName: formDetailData.education?.schoolName || '학교 이름 없음',
    graduationYear: formDetailData.education?.graduationYear || '졸업 연도 없음',
    schoolLocation: formDetailData.education?.schoolLocation || '학교 지역 정보 없음',
    schoolCode: formDetailData.education?.schoolCode || '학교 코드 없음',
    schoolPhoneNumber: formatPhoneNumber(
      formDetailData.education?.schoolPhoneNumber || ''
    ),
    teacherName: formDetailData.education?.teacherName || '교사 이름 없음',
    teacherMobilePhoneNumber: formatPhoneNumber(
      formDetailData.education?.teacherMobilePhoneNumber || ''
    ),
  };

  const typeData =
    formDetailData?.type && FORM_TYPE_CATEGORY[formDetailData.type]
      ? FORM_TYPE_CATEGORY[formDetailData.type]
      : '전형 정보 없음';

  const gradesData = formDetailData && {
    gradeData: formDetailData.grade.subjectList || [],
    attendanceData: [
      formDetailData.grade.attendance1,
      formDetailData.grade.attendance2,
      formDetailData.grade.attendance3,
    ],
  };

  return { profileData, applicantData, parentData, educationData, typeData, gradesData };
};
