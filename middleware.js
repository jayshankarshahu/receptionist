import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request) {

  const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim());
  const origin = request.headers.get('host');  

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
};