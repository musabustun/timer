import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check for admin routes
    if (request.nextUrl.pathname.startsWith('/yonet')) {
        // Skip login page
        if (request.nextUrl.pathname === '/yonet/login') {
            return NextResponse.next()
        }

        // Check auth cookie
        const hasAuth = request.cookies.has('admin_auth')
        if (!hasAuth) {
            return NextResponse.redirect(new URL('/yonet/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/yonet/:path*'],
}
