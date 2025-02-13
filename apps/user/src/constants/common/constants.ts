export const ROUTES = {
  MAIN: '/',
  FORM: '/form',
  FORM_MANAGEMENT: '/management',
  NOTICE: '/notice',
  FAQ: '/faq',
  ADMISSION_REGISTRATION: '/enroll',
  TERMS_OF_SERVICE: '/tos',
  PRIVACY_POLCY: '/privacy',
  PERSONAL_INFO_COLLECTION: '/collection',
  FAIR: '/fair',
  FIRST_RESULT: '/result/first',
  FINAL_RESULT: '/result/final',
  SIMULATOR: '/simulator',
  LOGIN: '/login',
};

export const TOKEN = {
  ACCESS: 'access-token',
  REFRESH: 'refresh-token',
} as const;

export const KEY = {
  NOTICE_LIST: 'useNoticeList',
  NOTICE_DETAIL: 'useNoticeDetail',
  FAQ_LIST: 'useFaqList',
};
