import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/pkg/libraries/better-auth";
import createMiddleware from "next-intl/middleware";
import { hasLocale } from "next-intl";
import { routing } from "./pkg/libraries/locale";
import { isStudentOnlyRoute, type UserRole } from "./pkg/libraries/role";

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
  const cookieHeader = headers.get("cookie");
  if (cookieHeader) {
    console.log("Cookies being forwarded:", cookieHeader.substring(0, 100));
  } else {
    console.log("No cookies found in request headers");
  }

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

  console.log("Session found, user ID:", session.user.id);

  // Get user role from session
  const userRole = (session.user as { role?: UserRole }).role;
  const role = userRole || "STUDENT"; // Default to STUDENT if role not present

  // Role-based route protection
  // Extract pathname without locale prefix
  let pathnameWithoutLocale = pathname;
  for (const locale of routing.locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      pathnameWithoutLocale = pathname.slice(`/${locale}`.length);
      break;
    } else if (pathname === `/${locale}`) {
      pathnameWithoutLocale = "/";
      break;
    }
  }

  // Tutor-only routes
  if (pathnameWithoutLocale.startsWith("/tutor")) {
    if (role !== "TUTOR") {
      console.log(
        `User with role ${role} attempted to access tutor route, redirecting to home`,
      );
      const locale = getLocaleFromRequest(request);
      const homePath = locale === routing.defaultLocale ? "/" : `/${locale}`;
      return NextResponse.redirect(new URL(homePath, request.url));
    }
  }

  // Student-only routes (when not under /tutor)
  // Check if tutor is trying to access student routes (including root "/")
  if (role === "TUTOR") {
    // Root "/" is student home - redirect tutors to tutor home
    if (pathnameWithoutLocale === "/") {
      console.log(
        `Tutor attempted to access student home, redirecting to tutor home`,
      );
      const locale = getLocaleFromRequest(request);
      const tutorPath =
        locale === routing.defaultLocale ? "/tutor" : `/${locale}/tutor`;
      return NextResponse.redirect(new URL(tutorPath, request.url));
    }
    // Other student-only routes
    if (isStudentOnlyRoute(pathnameWithoutLocale)) {
      console.log(
        `Tutor attempted to access student route, redirecting to tutor home`,
      );
      const locale = getLocaleFromRequest(request);
      const tutorPath =
        locale === routing.defaultLocale ? "/tutor" : `/${locale}/tutor`;
      return NextResponse.redirect(new URL(tutorPath, request.url));
    }
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
