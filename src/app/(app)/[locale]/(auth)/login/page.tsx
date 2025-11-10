import { Locale, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";

import { LoginModule } from "@/app/modules/auth";
import { routing } from "@/pkg/libraries/locale/routing";

//interface
interface IProps {
  params: Promise<{ locale: Locale }>;
}

//component
/**
 * LoginPage component.
 */
export const LoginPage = async (props: IProps) => {
  const { locale } = await props.params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get translations
  const t = await getTranslations();

  //return
  return (
    <div className="min-h-screen flex items-center justify-center bg-white-bg">
      <div
        className="max-w-md w-full space-y-8 p-8 bg-white-fg rounded-medium
          shadow-medium">
        <div>
          <h2
            className="mt-6 text-center text-3xl font-extrabold text-rich-black">
            {t("auth_login_title")}
          </h2>
          <p className="mt-2 text-center text-sm text-dark-gray">
            {t("auth_or")}{" "}
            <Link
              href={`/${locale}/register`}
              className="font-medium text-primary hover:text-primary/80">
              {t("auth_login_link_text")}
            </Link>
          </p>
        </div>
        <LoginModule />
      </div>
    </div>
  );
};

export default LoginPage;
