import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/pkg/libraries/locale/routing";
import { getRoleFromServer } from "@/pkg/libraries/role/server";
import { getSession } from "@/pkg/libraries/better-auth/auth";
import { headers } from "next/headers";

//interface
interface IProps {
  params: Promise<{ locale: Locale }>;
}

//component
/**
 * Tutor page component.
 */
export const TutorPage = async (props: IProps) => {
  const { locale } = await props.params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get role and session for testing
  const headersList = await headers();
  const role = await getRoleFromServer();
  const session = await getSession(headersList);

  //return
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8
        p-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold text-rich-black">Tutor Dashboard</h1>
        <p className="text-lg text-gray-600">This is the tutor-only page</p>
      </div>

      {/* Role Information for Testing */}
      <div
        className="rounded-lg border-2 border-secondary bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Role Information</h2>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Role:</span>{" "}
            <span className="text-secondary">
              {role || "Not authenticated"}
            </span>
          </div>
          {session && (
            <>
              <div>
                <span className="font-semibold">User ID:</span>{" "}
                <span className="text-gray-600">{session.user.id}</span>
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                <span className="text-gray-600">{session.user.email}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tutor-specific content */}
      <div className="rounded-lg bg-green-50 p-6">
        <h3 className="mb-2 text-xl font-semibold">Tutor Features</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Browse available orders</li>
          <li>Manage your profile</li>
          <li>View your orders</li>
          <li>Save favorite orders</li>
          <li>Manage subjects</li>
        </ul>
      </div>
    </div>
  );
};

export default TutorPage;
