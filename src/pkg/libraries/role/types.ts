//type
/**
 * User role type.
 */
export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";

//constant
/**
 * Student-only routes (require STUDENT role).
 */
const STUDENT_ONLY_ROUTES = [
  "/catalog",
  "/orders",
  "/saved",
  "/chats",
  "/profile",
] as const;

//function
/**
 * Checks if a path is a student-only route.
 */
export const isStudentOnlyRoute = (path: string): boolean => {
  return STUDENT_ONLY_ROUTES.some((route) => path.includes(route));
};
