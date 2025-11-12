export interface IMenuItem {
  label: string;
  href: string;
  icon: string;
  roles?: ("TUTOR" | "STUDENT")[];
}

type HeaderTranslations = {
  (key: string): string;
};

export const getTutorMenuItems = (t: HeaderTranslations): IMenuItem[] => [
  {
    label: t("profile"),
    href: "/tutor/profile",
    icon: "mdi:account",
  },
  {
    label: t("my_subjects"),
    href: "/tutor/profile/subjects",
    icon: "mdi:book-open-variant",
  },
  {
    label: t("schedule"),
    href: "/tutor/schedule",
    icon: "mdi:calendar",
  },
  {
    label: t("my_students"),
    href: "/tutor/students",
    icon: "mdi:account-group",
  },
  {
    label: t("saved_orders"),
    href: "/tutor/saved",
    icon: "mdi:bookmark",
  },
];

export const getStudentMenuItems = (t: HeaderTranslations): IMenuItem[] => [
  {
    label: t("profile"),
    href: "/profile",
    icon: "mdi:account",
  },
  {
    label: t("saved"),
    href: "/saved",
    icon: "mdi:bookmark-outline",
  },
  {
    label: t("my_classes"),
    href: "/orders",
    icon: "mdi:school",
  },
];

export const getCommonMenuItems = (t: HeaderTranslations): IMenuItem[] => [
  {
    label: t("messages"),
    href: "/messages",
    icon: "mdi:message-text",
  },
];

export const getAuthMenuItems = (t: HeaderTranslations): IMenuItem[] => [
  {
    label: t("login"),
    href: "/login",
    icon: "mdi:login",
  },
  {
    label: t("register"),
    href: "/register",
    icon: "mdi:account-plus",
  },
];

export const getLogoutItem = (t: HeaderTranslations): IMenuItem => ({
  label: t("logout"),
  href: "#",
  icon: "mdi:logout",
});

export const getSwitchRoleItems = (t: HeaderTranslations) => ({
  toTutor: {
    label: t("switch_to_tutor"),
    href: "/tutor",
    icon: "mdi:briefcase-outline",
  },
  toStudent: {
    label: t("switch_to_student"),
    href: "/",
    icon: "mdi:school-outline",
  },
});
