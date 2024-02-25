import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes:['/login', '/register'],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    const pathname = new URL(req.url).pathname;
    const isApiRoute = pathname.startsWith('/api');
    const isHomeRoute = pathname === '/';
    const isUploadThingRoute = pathname.startsWith('/api/uploadthing');
    const isAdminRoute = pathname.endsWith('/admin');

    if(isUploadThingRoute) {
      return NextResponse.next();
    }
    // If the user is not logged in and trying to access an API route, return 401
    if(!auth.userId && isApiRoute) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && (isHomeRoute || auth.isPublicRoute)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

