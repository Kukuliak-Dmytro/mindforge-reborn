import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/pkg/libraries/better-auth";
import createMiddleware from "next-intl/middleware";
import { hasLocale } from "next-intl";
import { routing } from "./pkg/libraries/locale";

//constant
/**
 * Internationalization middleware.
 */
export const intlMiddleware = createMiddleware(routing);

//constant
/**
 * User ID cookie name.
 */
export const USER_ID_COOKIE = "user-id";
const NEXT_LOCALE_COOKIE = "NEXT_LOCALE";

//function
/**
 * Extracts the locale from the NEXT_LOCALE cookie, or falls back to default locale.
 */
const getLocaleFromRequest = (request: NextRequest): string => {
  const cookieLocale = request.cookies.get(NEXT_LOCALE_COOKIE)?.value;
  if (cookieLocale && hasLocale(routing.locales, cookieLocale)) {
    return cookieLocale;
  }
  return routing.defaultLocale;
};

//function
/**
 * Checks if the pathname is an auth route (login or register).
 */
const isAuthRoute = (pathname: string): boolean => {
  // Check for exact matches or paths ending with /login or /register
  return (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.endsWith("/login") ||
    pathname.endsWith("/register")
  );
};

//function
/**
 * Proxy middleware for authentication and internationalization.
 */
export const proxy = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  // Skip authentication check for auth routes
  if (isAuthRoute(pathname)) {
    // Just handle internationalization routing for auth routes
    return intlMiddleware(request);
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    // Extract locale and redirect to locale-aware login page
    const locale = getLocaleFromRequest(request);
    const loginPath =
      locale === routing.defaultLocale ? "/login" : `/${locale}/login`;
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // Handle internationalization routing
  const response = intlMiddleware(request);

  // Set user ID from better-auth session (for GrowthBook experiment hashing)
  const userId = session.user.id;
  const existingUserId = request.cookies.get(USER_ID_COOKIE)?.value;

  if (existingUserId !== userId) {
    // Update cookie with current user ID
    response.cookies.set(USER_ID_COOKIE, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  //return
  return response;
};

//constant
/**
 * Middleware configuration.
 * Excludes:
 * - API routes, Next.js internals, Vercel routes
 * - Static files (anything with a dot)
 */
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
