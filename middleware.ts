import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = [
	'/',
	'/login',
	'/register',
	'/verify-otp',
	'/forgot-password',
	'/reset-password',
	'/verify-email',
	'/verify-otp-password',
];

export function middleware(request: NextRequest) {
	const token = request.cookies.get('h5x_token');
	const { pathname } = request.nextUrl;

	const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

	if (!token && !isPublicRoute) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (token && isPublicRoute) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
