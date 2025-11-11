import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/pkg/libraries/locale/routing";

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

  //return
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8
        p-8">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold text-primary-text">
          Tutor Dashboard
        </h1>
        <p className="text-lg text-gray-600">This is the tutor-only page</p>
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
