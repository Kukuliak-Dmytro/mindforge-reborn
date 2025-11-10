import "server-only";

import { envClient } from "@/config/env";

//constant
/**
 * Backend API URL for authentication.
 */
const BACKEND_API_URL = envClient.NEXT_PUBLIC_CLIENT_API_URL;

//function
/**
 * Gets the current session from the backend auth API.
 * This is used for server-side session verification.
 */
export const getSession = async (
  headers: Headers,
): Promise<{
  user: {
    id: string;
    email: string;
    name: string | null;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
  };
} | null> => {
  try {
    // Forward cookies and headers to backend
    const cookieHeader = headers.get("cookie") || "";

    // Use the frontend's API route which proxies to the backend
    // This ensures we're using the same origin and cookie handling
    const response = await fetch(`${BACKEND_API_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store", // Ensure we always get fresh session data
    });

    if (!response.ok) {
      console.error(
        `Session check failed: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();

    // Better Auth returns the session data directly with user and session properties
    // Check if we have both user and session
    if (!data || !data.user || !data.session) {
      console.log("No session found in response:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching session from backend:", error);
    return null;
  }
};

//constant
/**
 * Legacy auth object for compatibility.
 * Note: This no longer uses a local database connection.
 * All auth operations should go through the backend API.
 */
export const auth = {
  api: {
    getSession: async (options: { headers: Headers }) => {
      return getSession(options.headers);
    },
  },
};
