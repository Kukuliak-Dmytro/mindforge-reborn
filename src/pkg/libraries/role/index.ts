// Routing exports
export type { UserRole } from "./routing";
export {
  roleRouting,
  getRoutesForRole,
  STUDENT_ONLY_ROUTES,
  TUTOR_ONLY_ROUTES,
  isStudentOnlyRoute,
  isTutorOnlyRoute,
  requiresRole,
} from "./routing";

// Request exports
export { getRole, getSessionWithRole } from "./request";

// Provider exports
export {
  RoleProvider,
  useRole,
  useHasRole,
  useIsStudent,
  useIsTutor,
  useIsAdmin,
} from "./provider";

// Server exports
export { getRoleFromServer } from "./server";
