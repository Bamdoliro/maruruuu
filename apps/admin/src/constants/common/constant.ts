export const KEY = {
  ADMIN: 'useAdmin',

  NOTICE_LIST: 'useNoticeList',
  NOTICE_DETAIL: 'useNoticeDetail',
};

export const ROUTES = {
  MAIN: '/',
  FORM: '/form',
  NOTICE: '/notice',
  NOTICE_POST: '/notice/post',
  NOTICE_EDIT: '/notice/edit',
  FAQ: '/faq',
  MESSAGE: '/message',
  ANALYSIS: '/analysis',
  FAIR: '/fair',
  REGISTRATION: '/registration',
} as const;

export const TOKEN = {
  ACCESS: 'access-token',
  REFRESH: 'refresh-token',
} as const;
