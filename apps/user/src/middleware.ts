import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { NextResponse, type NextRequest } from 'next/server';

dayjs.extend(isBetween);

const SCHEDULE = {
  원서_접수: dayjs(process.env.NEXT_PUBLIC_FORM_START),
  원서_접수_마감: dayjs(process.env.NEXT_PUBLIC_FORM_END),
  일차_합격_발표: dayjs(process.env.NEXT_PUBLIC_FIRST_RESULT),
  이차_면접: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_START),
  이차_면접_종료: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_END),
  최종_합격_발표: dayjs(process.env.NEXT_PUBLIC_FINAL_RESULT),
  입학_등록: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_START),
  입학_등록_마감: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_END),
};

const ROUTE_RULES = [
  {
    path: '/form',
    start: SCHEDULE.원서_접수,
    end: SCHEDULE.원서_접수_마감,
    message: '정상적인 경로를 통해 원서를 작성해주세요.',
  },
  {
    path: '/form-management',
    start: SCHEDULE.원서_접수,
    end: SCHEDULE.입학_등록_마감,
    message: '입학전형 기간이 아닙니다.',
  },
  {
    path: '/result/first',
    start: SCHEDULE.일차_합격_발표,
    end: SCHEDULE.이차_면접,
    message: '정상적인 경로를 통해 1차 결과를 확인해주세요.',
  },
  {
    path: '/result/final',
    start: SCHEDULE.최종_합격_발표,
    end: SCHEDULE.입학_등록,
    message: '정상적인 경로를 통해 최종 결과를 확인해주세요.',
  },
  {
    path: '/regist',
    start: SCHEDULE.입학_등록,
    end: SCHEDULE.입학_등록_마감,
    message: '정상적인 경로를 통해 입학 등록 해주세요.',
  },
];

export const middleware = async (req: NextRequest) => {
  const url = req.nextUrl.pathname;
  const now = dayjs();

  const cookies = req.headers.get('cookie');
  const accessToken = cookies
    ?.split('; ')
    .find((row) => row.startsWith('access-token='))
    ?.split('=')[1];

  for (const rule of ROUTE_RULES) {
    if (url === rule.path) {
      if (!accessToken) {
        const redirectUrl = new URL('/', req.url);
        redirectUrl.searchParams.set('warning', '로그인이 필요합니다.');
        return NextResponse.redirect(redirectUrl);
      }

      if (!now.isBetween(rule.start, rule.end)) {
        const redirectUrl = new URL('/', req.url);
        redirectUrl.searchParams.set('message', rule.message);
        return NextResponse.redirect(redirectUrl);
      }

      return NextResponse.rewrite(new URL(rule.path, req.nextUrl.origin));
    }
  }
};

export const config = {
  matcher: [
    '/form',
    '/form-management',
    '/result/first',
    '/result/final',
    '/regist',
    '/((?!api|_next/static|_next/image|favicon.ico|svg).*)',
  ],
};
