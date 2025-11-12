"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/pkg/libraries/locale";
import { Button } from "@/app/shared/components/ui/button";
import { DropdownMenuItem } from "@/app/shared/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";

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

//component
/**
 * LocaleSwitcherMenuItem component for use in dropdown menus.
 */
export const LocaleSwitcherMenuItem = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("header");

  const switchLocale = (nextLocale: string) => {
    router.push(pathname, { locale: nextLocale });
  };

  //return
  return (
    <DropdownMenuItem
      onClick={() => switchLocale(locale === "en" ? "uk" : "en")}
      className="flex items-center justify-end gap-2 cursor-pointer">
      {locale === "en" ? t("locale_ukrainian") : t("locale_english")}
      <Icon
        icon={locale === "en" ? "mdi:flag" : "mdi:flag-outline"}
        className="size-4"
      />
    </DropdownMenuItem>
  );
};
