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
 * Matches exact routes or routes that start with the student-only route followed by / or end of string.
 */
export const isStudentOnlyRoute = (path: string): boolean => {
  return STUDENT_ONLY_ROUTES.some(
    (route) =>
      path === route ||
      path.startsWith(`${route}/`) ||
      path.startsWith(`${route}?`),
  );
};
