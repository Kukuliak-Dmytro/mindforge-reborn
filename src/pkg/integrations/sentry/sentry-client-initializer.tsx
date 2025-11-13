"use client";

import { useEffect, useRef } from "react";
import * as Sentry from "@sentry/nextjs";
import { envClient } from "@/config/env";

//component
/**
 * SentryClientInitializer component for client-side Sentry initialization.
 * Initializes Sentry in useEffect after component mount.
 * Ensures initialization only happens once even if component re-renders.
 */
export const SentryClientInitializer = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization
    if (initializedRef.current) {
      return;
    }

    // Only initialize if DSN is provided
    if (!envClient.NEXT_PUBLIC_SENTRY_DSN) {
      return;
    }

    // Check if Sentry is already initialized
    try {
      const client = Sentry.getClient();
      if (client) {
        initializedRef.current = true;
        return;
      }
    } catch {
      // getClient might throw if not initialized, which is fine
    }

    // Initialize Sentry client-side
    try {
      Sentry.init({
        dsn: envClient.NEXT_PUBLIC_SENTRY_DSN,
        integrations: [Sentry.replayIntegration()],
        tracesSampleRate: 1,
        enableLogs: true,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        debug: false,
        environment: process.env.NODE_ENV || "development",
      });
      initializedRef.current = true;
    } catch (error) {
      // Silently fail in production, but log in development
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to initialize Sentry:", error);
      }
    }
  }, []);

  // Export router transition handler for Next.js instrumentation
  // This is used by Next.js to track route transitions
  useEffect(() => {
    // Make the handler available globally for Next.js instrumentation
    if (typeof window !== "undefined") {
      // @ts-expect-error - Adding to window for Next.js instrumentation
      window.__SENTRY_ROUTER_TRANSITION_START__ =
        Sentry.captureRouterTransitionStart;
    }
  }, []);

  //return
  return null;
};
