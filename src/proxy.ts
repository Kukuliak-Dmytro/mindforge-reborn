import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/pkg/libraries/better-auth";
import createMiddleware from "next-intl/middleware";
import { hasLocale } from "next-intl";
import { routing } from "./pkg/libraries/locale";
import {
  extractPathnameWithoutLocale,
  extractRoleFromSession,
  checkRouteAccess,
} from "./pkg/libraries/role";

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

  // Convert NextRequest headers to Headers object for the auth API
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    headers.set(key, value);
  });

  // Debug: Log cookie header
  // const cookieHeader = headers.get("cookie");
  // if (cookieHeader) {
  //   console.log("Cookies being forwarded:", cookieHeader.substring(0, 100));
  // } else {
  //   console.log("No cookies found in request headers");
  // }

  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    console.log("No session found, redirecting to login");
    // Extract locale and redirect to locale-aware login page
    const locale = getLocaleFromRequest(request);
    const loginPath =
      locale === routing.defaultLocale ? "/login" : `/${locale}/login`;
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // console.log("Session found, user ID:", session.user.id);

  // Extract role from session
  const role = extractRoleFromSession(session);

  // Extract pathname without locale prefix
  const pathnameWithoutLocale = extractPathnameWithoutLocale(
    pathname,
    routing.locales,
  );

  // Check route access based on role
  const currentLocale = getLocaleFromRequest(request);
  const accessCheck = checkRouteAccess(
    pathnameWithoutLocale,
    role,
    routing.defaultLocale,
    currentLocale,
  );

  if (accessCheck.shouldRedirect && accessCheck.redirectPath) {
    console.log(
      `User with role ${role} attempted to access restricted route, redirecting to ${accessCheck.redirectPath}`,
    );
    return NextResponse.redirect(
      new URL(accessCheck.redirectPath, request.url),
    );
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
