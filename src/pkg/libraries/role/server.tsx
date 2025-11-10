import "server-only";

import { headers } from "next/headers";
import { getRole } from "./request";
import type { UserRole } from "./routing";

//function
/**
 * Gets the user's role from the session (server-side).
 * Use this in server components or server actions.
 */
export const getRoleFromServer = async (): Promise<UserRole | null> => {
  const headersList = await headers();
  return getRole(headersList);
};

