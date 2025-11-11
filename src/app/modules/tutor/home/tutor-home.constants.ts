import React from "react";
import type {
  IBenefitCardProps,
  IStepCardProps,
  ISubjectSnippetProps,
} from "@/app/shared/components/cards";
import { FlagIcon } from "@/app/shared/assets/icons";

//constant
/** Category snippets for tutor home page hero section. */
export const TUTOR_HOME_CATEGORY_SNIPPETS: ISubjectSnippetProps[] = [
  {
    title: "Репетиторство",
    icon: "tutoring",
    variant: "Inverse",
  },
  {
    title: "Домашні роботи",
    icon: "homework",
    variant: "Inverse",
  },
  {
    title: "Контрольні роботи",
    icon: "exam",
    variant: "Inverse",
  },
  {
    title: "Комплексні теми",
    icon: "complex",
    variant: "Inverse",
  },
  {
    title: "Дипломні роботи",
    icon: "diploma",
    variant: "Inverse",
  },
];

//constant
/** Steps for "How It Works" section. */
export const TUTOR_HOME_STEPS: IStepCardProps[] = [
  {
    step: 6,
    title: "Створюйте акаунт",
    content:
      "Вкажіть всю релевантну інформацію про себе. Особливо важливо додати освіту та сертифікати",
  },
  {
    step: 7,
    title: "Розміщуйте профіль",
    content:
      "Дані про вас будуть відображені при пошуку на нашму сайті. Тому важливо, щоб профіль був привабливим для замовника",
  },
  {
    step: 8,
    title: "Пропонуйте свої послуги",
    content:
      "Шукайте підходяще замовлення в каталозі, і запропонуйте виконання. Якщо клієнт погодиться - ось і ваше замолвення!",
  },
];

//constant
/** Benefits displayed on tutor home page. */
export const TUTOR_HOME_BENEFITS: IBenefitCardProps[] = [
  {
    title: "Швидко",
    imgSrc: "/assets/images/benefit-img-01.png",
    color: "primary",
  },
  {
    title: "Просто",
    imgSrc: "/assets/images/benefit-img-02.png",
    color: "secondary",
  },
  {
    title: "Ефективно",
    imgSrc: "/assets/images/benefit-img-03.png",
    color: "accent",
  },
];

//interface
/** Stats data for tutor home page. */
export interface IStatsData {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

//function
/** Returns Ukrainian flag icon component. */
const getUkraineFlagIcon = () =>
  React.createElement(FlagIcon, { code: "uk", size: 72 });

//constant
/** Stats displayed on tutor home page. */
export const TUTOR_HOME_STATS: IStatsData[] = [
  {
    value: "1032",
    label: "Активних фахівців на Sapione",
  },
  {
    value: "123",
    label: "Нових замовлень щоденно",
  },
  {
    value: "",
    label: "Спеціалісти з усіх областей України",
    icon: getUkraineFlagIcon(),
  },
  {
    value: "13423",
    label: "Виконаних замовлень",
  },
];
