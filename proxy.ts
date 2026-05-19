import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// While the site is under construction, every public URL collapses to `/`.
// The Sanity Studio and API routes are excluded so admin work still flows.
export function proxy(request: NextRequest) {
	if (request.nextUrl.pathname === '/') return NextResponse.next();
	const url = request.nextUrl.clone();
	url.pathname = '/';
	url.search = '';
	return NextResponse.redirect(url, 307);
}

export const config = {
	// Skip Next internals, API routes, Sanity Studio, and anything with a
	// file extension (favicon, images, manifest, etc.).
	matcher: ['/((?!api/|_next/|studio(?:$|/)|.*\\..*).*)'],
};
