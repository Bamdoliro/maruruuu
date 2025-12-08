import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const refreshToken = request.cookies.get('refresh-token');
  if (!refreshToken || !refreshToken.value) {
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    '/form/:path*',
    '/notice/:path*',
    '/faq/:path*',
    '/message/:path*',
    '/fair/:path*',
    '/registration/:path*',
    '/analysis/:path*',
  ],
};
