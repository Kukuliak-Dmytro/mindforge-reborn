// This file is intentionally empty.
// Sentry client initialization has been moved to SentryInitializer component
// in the IntegrationsProvider to ensure proper initialization order with
// Next.js 16 Cache Components. The instrumentation-client.ts file is
// auto-loaded by Next.js, so we keep it empty to avoid crypto.randomUUID()
// errors during build time.

// Router transition handler can be added to SentryInitializer if needed.
