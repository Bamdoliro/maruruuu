export const KEY = {
  ADMIN: 'useAdmin',
  APPLICANT_COUNT : 'useApplicantCount'
};

export const ROUTES = {
  MAIN: '/',
  FORM: '/form',
  NOTICE: '/notice',
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
