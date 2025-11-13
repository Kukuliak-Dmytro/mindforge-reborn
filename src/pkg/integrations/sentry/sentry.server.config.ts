import { envClient } from "@/config/env";

//variable
/**
 * Tracks if server-side Sentry has been initialized to prevent double initialization.
 */
let serverSentryInitialized = false;

//function
/**
 * Initializes Sentry server-side configuration.
 * This function is called lazily to avoid crypto.randomUUID() errors
 * with Next.js 16 Cache Components.
 */
export const initSentryServer = async () => {
  // Only initialize if DSN is provided
  if (!envClient.NEXT_PUBLIC_SENTRY_DSN) {
    return;
  }

  // Prevent double initialization
  if (serverSentryInitialized) {
    return;
  }

  try {
    // Dynamic import to defer Sentry initialization until actually needed
    const Sentry = await import("@sentry/nextjs");

    // Check if already initialized
    try {
      const client = Sentry.getClient();
      if (client) {
        serverSentryInitialized = true;
        return;
      }
    } catch {
      // getClient might throw if not initialized, which is fine
    }

    // Initialize Sentry server-side
    Sentry.init({
      dsn: envClient.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1,
      enableLogs: false,
      debug: false,
      environment: process.env.NODE_ENV || "development",
    });

    serverSentryInitialized = true;
  } catch (error) {
    // Log error but don't throw - Sentry initialization failure shouldn't break the app
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to initialize Sentry server:", error);
    }
  }
};
