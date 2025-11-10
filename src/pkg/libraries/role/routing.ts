//type
/**
 * User role type.
 */
export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";

//constant
/**
 * Role-based routing configuration.
 * Defines routes for each role.
 */
export const roleRouting = {
  student: {
    home: "/",
    catalog: "/catalog",
    orders: "/orders",
    chats: "/chats",
    saved: "/saved",
    profile: "/profile",
  },
  tutor: {
    home: "/tutor",
    orders: "/tutor/orders",
    chats: "/tutor/chats",
    saved: "/tutor/saved",
    profile: "/tutor/profile",
    subjects: "/tutor/profile/subjects",
  },
  admin: {
    home: "/admin",
    // Add admin routes as needed
  },
} as const;

//function
/**
 * Gets routes for a specific role.
 */
export const getRoutesForRole = (role: UserRole) => {
  switch (role) {
    case "STUDENT":
      return roleRouting.student;
    case "TUTOR":
      return roleRouting.tutor;
    case "ADMIN":
      return roleRouting.admin;
    default:
      return roleRouting.student;
  }
};

//constant
/**
 * Student-only routes (require STUDENT role).
 */
export const STUDENT_ONLY_ROUTES = [
  "/catalog",
  "/orders",
  "/saved",
  "/chats",
  "/profile",
] as const;

//constant
/**
 * Tutor-only routes (require TUTOR role).
 */
export const TUTOR_ONLY_ROUTES = [
  "/tutor/orders",
  "/tutor/saved",
  "/tutor/chats",
  "/tutor/profile",
  "/tutor/profile/subjects",
] as const;

//function
/**
 * Checks if a path is a student-only route.
 */
export const isStudentOnlyRoute = (path: string): boolean => {
  return STUDENT_ONLY_ROUTES.some((route) => path.includes(route));
};

//function
/**
 * Checks if a path is a tutor-only route.
 */
export const isTutorOnlyRoute = (path: string): boolean => {
  return TUTOR_ONLY_ROUTES.some((route) => path.includes(route));
};

//function
/**
 * Checks if a path requires a specific role.
 */
export const requiresRole = (path: string, role: UserRole): boolean => {
  if (path.startsWith("/tutor")) {
    return role === "TUTOR";
  }
  if (isStudentOnlyRoute(path)) {
    return role === "STUDENT";
  }
  return true; // Public routes
};

