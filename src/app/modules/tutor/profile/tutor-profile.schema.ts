import { z } from "zod";

//type
/**
 * Type for translation function that accepts a key and returns a string.
 */
type TranslationFunction = (key: string) => string;

//function
/**
 * Creates a Zod schema for tutor profile form validation with localized error messages.
 *
 * @param t - Translation function from next-intl
 * @returns Zod schema for tutor profile form
 */
export const createTutorProfileSchema = (t: TranslationFunction) => {
  return z.object({
    firstName: z
      .string()
      .min(1, t("tutor_profile.validation.firstName_required"))
      .max(50, t("tutor_profile.validation.firstName_maxLength")),
    lastName: z
      .string()
      .min(1, t("tutor_profile.validation.lastName_required"))
      .max(50, t("tutor_profile.validation.lastName_maxLength")),
    email: z
      .email(t("tutor_profile.validation.email_invalid"))
      .min(1, t("tutor_profile.validation.email_required")),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[\d\s\-\+\(\)]+$/.test(val),
        t("tutor_profile.validation.phone_invalid"),
      ),
    bio: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length <= 1000,
        t("tutor_profile.validation.bio_maxLength"),
      ),
  });
};

//type
/**
 * Type inferred from tutor profile schema.
 * Note: This is a generic type that should be used with the schema created by createTutorProfileSchema.
 */
export type ITutorProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
};
