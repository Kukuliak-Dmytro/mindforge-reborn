import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

//constant
/**
 * Server-side environment variables configuration.
 */
export const envServer = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production"])
      .optional()
      .default("development"),
    // DATABASE_URL: z.string().min(1, { message: "DATABASE_URL is required" }),
    // BETTER_AUTH_SECRET: z
    //   .string()
    //   .min(1, { message: "BETTER_AUTH_SECRET is required" }),
    GROWTHBOOK_CLIENT_KEY: z
      .string()
      .optional(),
    GROWTHBOOK_API_HOST: z
      .string()
      .optional(),
    GROWTHBOOK_APP_ORIGIN: z
      .string()
      .optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // DATABASE_URL: process.env.DATABASE_URL,
    // BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    GROWTHBOOK_CLIENT_KEY: process.env.GROWTHBOOK_CLIENT_KEY,
    GROWTHBOOK_API_HOST: process.env.GROWTHBOOK_API_HOST,
    GROWTHBOOK_APP_ORIGIN: process.env.GROWTHBOOK_APP_ORIGIN,
  },
});
