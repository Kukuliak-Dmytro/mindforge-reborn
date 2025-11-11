import "server-only";

import { getSession } from "@/pkg/libraries/better-auth/auth";
import type { UserRole } from "./routing";

//function
/**
 * Gets the user's role from the session.
 * Returns null if no session or role not found.
 */
export const getRole = async (headers: Headers): Promise<UserRole | null> => {
  const session = await getSession(headers);
  if (!session?.user?.role) {
    return null;
  }
  return session.user.role as UserRole;
};

//function
/**
 * Gets the full session with role.
 */
export const getSessionWithRole = async (headers: Headers) => {
  const session = await getSession(headers);
  if (!session) {
    return null;
  }
  return {
    ...session,
    user: {
      ...session.user,
      role: session.user.role as UserRole,
    },
  };
};



