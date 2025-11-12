import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { SCHEDULE } from '@/constants/form/constants';
import { ROUTES } from '@/constants/common/constants';

dayjs.extend(isBetween);

export const middleware = (request: NextRequest) => {
  const now = dayjs();

  if (
    now.isBetween(SCHEDULE.점검_시작, SCHEDULE.점검_끝) &&
    request.nextUrl.pathname !== ROUTES.INSPECTION
  ) {
    return NextResponse.redirect(new URL(ROUTES.INSPECTION, request.url));
  }

  if (
    !now.isBetween(SCHEDULE.점검_시작, SCHEDULE.점검_끝) &&
    request.nextUrl.pathname === ROUTES.INSPECTION
  ) {
    return NextResponse.redirect(new URL(ROUTES.MAIN, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
