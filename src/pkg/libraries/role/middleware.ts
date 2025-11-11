import type { Locale } from "next-intl";
import type { UserRole } from "./types";
import { isStudentOnlyRoute } from "./types";

//interface
/**
 * Result of route access check.
 */
export interface RouteAccessResult {
  shouldRedirect: boolean;
  redirectPath: string | null;
}

//function
/**
 * Extracts the pathname without locale prefix.
 */
export const extractPathnameWithoutLocale = (
  pathname: string,
  locales: readonly Locale[],
): string => {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length);
    } else if (pathname === `/${locale}`) {
      return "/";
    }
  }
  return pathname;
};

//function
/**
 * Extracts role from session with default fallback.
 */
export const extractRoleFromSession = (session: {
  user: { role?: UserRole };
}): UserRole => {
  return (session.user as { role?: UserRole }).role || "STUDENT";
};

//function
/**
 * Checks if user can access a route based on their role.
 * Returns redirect information if access should be denied.
 */
export const checkRouteAccess = (
  pathnameWithoutLocale: string,
  role: UserRole,
  defaultLocale: Locale,
  currentLocale: Locale,
): RouteAccessResult => {
  // Tutor-only routes
  if (pathnameWithoutLocale.startsWith("/tutor")) {
    if (role !== "TUTOR") {
      const homePath =
        currentLocale === defaultLocale ? "/" : `/${currentLocale}`;
      return {
        shouldRedirect: true,
        redirectPath: homePath,
      };
    }
  }

  // Student-only routes (when not under /tutor)
  // Check if tutor is trying to access student routes (including root "/")
  if (role === "TUTOR") {
    // Root "/" is student home - redirect tutors to tutor home
    if (pathnameWithoutLocale === "/") {
      const tutorPath =
        currentLocale === defaultLocale ? "/tutor" : `/${currentLocale}/tutor`;
      return {
        shouldRedirect: true,
        redirectPath: tutorPath,
      };
    }
    // Other student-only routes
    if (isStudentOnlyRoute(pathnameWithoutLocale)) {
      const tutorPath =
        currentLocale === defaultLocale ? "/tutor" : `/${currentLocale}/tutor`;
      return {
        shouldRedirect: true,
        redirectPath: tutorPath,
      };
    }
  }

  // Access granted
  return {
    shouldRedirect: false,
    redirectPath: null,
  };
};
