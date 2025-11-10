import { Locale, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
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

  const t = await getTranslations();

  //return
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-rich-black">
        {t("tutor_title")}
      </h1>
    </div>
  );
};

export default TutorPage;

