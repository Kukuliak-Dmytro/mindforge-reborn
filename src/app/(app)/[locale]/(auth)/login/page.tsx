import { use } from "react";
import { Locale, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { LoginModule } from "@/app/modules/shared/auth";
import { routing } from "@/pkg/libraries/locale/routing";

//interface
interface IProps {
  params: Promise<{ locale: Locale }>;
}

//component
/**
 * LoginPage component.
 */
export const LoginPage = (props: IProps) => {
  const { locale } = use(props.params);

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  //return
  return <LoginModule />;
};

export default LoginPage;
