export const ROUTES = {
  MAIN: '/',
  FORM: '/form',
  FORM_MANAGEMENT: '/management',
  NOTICE: '/notice',
  FAQ: '/faq',
  ADMISSION_REGISTRATION: '/enrollment',
  TERMS_OF_SERVICE: '/tos',
  PRIVACY_POLCY: '/privacy',
  PERSONAL_INFO_COLLECTION: '/collection',
  FAIR: '/fair',
  FIRST_RESULT: '/result/first',
  FINAL_RESULT: '/result/final',
  SIMULATION: '/simulation',
  LOGIN: '/login',
  PASSWORD: '/password',
  SIGNUP: '/signup',
  WITHDRAWAL: '/withdrawal',
  INSPECTION: '/inspection',
};

export const AUTH_COOKIES = ['accessToken', 'refreshToken'] as const;

export const FLAG = {
  테스트_진행: process.env.NEXT_PUBLIC_TEST_ENABLED === 'true',
};

export const ADMISSION_PHONE_NUMBERS = (
  process.env.NEXT_PUBLIC_ADMISSION_PHONE_NUMBERS || '051-970-1792'
)
  .split(',')
  .map((phoneNumber) => phoneNumber.trim())
  .filter(Boolean);

export const KEY = {
  NOTICE_LIST: 'useNoticeList',
  NOTICE_DETAIL: 'useNoticeDetail',
  FAQ_LIST: 'useFaqList',
  FAIR_LIST: 'useFairList',
  USER: 'useUser',
  FIRST_RESULT: 'useFirstResult',
  FINAL_RESULT: 'useFinalResult',
  FORM_STATUS: 'useFormStatus',
  SAVE_FORM: 'useSaveForm',
  SCHOOL_LIST: 'useSchoolList',
  SCHEDULE: 'useSchedule',
};

export const USER_SCOPED_KEYS = [
  KEY.USER,
  KEY.FORM_STATUS,
  KEY.SAVE_FORM,
  KEY.FIRST_RESULT,
  KEY.FINAL_RESULT,
];
