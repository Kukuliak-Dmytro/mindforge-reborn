import type { Locale } from "next-intl";
import type { UserRole } from "./types";
import { isStudentOnlyRoute } from "./types";

export interface IRouteAccessResult {
  shouldRedirect: boolean;
  redirectPath: string | null;
}

const PUBLIC_ROUTES = ["/", "/tutor", "/login", "/register"] as const;

export const isPublicRoute = (path: string): boolean => {
  return (
    PUBLIC_ROUTES.some((route) => path === route) ||
    path.endsWith("/login") ||
    path.endsWith("/register")
  );
};

export const extractPathnameWithoutLocale = (
  pathname: string,
  locales: readonly Locale[],
): string => {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length);
    }
    if (pathname === `/${locale}`) return "/";
  }
  return pathname;
};

export const getUserRole = (session: {
  user: { role?: UserRole };
}): UserRole => {
  return session.user.role ?? "STUDENT";
};

const buildLocalePath = (
  path: string,
  locale: Locale,
  defaultLocale: Locale,
): string => {
  return locale === defaultLocale ? path : `/${locale}${path}`;
};

export const checkRouteAccess = (
  path: string,
  role: UserRole,
  defaultLocale: Locale,
  currentLocale: Locale,
): IRouteAccessResult => {
  // Non-tutors cannot access tutor routes
  if (path.startsWith("/tutor") && role !== "TUTOR") {
    return {
      shouldRedirect: true,
      redirectPath: buildLocalePath("/", currentLocale, defaultLocale),
    };
  }

  // Tutors cannot access student routes
  if (role === "TUTOR" && (path === "/" || isStudentOnlyRoute(path))) {
    return {
      shouldRedirect: true,
      redirectPath: buildLocalePath("/tutor", currentLocale, defaultLocale),
    };
  }

  return { shouldRedirect: false, redirectPath: null };
};
