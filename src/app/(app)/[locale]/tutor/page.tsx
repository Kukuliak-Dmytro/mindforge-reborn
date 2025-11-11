import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/pkg/libraries/locale/routing";
import { TutorHomeModule } from "@/app/modules/tutor/home/tutor-home.component";
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
  return <TutorHomeModule />;
};

export default TutorPage;
