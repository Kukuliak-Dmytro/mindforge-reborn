import { envClient } from "@/config/env";

//variable
/**
 * Tracks if edge Sentry has been initialized to prevent double initialization.
 */
let edgeSentryInitialized = false;

//function
/**
 * Initializes Sentry edge runtime configuration.
 * This function is called lazily to avoid crypto.randomUUID() errors
 * with Next.js 16 Cache Components.
 */
export const initSentryEdge = async () => {
  // Only initialize if DSN is provided
  if (!envClient.NEXT_PUBLIC_SENTRY_DSN) {
    return;
  }

  // Prevent double initialization
  if (edgeSentryInitialized) {
    return;
  }

  try {
    // Dynamic import to defer Sentry initialization until actually needed
    const Sentry = await import("@sentry/nextjs");

    // Check if already initialized
    try {
      const client = Sentry.getClient();
      if (client) {
        edgeSentryInitialized = true;
        return;
      }
    } catch {
      // getClient might throw if not initialized, which is fine
    }

    // Initialize Sentry edge runtime
    Sentry.init({
      dsn: envClient.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1,
      enableLogs: false,
      debug: false,
      environment: process.env.NODE_ENV || "development",
    });

    edgeSentryInitialized = true;
  } catch (error) {
    // Log error but don't throw - Sentry initialization failure shouldn't break the app
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to initialize Sentry edge:", error);
    }
  }
};
