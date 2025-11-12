import dayjs from 'dayjs';

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

export const SCHEDULE = {
  원서_접수: dayjs(process.env.NEXT_PUBLIC_FORM_START),
  원서_접수_마감: dayjs(process.env.NEXT_PUBLIC_FORM_END),
  일차_합격_발표: dayjs(process.env.NEXT_PUBLIC_FIRST_RESULT),
  이차_면접: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_START),
  이차_면접_종료: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_END),
  최종_합격_발표: dayjs(process.env.NEXT_PUBLIC_FINAL_RESULT),
  입학_등록: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_START),
  입학_등록_마감: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_END),
  점검_시작: dayjs(process.env.NEXT_PUBLIC_INSPECTION_START_DAY),
  점검_끝: dayjs(process.env.NEXT_PUBLIC_INSPECTION_END_DAY),
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
