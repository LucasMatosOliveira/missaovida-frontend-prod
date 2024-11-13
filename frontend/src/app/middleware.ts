// src/app/middleware.ts

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
