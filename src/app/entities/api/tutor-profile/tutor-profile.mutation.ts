import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTutorProfile } from "./tutor-profile.api";
import type { IUpdateTutorProfileData } from "@/app/entities/models";
import { TUTOR_PROFILE_QUERY_KEYS } from "./tutor-profile.query";

//function
/**
 * Hook for updating tutor profile.
 *
 * This hook provides a mutation function to update the tutor profile
 * and automatically invalidates the profile query on success.
 *
 * @returns Mutation object with mutate function and loading states
 */
export const useUpdateTutorProfile = () => {
  const queryClient = useQueryClient();

  //return
  return useMutation({
    mutationFn: (data: IUpdateTutorProfileData) => updateTutorProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TUTOR_PROFILE_QUERY_KEYS.tutorProfileBase(),
      });
    },
  });
};
