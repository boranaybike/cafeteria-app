import { NextResponse } from 'next/server'
import { verifyJwtToken } from './utils/auth';

export async function middleware(request: any) {
  const token = request.cookies.get('token')?.value;

  const payload = token ? await verifyJwtToken(token) : null;

   if (!payload) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
  
  const pathname= request.nextUrl.pathname
  if ((pathname === '/menu/new' ||  pathname === '/bookings' || pathname === '/personnel' || pathname === 'personnel/new') && payload.role === 'employee') {
    return NextResponse.redirect(new URL('/403', request.url));
  }
  if ((pathname === '/movements' || pathname === '/booking') && payload.role === 'admin') {
    return NextResponse.redirect(new URL('/403', request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/booking', '/movements', '/bookings', '/menu/new', '/personnel', '/personnel/new']
}