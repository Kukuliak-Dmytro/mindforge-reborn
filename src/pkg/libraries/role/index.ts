// Type and utility exports
export type { UserRole } from "./types";
export { isStudentOnlyRoute } from "./types";

// Middleware exports
export {
  extractPathnameWithoutLocale,
  extractRoleFromSession,
  checkRouteAccess,
} from "./middleware";
export type { RouteAccessResult } from "./middleware";
