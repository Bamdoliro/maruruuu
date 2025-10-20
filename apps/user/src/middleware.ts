import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const middleware = (request: NextRequest) => {
  const now = dayjs();

  const 점검_시작 = dayjs(process.env.NEXT_PUBLIC_INSPECTION_START_DAY);
  const 점검_끝 = dayjs(process.env.NEXT_PUBLIC_INSPECTION_END_DAY);

  const inspectionUrl = new URL('/inspection', request.url);

  if (now.isBetween(점검_시작, 점검_끝) && request.nextUrl.pathname !== '/inspection') {
    return NextResponse.redirect(inspectionUrl);
  }

  if (!now.isBetween(점검_시작, 점검_끝) && request.nextUrl.pathname === '/inspection') {
    return NextResponse.redirect(new URL('/', request.url));
  }
};
