import type { Locale } from "next-intl";
import type { UserRole } from "./types";
import { isStudentOnlyRoute } from "./types";
import {
  buildRoleHomePath,
  extractPathnameWithoutLocale as extractPathnameWithoutLocaleUtil,
} from "@/app/shared/utils/path.utils";

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

// Re-export for backward compatibility - wraps utility with routing.locales
export const extractPathnameWithoutLocale = (
  pathname: string,
  locales: readonly Locale[],
): string => {
  return extractPathnameWithoutLocaleUtil(pathname, locales);
};

export const getUserRole = (session: {
  user: { role?: UserRole };
}): UserRole => {
  return session.user.role ?? "STUDENT";
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
      redirectPath: buildRoleHomePath("STUDENT", {
        locale: currentLocale,
        defaultLocale,
      }),
    };
  }

  // Tutors cannot access student routes
  if (role === "TUTOR" && (path === "/" || isStudentOnlyRoute(path))) {
    return {
      shouldRedirect: true,
      redirectPath: buildRoleHomePath("TUTOR", {
        locale: currentLocale,
        defaultLocale,
      }),
    };
  }

  return { shouldRedirect: false, redirectPath: null };
};
