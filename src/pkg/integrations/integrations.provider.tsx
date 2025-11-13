"use cache";

import { MixpanelInitializer } from "./mixpanel/mixpanel-initializer";
import { SentryInitializer } from "./sentry/sentry-initializer";
import { configureServerSideGrowthBook } from "./growthbook";

//component
/**
 * IntegrationsProvider component for server-side initialization.
 * Configures GrowthBook and renders client-side integration initializers.
 * Wrapped in Suspense to ensure proper initialization order with Cache Components.
 */
export const IntegrationsProvider = async () => {
  // Configure GrowthBook for server-side evaluation
  configureServerSideGrowthBook();

  //return
  return (
    <>
      <SentryInitializer />
      <MixpanelInitializer />
    </>
  );
};
