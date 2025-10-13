export const KEY = {
  ADMIN: 'useAdmin',
  APPLICANT_COUNT: 'useApplicantCount',
  APPLICANT_GRADE_DISTRIBUTION: 'useApplicantGradeDistribution',
  APPLICANT_GENDER_RATIO: 'useGenderRatio',
  APPLICANT_GRADUATED_SCHOOL: 'useGraduatedSchool',
  FORM_LIST: 'useFormList',
  FORM_DETAIL: 'useFormDetail',
  SECOND_SCORE_FORMAT: 'useSecondScoreFormat',
  FORM_EXPORT_EXCEL: 'useFormExportExcel',
  FORM_EXPORT_FIRST_SCORE_EXCEL: 'useFormExportFirstScoreExcel',
  FORM_EXPORT_ALL_ADMISSION_TICKET: 'useFormExportAllAdmissionTicket',
  FAIR_LIST: 'useFairList',
  FAIR_DETAIL: 'useFairDetail',
  FAIR_EXPORT_EXCEL: 'useFairExportExcel',
  NOTICE_LIST: 'useNoticeList',
  NOTICE_DETAIL: 'useNoticeDetail',
  FAQ_LIST: 'useFaqList',
  FAQ_DETAIL: 'useFaqDetail',
  REGISTRATION_LIST: 'useRegistrationList',
};

export const ROUTES = {
  MAIN: '/',
  FORM: '/form',
  NOTICE: '/notice',
  NOTICE_CREATE: '/notice/create',
  NOTICE_EDIT: '/notice/edit',
  FAQ: '/faq',
  FAQ_CREATE: '/faq/create',
  FAQ_EDIT: '/faq/edit',
  MESSAGE: '/message',
  ANALYSIS: '/analysis',
  FAIR: '/fair',
  FAIR_CREATE: '/fair/create',
  REGISTRATION: '/registration',
} as const;

export const TOKEN = {
  ACCESS: 'access-token',
  REFRESH: 'refresh-token',
} as const;

export const EMPTY_VALUE = '';
