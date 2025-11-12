"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/pkg/libraries/locale";
import { parsePathname, isHomePage } from "@/app/shared/utils/path.utils";
import { cn } from "@/app/shared/utils/utils";
import { useAuth } from "@/app/shared/hooks";
import { signOut } from "@/app/modules/shared/auth/auth.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/shared/components/ui/dropdown-menu";
import { LocaleSwitcherMenuItem } from "@/app/features/locale-switcher";
import { ThemeSwitcherMenuItem } from "@/app/features/theme-switcher";
import { Logo, MenuTrigger, UserInfo, MenuItemLink } from "./elements";
import {
  getTutorMenuItems,
  getStudentMenuItems,
  getCommonMenuItems,
  getAuthMenuItems,
  getLogoutItem,
  getSwitchRoleItems,
} from "./header.constants";

const renderLoggedInMenu = (
  menuItems: ReturnType<typeof getTutorMenuItems>,
  commonMenuItems: ReturnType<typeof getCommonMenuItems>,
  logoutItem: ReturnType<typeof getLogoutItem>,
  onSignOut: () => void,
) => (
  <>
    {[...menuItems, ...commonMenuItems].map((item) => (
      <MenuItemLink key={item.href} item={item} />
    ))}
    <DropdownMenuSeparator />
    <ThemeSwitcherMenuItem />
    <LocaleSwitcherMenuItem />
    <DropdownMenuSeparator />
    <MenuItemLink item={logoutItem} variant="destructive" onClick={onSignOut} />
  </>
);

const renderLoggedOutMenu = (
  pathname: string,
  authMenuItems: ReturnType<typeof getAuthMenuItems>,
  switchRoleItems: ReturnType<typeof getSwitchRoleItems>,
  t: ReturnType<typeof useTranslations>,
) => {
  const pathnameInfo = parsePathname(pathname);
  const pathnameWithoutLocale = pathnameInfo.pathnameWithoutLocale;
  const isOnHomePage = isHomePage(pathname);
  const switchRoleItem =
    pathnameWithoutLocale === "/"
      ? switchRoleItems.toTutor
      : switchRoleItems.toStudent;

  return (
    <>
      <DropdownMenuLabel className="px-0 text-gray-500 font-normal">
        {t("not_logged_in")}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {isOnHomePage && (
        <>
          <MenuItemLink item={switchRoleItem} />
          <DropdownMenuSeparator />
        </>
      )}
      {authMenuItems.map((item) => (
        <MenuItemLink key={item.href} item={item} />
      ))}
      {!isOnHomePage && <DropdownMenuSeparator />}
      <ThemeSwitcherMenuItem />
      <LocaleSwitcherMenuItem />
    </>
  );
};

export const HeaderComponent = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const { user, isLoggedIn, userRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems =
    userRole === "TUTOR" ? getTutorMenuItems(t) : getStudentMenuItems(t);
  const commonMenuItems = getCommonMenuItems(t);
  const authMenuItems = getAuthMenuItems(t);
  const logoutItem = getLogoutItem(t);
  const switchRoleItems = getSwitchRoleItems(t);

  return (
    <header
      className={cn(
        "relative z-10 w-full h-[80px] flex justify-center items-center",
        "bg-linear-to-b from-background to-foreground shadow-small",
      )}>
      <div className="flex justify-between max-w-[1240px] w-full px-4">
        <Logo />

        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <MenuTrigger isOpen={isMenuOpen} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={cn(
              "w-[225px] bg-foreground rounded-medium p-4",
              "text-right border-none shadow-double!",
            )}>
            {isLoggedIn && user && userRole ? (
              <>
                <UserInfo
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  role={userRole}
                />
                <DropdownMenuSeparator />
                {renderLoggedInMenu(
                  menuItems,
                  commonMenuItems,
                  logoutItem,
                  handleSignOut,
                )}
              </>
            ) : (
              renderLoggedOutMenu(pathname, authMenuItems, switchRoleItems, t)
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
