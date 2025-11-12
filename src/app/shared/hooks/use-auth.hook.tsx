"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/pkg/libraries/better-auth/auth-client";

interface IUseAuthReturn {
  user:
    | Awaited<ReturnType<typeof authClient.getSession>>["data"]["user"]
    | null;
  isLoggedIn: boolean;
  userRole: "TUTOR" | "STUDENT" | undefined;
  isLoading: boolean;
}

/**
 * Custom hook for managing authentication state.
 * Provides user information, login status, and role.
 * Automatically refetches session when window regains focus.
 */
export const useAuth = (): IUseAuthReturn => {
  const [session, setSession] = useState<Awaited<
    ReturnType<typeof authClient.getSession>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await authClient.getSession();
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    // Refetch session when window regains focus (user might have logged in/out in another tab)
    const handleFocus = () => {
      fetchSession();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const user = session?.data?.user ?? null;
  const isLoggedIn = !!user;
  const userRole = user?.role as "TUTOR" | "STUDENT" | undefined;

  return {
    user,
    isLoggedIn,
    userRole,
    isLoading,
  };
};
