"use cache";

import { SentryClientInitializer } from "./sentry-client-initializer";

//component
/**
 * SentryInitializer wrapper component using Cache Components.
 * The "use cache" directive allows crypto operations after dynamic data access.
 * This wraps the actual client-side initializer.
 */
export const SentryInitializer = async () => {
  //return
  return <SentryClientInitializer />;
};
