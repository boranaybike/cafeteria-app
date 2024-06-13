import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

async function verifyJWT(token:any) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request:any) {
  const token = request.cookies.get('token')?.value;

  const payload = token ? await verifyJWT(token) : null;

   if (!payload) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  request.user = {
      id: payload.user_id,
      role: payload.role 
    };
  
  const pathname= request.nextUrl.pathname
  if (pathname === '/menu/new' && payload.role === 'employee') {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  if ( pathname === '/movements' && pathname === '/booking' && pathname === '/movements' && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/403', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/menu', '/', '/booking', '/movements','/menu/new']
}

