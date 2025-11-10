import { createAuthClient } from "better-auth/react";
import { envClient } from "@/config/env";

//constant
/**
 * Client-side authentication client for Better Auth.
 */
export const authClient = createAuthClient({
  //  better auth is not in the nextjs, but in the api url
  baseURL: envClient.NEXT_PUBLIC_CLIENT_API_URL,
});
