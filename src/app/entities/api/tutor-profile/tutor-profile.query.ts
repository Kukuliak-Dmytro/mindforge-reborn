import { queryOptions } from "@tanstack/react-query";
import { getTutorProfile } from "./tutor-profile.api";

//constant
export const TUTOR_PROFILE_QUERY_KEYS = {
  tutorProfileBase: () => ["tutor-profile"] as const,
  tutorProfile: () => ["tutor-profile", "detail"] as const,
} as const;

//function
/**
 * Query options for fetching tutor profile.
 *
 * This function creates query options for React Query to fetch
 * the current tutor's profile with all related data.
 *
 * @returns React Query options object
 */
export const tutorProfileQueryOptions = () => {
  //return
  return queryOptions({
    queryKey: TUTOR_PROFILE_QUERY_KEYS.tutorProfile(),
    queryFn: async () => {
      //return
      return await getTutorProfile();
    },
  });
};
