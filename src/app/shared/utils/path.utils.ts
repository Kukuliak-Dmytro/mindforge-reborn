import type { Locale } from "next-intl";
import { hasLocale } from "next-intl";
import type { NextRequest } from "next/server";
import { routing } from "@/pkg/libraries/locale/routing";
import type { UserRole } from "@/pkg/libraries/role/types";
import { isStudentOnlyRoute } from "@/pkg/libraries/role/types";

//interface
/**
 * Result of pathname parsing with locale information.
 */
export interface IPathnameInfo {
  pathname: string;
  pathnameWithoutLocale: string;
  locale: Locale;
  extractedLocale: Locale | null;
}

//interface
/**
 * Options for building locale-aware paths.
 */
export interface IBuildPathOptions {
  locale?: Locale;
  defaultLocale?: Locale;
}

//constant
/**
 * Cookie name for Next.js locale.
 */
const NEXT_LOCALE_COOKIE = "NEXT_LOCALE";

//function
/**
 * Extracts the locale from a pathname.
 * Returns the locale if found, null otherwise.
 */
export const extractLocaleFromPathname = (
  pathname: string,
  locales: readonly Locale[],
): Locale | null => {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
};

//function
/**
 * Extracts pathname without locale prefix.
 */
export const extractPathnameWithoutLocale = (
  pathname: string,
  locales: readonly Locale[],
): string => {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length);
    }
    if (pathname === `/${locale}`) {
      return "/";
    }
  }
  return pathname;
};

//function
/**
 * Parses a pathname and extracts all relevant information.
 */
export const parsePathname = (pathname: string): IPathnameInfo => {
  const extractedLocale = extractLocaleFromPathname(pathname, routing.locales);
  const pathnameWithoutLocale = extractPathnameWithoutLocale(
    pathname,
    routing.locales,
  );
  const locale = extractedLocale ?? routing.defaultLocale;

  return {
    pathname,
    pathnameWithoutLocale,
    locale,
    extractedLocale,
  };
};

//function
/**
 * Gets locale from NextRequest (from cookie or pathname).
 */
export const getLocaleFromRequest = (request: NextRequest): Locale => {
  // First try to get from cookie
  const cookieLocale = request.cookies.get(NEXT_LOCALE_COOKIE)?.value;
  if (cookieLocale && hasLocale(routing.locales, cookieLocale)) {
    return cookieLocale as Locale;
  }

  // Fallback to extracting from pathname
  const pathnameInfo = parsePathname(request.nextUrl.pathname);
  return pathnameInfo.locale;
};

//function
/**
 * Builds a locale-aware path.
 * If locale is the default locale, returns path without locale prefix.
 * Otherwise, returns path with locale prefix.
 */
export const buildLocalePath = (
  path: string,
  options?: IBuildPathOptions,
): string => {
  const locale = options?.locale ?? routing.defaultLocale;
  const defaultLocale = options?.defaultLocale ?? routing.defaultLocale;

  if (locale === defaultLocale) {
    return path;
  }

  return `/${locale}${path}`;
};

//function
/**
 * Gets the default home path for a role.
 */
export const getRoleHomePath = (role: UserRole): string => {
  return role === "TUTOR" ? "/tutor" : "/";
};

//function
/**
 * Builds a locale-aware home path for a role.
 */
export const buildRoleHomePath = (
  role: UserRole,
  options?: IBuildPathOptions,
): string => {
  const homePath = getRoleHomePath(role);
  return buildLocalePath(homePath, options);
};

//function
/**
 * Builds a locale-aware login path.
 */
export const buildLoginPath = (options?: IBuildPathOptions): string => {
  return buildLocalePath("/login", options);
};

//function
/**
 * Checks if a pathname is a home page (root or tutor home).
 */
export const isHomePage = (pathname: string): boolean => {
  const pathnameWithoutLocale = extractPathnameWithoutLocale(
    pathname,
    routing.locales,
  );
  return pathnameWithoutLocale === "/" || pathnameWithoutLocale === "/tutor";
};

//function
/**
 * Checks if a pathname is the tutor home page.
 */
export const isTutorHomePage = (pathname: string): boolean => {
  const pathnameWithoutLocale = extractPathnameWithoutLocale(
    pathname,
    routing.locales,
  );
  return pathnameWithoutLocale === "/tutor";
};

//function
/**
 * Checks if a pathname is the student home page.
 */
export const isStudentHomePage = (pathname: string): boolean => {
  const pathnameWithoutLocale = extractPathnameWithoutLocale(
    pathname,
    routing.locales,
  );
  return pathnameWithoutLocale === "/";
};

//function
/**
 * Checks if a pathname is a tutor route.
 */
export const isTutorRoute = (pathname: string): boolean => {
  const pathnameWithoutLocale = extractPathnameWithoutLocale(
    pathname,
    routing.locales,
  );
  return pathnameWithoutLocale.startsWith("/tutor");
};

//function
/**
 * Checks if a pathname is a student-only route.
 */
export const isStudentRoute = (pathname: string): boolean => {
  const pathnameWithoutLocale = extractPathnameWithoutLocale(
    pathname,
    routing.locales,
  );
  return (
    pathnameWithoutLocale === "/" || isStudentOnlyRoute(pathnameWithoutLocale)
  );
};
