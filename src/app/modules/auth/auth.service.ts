import { authClient } from "@/pkg/libraries/better-auth/auth-client";

//function
/**
 * Signs in a user with email and password.
 */
export const signIn = async (
  email: string,
  password: string,
  locale?: string,
) => {
  // Always include locale in callback URL to preserve locale context
  const callbackURL = locale ? `/${locale}` : "/";

  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL,
    rememberMe: true,
  });

  if (error) {
    throw new Error(error.message);
  }
  //return
  return data;
};

//function
/**
 * Signs up a new user with firstName, lastName, email, and password.
 */
export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  locale?: string,
) => {
  // Always include locale in callback URL to preserve locale context
  const callbackURL = locale ? `/${locale}` : "/";

  // Type assertion needed because TypeScript types don't include additionalFields
  // Better Auth accepts firstName and lastName as additionalFields with input: true
  // We don't send 'name' because our Prisma schema uses firstName and lastName instead
  const { data, error } = await authClient.signUp.email({
    email,
    password,
    firstName,
    lastName,
    callbackURL,
  } as unknown as Parameters<typeof authClient.signUp.email>[0] & {
    firstName: string;
    lastName: string;
  });

  if (error) {
    throw new Error(error.message);
  }

  //return
  return data;
};

//function
/**
 * Signs out the current user.
 */
export const signOut = async () => {
  const { error } = await authClient.signOut();

  if (error) {
    throw new Error(error.message);
  }
};
