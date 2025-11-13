import ky, { type KyInstance, type Options } from "ky";

import { envClient } from "@/config/env";

//constant
/**
 * Base fetcher configuration for external API calls.
 */
const baseFetcherConfig = {
  prefixUrl: `${envClient.NEXT_PUBLIC_CLIENT_API_URL}`,
  credentials: "include" as const,
  throwHttpErrors: false,
};

//constant
/**
 * Default fetcher for external API calls.
 * Use this for client-side requests where cookies are automatically included.
 */
export const restApiFetcher: KyInstance = ky.create(baseFetcherConfig);

//interface
/**
 * Options for creating a fetcher with custom headers.
 */
interface ICreateFetcherWithHeadersOptions {
  /**
   * Optional headers to include in requests (e.g., cookies for server-side requests).
   */
  headers?: HeadersInit;
}

//function
/**
 * Creates a fetcher instance with optional custom headers.
 * Useful for server-side requests where cookies need to be explicitly passed.
 *
 * @param options - Configuration options including optional headers
 * @returns A Ky instance configured with the provided headers
 *
 * @example
 * ```ts
 * const fetcher = createRestApiFetcherWithHeaders({
 *   headers: {
 *     cookie: request.headers.get('cookie') || ''
 *   }
 * });
 * ```
 */
export const createRestApiFetcherWithHeaders = (
  options: ICreateFetcherWithHeadersOptions = {},
): KyInstance => {
  const { headers } = options;

  if (!headers) {
    return restApiFetcher;
  }

  return ky.create({
    ...baseFetcherConfig,
    headers,
  });
};

//function
/**
 * Extends a request with optional headers.
 * Useful for adding cookies to individual requests without creating a new fetcher instance.
 *
 * @param requestOptions - The original request options
 * @param headers - Optional headers to merge with existing headers
 * @returns Request options with merged headers
 *
 * @example
 * ```ts
 * const response = await restApiFetcher.get('endpoint', {
 *   ...extendRequestWithHeaders({}, { cookie: cookieHeader })
 * });
 * ```
 */
export const extendRequestWithHeaders = (
  requestOptions: Options = {},
  headers?: HeadersInit,
): Options => {
  if (!headers) {
    return requestOptions;
  }

  const mergedHeaders: Record<string, string> = {};

  // Convert existing headers to a plain object
  if (requestOptions.headers) {
    if (requestOptions.headers instanceof Headers) {
      requestOptions.headers.forEach((value, key) => {
        mergedHeaders[key] = value;
      });
    } else if (Array.isArray(requestOptions.headers)) {
      requestOptions.headers.forEach(([key, value]) => {
        if (value) mergedHeaders[key] = value;
      });
    } else {
      Object.entries(requestOptions.headers).forEach(([key, value]) => {
        if (value) mergedHeaders[key] = value;
      });
    }
  }

  // Merge new headers
  const newHeaders = new Headers(headers);
  newHeaders.forEach((value, key) => {
    mergedHeaders[key] = value;
  });

  return {
    ...requestOptions,
    headers: mergedHeaders,
  };
};
