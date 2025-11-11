import { GrowthBook } from "@growthbook/growthbook";
import { cookies } from "next/headers";

import { envServer } from "@/config/env";
import { USER_ID_COOKIE } from "@/proxy";

// growthbook
const gb =
  envServer.GROWTHBOOK_API_HOST && envServer.GROWTHBOOK_CLIENT_KEY
    ? new GrowthBook({
        apiHost: envServer.GROWTHBOOK_API_HOST,
        clientKey: envServer.GROWTHBOOK_CLIENT_KEY,
        enableDevMode: process.env.NODE_ENV !== "production",
      })
    : null;

let initialized = false;

//function
/**
 * Ensures GrowthBook is initialized.
 */
const ensureInitialized = async () => {
  if (!gb) return;
  if (!initialized) {
    await gb.init({ timeout: 3000 });
    initialized = true;
  }
};

//function
/**
 * Gets a feature flag value from GrowthBook.
 */
export const getFeatureValue = async <T>(
  key: string,
  defaultValue: T,
  attributes: Record<string, unknown>,
): Promise<T> => {
  if (!gb) return defaultValue;

  await ensureInitialized();

  // Read user ID from cookies (server-side) for GrowthBook experiment hashing
  const cookieStore = await cookies();
  const userId = cookieStore.get(USER_ID_COOKIE)?.value || "anonymous";

  // GrowthBook requires at least an empty id attribute for consistent evaluation
  // Even without targeting rules, the id attribute is needed for proper feature flag evaluation
  gb.setAttributes({
    id: userId,
    ...attributes,
  });

  const result = gb.evalFeature<T>(key);

  //return
  return result?.value ?? defaultValue;
};
