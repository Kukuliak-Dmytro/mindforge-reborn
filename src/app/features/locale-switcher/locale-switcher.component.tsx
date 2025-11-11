"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/pkg/libraries/locale";
import { Button } from "@/app/shared/components/ui/button";

//component
/**
 * LocaleSwitcher component.
 */
export const LocaleSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: string) => {
    router.push(pathname, { locale: nextLocale });
  };

  //return
  return (
    <>
      {locale === "en" && (
        <Button
          variant="outline"
          onClick={() => switchLocale("uk")}
          size="default">
          EN
        </Button>
      )}

      {locale === "uk" && (
        <Button
          variant="outline"
          onClick={() => switchLocale("en")}
          size="default">
          UK
        </Button>
      )}
    </>
  );
};
