import React from "react";
import type {
  IBenefitCardProps,
  IStepCardProps,
  ISubjectSnippetProps,
} from "@/app/shared/components/cards";
import { FlagIcon } from "@/app/shared/assets/icons";

//interface
/** Stats data for tutor home page. */
export interface IStatsData {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

//type
/** Translation function type for tutor home module. */
type TutorHomeTranslations = {
  (key: string): string;
};

//function
/** Returns Ukrainian flag icon component. */
const getUkraineFlagIcon = () =>
  React.createElement(FlagIcon, { code: "uk", size: 72 });

//function
/** Returns localized category snippets data. */
export const getTutorHomeCategorySnippets = (
  t: TutorHomeTranslations,
): ISubjectSnippetProps[] => [
  {
    title: t("tutor_home.category_snippets.tutoring"),
    icon: "tutoring",
    variant: "Inverse",
  },
  {
    title: t("tutor_home.category_snippets.homework"),
    icon: "homework",
    variant: "Inverse",
  },
  {
    title: t("tutor_home.category_snippets.exam"),
    icon: "exam",
    variant: "Inverse",
  },
  {
    title: t("tutor_home.category_snippets.complex"),
    icon: "complex",
    variant: "Inverse",
  },
  {
    title: t("tutor_home.category_snippets.diploma"),
    icon: "diploma",
    variant: "Inverse",
  },
];

//function
/** Returns localized steps data. */
export const getTutorHomeSteps = (
  t: TutorHomeTranslations,
): IStepCardProps[] => [
  {
    step: 6,
    title: t("tutor_home.steps.step1_title"),
    content: t("tutor_home.steps.step1_content"),
  },
  {
    step: 7,
    title: t("tutor_home.steps.step2_title"),
    content: t("tutor_home.steps.step2_content"),
  },
  {
    step: 8,
    title: t("tutor_home.steps.step3_title"),
    content: t("tutor_home.steps.step3_content"),
  },
];

//function
/** Returns localized benefits data. */
export const getTutorHomeBenefits = (
  t: TutorHomeTranslations,
): IBenefitCardProps[] => [
  {
    title: t("tutor_home.benefits.fast"),
    imgSrc: "/assets/images/benefit-img-01.png",
    color: "primary",
  },
  {
    title: t("tutor_home.benefits.simple"),
    imgSrc: "/assets/images/benefit-img-02.png",
    color: "secondary",
  },
  {
    title: t("tutor_home.benefits.effective"),
    imgSrc: "/assets/images/benefit-img-03.png",
    color: "accent",
  },
];

//function
/** Returns localized stats data. */
export const getTutorHomeStats = (t: TutorHomeTranslations): IStatsData[] => [
  {
    value: "1032",
    label: t("tutor_home.stats.active_specialists"),
  },
  {
    value: "123",
    label: t("tutor_home.stats.new_orders_daily"),
  },
  {
    value: "",
    label: t("tutor_home.stats.specialists_all_regions"),
    icon: getUkraineFlagIcon(),
  },
  {
    value: "13423",
    label: t("tutor_home.stats.completed_orders"),
  },
];
