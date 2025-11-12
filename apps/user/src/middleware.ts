import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ROUTES, SCHEDULE } from '@/constants/common/constants';

dayjs.extend(isBetween);

export const middleware = (request: NextRequest) => {
  const now = dayjs();

  const inspectionStart = SCHEDULE.점검_시작;
  const inspectionEnd = SCHEDULE.점검_끝;

  const inspectionUrl = new URL(ROUTES.INSPECTION, request.url);

  if (
    now.isBetween(inspectionStart, inspectionEnd) &&
    request.nextUrl.pathname !== ROUTES.INSPECTION
  ) {
    return NextResponse.redirect(inspectionUrl);
  }

  if (
    !now.isBetween(inspectionStart, inspectionEnd) &&
    request.nextUrl.pathname === ROUTES.INSPECTION
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
