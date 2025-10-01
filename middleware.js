import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request) {
  const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim());
  const origin = request.headers.get('origin');  // Use 'origin' header for CORS

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Set CORS header for allowed origins
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Vary', 'Origin');
  return response;
}

export const config = {
  matcher: ['/api/:path*']
};