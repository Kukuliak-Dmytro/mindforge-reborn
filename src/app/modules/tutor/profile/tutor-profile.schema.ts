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

//function
/**
 * Creates a Zod schema for tutor education form validation with localized error messages.
 *
 * @param t - Translation function from next-intl
 * @returns Zod schema for tutor education form
 */
export const createTutorEducationSchema = (t: TranslationFunction) => {
  return z.object({
    institution: z
      .string()
      .min(1, t("tutor_profile.validation.institution_required"))
      .max(100, t("tutor_profile.validation.institution_maxLength")),
    fieldOfStudy: z
      .string()
      .min(1, t("tutor_profile.validation.fieldOfStudy_required"))
      .max(100, t("tutor_profile.validation.fieldOfStudy_maxLength")),
    degree: z
      .string()
      .min(1, t("tutor_profile.validation.degree_required"))
      .max(100, t("tutor_profile.validation.degree_maxLength")),
    startDate: z
      .string()
      .min(1, t("tutor_profile.validation.startDate_required")),
    endDate: z.string().optional(),
  });
};

//type
/**
 * Type inferred from tutor education schema.
 */
export type ITutorEducationFormData = {
  institution: string;
  fieldOfStudy: string;
  degree: string;
  startDate: string;
  endDate?: string;
};

//function
/**
 * Creates a Zod schema for tutor experience form validation with localized error messages.
 *
 * @param t - Translation function from next-intl
 * @returns Zod schema for tutor experience form
 */
export const createTutorExperienceSchema = (t: TranslationFunction) => {
  return z.object({
    institution: z
      .string()
      .min(1, t("tutor_profile.validation.institution_required"))
      .max(100, t("tutor_profile.validation.institution_maxLength")),
    title: z
      .string()
      .min(1, t("tutor_profile.validation.title_required"))
      .max(100, t("tutor_profile.validation.title_maxLength")),
    startDate: z
      .string()
      .min(1, t("tutor_profile.validation.startDate_required")),
    endDate: z.string().optional(),
  });
};

//type
/**
 * Type inferred from tutor experience schema.
 */
export type ITutorExperienceFormData = {
  institution: string;
  title: string;
  startDate: string;
  endDate?: string;
};
