//function
/**
 * Registers instrumentation for Sentry.
 *
 * Note: Sentry initialization is deferred to avoid crypto.randomUUID() errors
 * with Next.js 16 Cache Components. Server-side Sentry is initialized lazily
 * when needed rather than at module load time.
 */
export const register = async () => {
  // Defer Sentry imports and initialization to avoid crypto operations during build
  // These will be initialized when actually needed at runtime
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Dynamic import to defer initialization
    const serverConfig = await import(
      "./pkg/integrations/sentry/sentry.server.config"
    );
    // Call the init function explicitly
    await serverConfig.initSentryServer();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Dynamic import to defer initialization
    const edgeConfig = await import(
      "./pkg/integrations/sentry/sentry.edge.config"
    );
    // Call the init function explicitly
    await edgeConfig.initSentryEdge();
  }
};

//function
/**
 * Request error handler for Sentry.
 * Uses dynamic import to avoid crypto operations at module load time.
 * Note: This is a wrapper that defers Sentry import until actually needed.
 */
export const onRequestError = async (
  error: unknown,
  request: unknown,
  context: unknown,
) => {
  const Sentry = await import("@sentry/nextjs");
  // @ts-expect-error - Sentry types may vary, but this matches Next.js instrumentation signature
  return Sentry.captureRequestError(error, request, context);
};
