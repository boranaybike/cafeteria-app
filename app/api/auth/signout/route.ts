import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    const response = NextResponse.json({ success: true, message: 'Logout successful' }, { status: 200 });
    response.cookies.set('token', '', { httpOnly: true, secure: true, path: '/', expires: new Date(0) });
    return response;
  } catch (error:any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
