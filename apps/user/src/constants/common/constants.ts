export const ROUTES = {
  MAIN: '/',
  FORM: '/',
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
};

export const TOKEN = {
  ACCESS: 'access-token',
  REFRESH: 'refresh-token',
} as const;

export const KEY = {
  NOTICE_LIST: 'useNoticeList',
  NOTICE_DETAIL: 'useNoticeDetail',
  FAQ_LIST: 'useFaqList',
  FAIR_LIST: 'useFairList',
  USER: 'useUser',
  FIRST_RESULT: 'useFirstResult',
  FINAL_RESULT: 'useFinalResult',
  ADMISSION_TICKET: 'useDownloadAdmissionTicket',
  FORM_STATUS: 'useFormStatus',
  EXPORT_FORM: 'useExportForm',
  EXPORT_RECEIPT: 'useExportReceipt',
  SAVE_FORM: 'useSaveForm',
  SCHOOL_LIST: 'useSchoolList',
};
