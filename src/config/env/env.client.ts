import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

//constant
/**
 * Client-side environment variables configuration.
 */
export const envClient = createEnv({
  client: {
    // front end url(current app url)
    NEXT_PUBLIC_CLIENT_WEB_URL: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_CLIENT_WEB_URL is required" }),
    // back end url(rest api url)
    NEXT_PUBLIC_CLIENT_API_URL: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_CLIENT_API_URL is required" }),
    // Sentry DSN (optional)
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
    // Mixpanel token (optional)
    NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().optional(),
    // Mixpanel API host (optional)
    NEXT_PUBLIC_MIXPANEL_API_HOST: z.string().optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_CLIENT_WEB_URL: process.env.NEXT_PUBLIC_CLIENT_WEB_URL,
    NEXT_PUBLIC_CLIENT_API_URL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    NEXT_PUBLIC_MIXPANEL_API_HOST: process.env.NEXT_PUBLIC_MIXPANEL_API_HOST,
  },
});
