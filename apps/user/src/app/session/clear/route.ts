import { AUTH_COOKIES } from '@/constants/common/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = () => {
  const cookieStore = cookies();

  AUTH_COOKIES.forEach((name) => {
    cookieStore.delete(name);
  });

  return NextResponse.json({ ok: true });
};
