import { z } from "zod";

//constant
/**
 * Zod schema for user registration form validation.
 */
export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//interface
export interface ISignUpSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

//constant
/**
 * Zod schema for user sign-in form validation.
 */
export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

//interface
export interface ISignInSchema {
  email: string;
  password: string;
}
