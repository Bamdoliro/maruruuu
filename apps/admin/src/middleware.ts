import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const cookies = request.headers.get('cookie');
  const accessToken = cookies
    ?.split('; ')
    .find((row) => row.startsWith('refresh-token='))
    ?.split('=')[1];

  if (!accessToken) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('message', '로그인 후 시도해주세요');
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
