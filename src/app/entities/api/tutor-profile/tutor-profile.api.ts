import { restApiFetcher } from "@/pkg/libraries/rest-api/fetcher/rest-api.fetcher";
import { ITutorProfile, IUpdateTutorProfileData } from "@/app/entities/models";

//interface
/**
 * API response wrapper structure.
 */
interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

//function
/**
 * Fetches tutor profile from the API.
 */
export const getTutorProfile = async (): Promise<ITutorProfile> => {
  //return
  const response = await restApiFetcher
    .get("tutor/profile")
    .json<IApiResponse<ITutorProfile>>();

  if (!response.success || !response.data) {
    throw new Error(
      response.error?.message ||
        response.message ||
        "Failed to fetch tutor profile",
    );
  }

  return response.data;
};

//function
/**
 * Updates tutor profile via the API.
 */
export const updateTutorProfile = async (
  data: IUpdateTutorProfileData,
): Promise<ITutorProfile> => {
  //return
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await restApiFetcher
    .patch("tutor/profile", { json: data })
    .json<IApiResponse<ITutorProfile>>();

  if (!response.success || !response.data) {
    throw new Error(
      response.error?.message ||
        response.message ||
        "Failed to update tutor profile",
    );
  }

  return response.data;
};
