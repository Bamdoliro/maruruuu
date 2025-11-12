import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { SCHEDULE } from '@/constants/form/constants';

dayjs.extend(isBetween);

export const middleware = (request: NextRequest) => {
  const now = dayjs();

  const inspectionStart = SCHEDULE.점검_시작;
  const inspectionEnd = SCHEDULE.점검_끝;

  const inspectionUrl = new URL('/inspection', request.url);

  if (
    now.isBetween(inspectionStart, inspectionEnd) &&
    request.nextUrl.pathname !== '/inspection'
  ) {
    return NextResponse.redirect(inspectionUrl);
  }

  if (
    !now.isBetween(inspectionStart, inspectionEnd) &&
    request.nextUrl.pathname === '/inspection'
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
};
