import { queryOptions } from "@tanstack/react-query";
import { getTutorProfile } from "./tutor-profile.api";

//constant
export const TUTOR_PROFILE_QUERY_KEYS = {
  tutorProfileBase: () => ["tutor-profile"] as const,
  tutorProfile: () => ["tutor-profile", "detail"] as const,
} as const;

//interface
/**
 * Options for tutor profile query.
 */
interface ITutorProfileQueryOptions {
  /**
   * Optional headers to include in the request (e.g., cookies for server-side requests).
   */
  headers?: HeadersInit;
}

//function
/**
 * Query options for fetching tutor profile.
 *
 * This function creates query options for React Query to fetch
 * the current tutor's profile with all related data.
 *
 * @param options - Optional configuration including headers for server-side requests
 * @returns React Query options object
 */
export const tutorProfileQueryOptions = (
  options: ITutorProfileQueryOptions = {},
) => {
  const { headers } = options;

  //return
  return queryOptions({
    queryKey: TUTOR_PROFILE_QUERY_KEYS.tutorProfile(),
    queryFn: async () => {
      //return
      return await getTutorProfile(headers);
    },
  });
};
