import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { auth } from "@/pkg/libraries/better-auth";
import { routing } from "./pkg/libraries/locale";
import {
  getUserRole,
  checkRouteAccess,
  isPublicRoute,
} from "./pkg/libraries/role";
import {
  getLocaleFromRequest,
  buildLoginPath,
  buildRoleHomePath,
  parsePathname,
} from "@/app/shared/utils/path.utils";

const intlMiddleware = createMiddleware(routing);

export const USER_ID_COOKIE = "user-id";

export const proxy = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const pathnameInfo = parsePathname(pathname);
  const pathnameWithoutLocale = pathnameInfo.pathnameWithoutLocale;

  // Check authentication first (even for public routes)
  const headers = new Headers();
  request.headers.forEach((value, key) => headers.set(key, value));
  const session = await auth.api.getSession({ headers });

  // If user is logged in and accessing home pages, redirect to role-specific home
  if (
    session &&
    (pathnameWithoutLocale === "/" || pathnameWithoutLocale === "/tutor")
  ) {
    const role = getUserRole(session);
    const currentLocale = getLocaleFromRequest(request);
    const defaultHomePath = buildRoleHomePath(role, {
      locale: currentLocale,
      defaultLocale: routing.defaultLocale,
    });

    // Only redirect if they're not already on their default home
    if (pathnameWithoutLocale !== (role === "TUTOR" ? "/tutor" : "/")) {
      return NextResponse.redirect(new URL(defaultHomePath, request.url));
    }
  }

  // Public routes don't need authentication
  if (isPublicRoute(pathnameWithoutLocale)) {
    return intlMiddleware(request);
  }

  if (!session) {
    const locale = getLocaleFromRequest(request);
    const loginPath = buildLoginPath({
      locale,
      defaultLocale: routing.defaultLocale,
    });
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // Check role-based access
  const role = getUserRole(session);
  const currentLocale = getLocaleFromRequest(request);
  const accessCheck = checkRouteAccess(
    pathnameWithoutLocale,
    role,
    routing.defaultLocale,
    currentLocale,
  );

  if (accessCheck.shouldRedirect && accessCheck.redirectPath) {
    return NextResponse.redirect(
      new URL(accessCheck.redirectPath, request.url),
    );
  }

  // Handle i18n and set user ID cookie
  const response = intlMiddleware(request);
  const userId = session.user.id;
  const existingUserId = request.cookies.get(USER_ID_COOKIE)?.value;

  if (existingUserId !== userId) {
    response.cookies.set(USER_ID_COOKIE, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;
};

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
