"use cache";
import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/pkg/libraries/locale/routing";
import { StudentHomeModule } from "@/app/modules/student/home";
//interface
interface IProps {
  params: Promise<{ locale: Locale }>;
}

//component
/**
 * Student page component.
 */
export const StudentPage = async (props: IProps) => {
  const { locale } = await props.params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  //return
  return <StudentHomeModule />;
};

export default StudentPage;
