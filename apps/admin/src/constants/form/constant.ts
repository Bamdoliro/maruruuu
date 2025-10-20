import type {
  ExportExcelType,
  FormSort,
  FormStatus,
  FormType,
  Gender,
  GraduationType,
  ReceiveStatusValue,
} from '@/types/form/client';
import { color } from '@maru/design-system';

export const FORM_STATUS_CATEGORY: Record<FormStatus, string> = {
  RECEIVED: '접수',
  FIRST_FAILED: '1차 불합격',
  FAILED: '불합격',
  FINAL_SUBMITTED: '최종 제출',
  SUBMITTED: '초안 제출',
  APPROVED: '승인',
  NO_SHOW: '불참',
  FIRST_PASSED: '1차 합격',
  PASSED: '최종 합격',
  REJECTED: '반려',
  ENTERED: '입학',
} as const;

export const FORM_TYPE_CATEGORY: Record<FormType, string> = {
  REGULAR: '일반전형',
  MEISTER_TALENT: '마이스터인재전형',
  NATIONAL_BASIC_LIVING: '국가기초생활수급권자',
  NATIONAL_VETERANS_EDUCATION: '국가보훈대상자 중 교육지원대상자녀',
  NEAR_POVERTY: '차상위계층',
  NATIONAL_VETERANS: '국가보훈자녀',
  ONE_PARENT: '한부모가정',
  FROM_NORTH_KOREA: '북한이탈주민',
  MULTICULTURAL: '다문화가정',
  TEEN_HOUSEHOLDER: '소년소녀가장',
  MULTI_CHILDREN: '다자녀가정자녀',
  FARMING_AND_FISHING: '농어촌지역출신자',
  SPECIAL_ADMISSION: '특례입학대상자',
} as const;

export const FORM_SORTING_CATEGORY: Record<FormSort, string> = {
  'total-score-desc': '최종 점수 높은 순',
  'total-score-asc': '최종 점수 낮은 순',
  'form-id': '접수순',
} as const;

export const EXPORT_EXCEL_TYPE_VALUE: Record<ExportExcelType, string> = {
  '전체 내보내기': 'result',
  '1차 전형 결과': 'first-round',
  '2차 전형 결과': 'second-round',
  '최종 합격자': 'final-passed',
} as const;

export const EXPORT_EXCEL_TYPE = [
  '전체 내보내기',
  '1차 전형 결과',
  '2차 전형 결과',
  '최종 합격자',
] as const;

export const FORM_DETAIL_FIELDS = [
  '지원자 정보',
  '보호자 정보',
  '출신학교 및 학력',
  '전형',
  '성적',
  '자기소개서',
] as const;

export const GENDER: Record<Gender, string> = {
  MALE: '남자',
  FEMALE: '여자',
} as const;

export const GRADUATION_TYPE_VALUE: Record<GraduationType, string> = {
  QUALIFICATION_EXAMINATION: '검정고시',
  EXPECTED: '졸업 예정',
  GRADUATED: '졸업',
} as const;

export const GRADES_FIELDS = ['교과 성적', '출결 상황', '봉사 시간', '자격증'] as const;

export const GRADES_QUALIFICATION_EXAMINATION_FIELDS = [
  '교과 성적',
  '자격증',
] as const;

export const RECEIVED_STATUS_LIST: {
  name: string;
  value: ReceiveStatusValue;
  color: string;
  backgroundColor: string;
}[] = [
  {
    name: '승인',
    value: 'approve',
    color: color.maruDefault,
    backgroundColor: color.maruLightBlue,
  },
  { name: '반려', value: 'reject', color: color.red, backgroundColor: color.lightRed },
  {
    name: '확인 중',
    value: 'receive',
    color: color.green,
    backgroundColor: color.lightGreen,
  },
];
