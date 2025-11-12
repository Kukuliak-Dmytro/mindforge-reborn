export type { UserRole } from "./types";
export { isStudentOnlyRoute } from "./types";

export {
  extractPathnameWithoutLocale,
  getUserRole,
  checkRouteAccess,
  isPublicRoute,
} from "./middleware";
export type { IRouteAccessResult } from "./middleware";
