import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export const middleware = (request: NextRequest) => {
  const refreshToken = request.cookies.get('refreshToken');
  if (!refreshToken?.value) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const decoded = jwtDecode<{ exp: number }>(refreshToken.value);
    if (decoded.exp * 1000 < Date.now()) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('refreshToken');
      return response;
    }
  } catch {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('refreshToken');
    return response;
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
