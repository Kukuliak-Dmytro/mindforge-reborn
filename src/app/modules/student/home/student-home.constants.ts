import type {
  IBenefitCardProps,
  IStepCardProps,
  ISubjectSnippetProps,
} from "@/app/shared/components/cards";
import type {
  IBestEmployeeCardProps,
  ISubjectCardProps,
  ITestimonialCardProps,
} from "./elements";

//constant
/** Base catalog link for subject filtering. */
const CATALOG_BASE_LINK = "/catalog";

//type
/** Translation function type for student home module. */
type StudentHomeTranslations = {
  (key: string): string;
};

//function
/** Returns localized subjects data. */
export const getStudentHomeSubjects = (
  t: StudentHomeTranslations,
): ISubjectCardProps[] => [
  {
    title: t("student_home.subjects.mathematics"),
    code: "mathematics",
    link: CATALOG_BASE_LINK,
  },
  {
    title: t("student_home.subjects.ukrainian"),
    code: "ukrainian",
    link: CATALOG_BASE_LINK,
  },
  {
    title: t("student_home.subjects.english"),
    code: "english",
    link: CATALOG_BASE_LINK,
  },
  {
    title: t("student_home.subjects.biology"),
    code: "biology",
    link: CATALOG_BASE_LINK,
  },
  {
    title: t("student_home.subjects.geography"),
    code: "geography",
    link: CATALOG_BASE_LINK,
  },
  {
    title: t("student_home.subjects.physics"),
    code: "physics",
    link: CATALOG_BASE_LINK,
  },
  {
    title: t("student_home.subjects.chemistry"),
    code: "chemistry",
    link: CATALOG_BASE_LINK,
  },
  {
    title: t("student_home.subjects.history"),
    code: "history",
    link: CATALOG_BASE_LINK,
  },
  {
    title: t("student_home.subjects.informatics"),
    code: "informatics",
    link: CATALOG_BASE_LINK,
  },
];

//function
/** Returns localized category snippets data. */
export const getStudentHomeCategorySnippets = (
  t: StudentHomeTranslations,
): ISubjectSnippetProps[] => [
  {
    title: t("student_home.category_snippets.tutoring"),
    icon: "tutoring",
  },
  {
    title: t("student_home.category_snippets.homework"),
    icon: "homework",
  },
  {
    title: t("student_home.category_snippets.exam"),
    icon: "exam",
  },
  {
    title: t("student_home.category_snippets.complex"),
    icon: "complex",
  },
  {
    title: t("student_home.category_snippets.diploma"),
    icon: "diploma",
  },
];

//function
/** Returns localized steps data. */
export const getStudentHomeSteps = (
  t: StudentHomeTranslations,
): IStepCardProps[] => [
  {
    step: 1,
    title: t("student_home.steps.step1_title"),
    content: t("student_home.steps.step1_content"),
  },
  {
    step: 2,
    title: t("student_home.steps.step2_title"),
    content: t("student_home.steps.step2_content"),
  },
  {
    step: 3,
    title: t("student_home.steps.step3_title"),
    content: t("student_home.steps.step3_content"),
  },
  {
    step: 4,
    title: t("student_home.steps.step4_title"),
    content: t("student_home.steps.step4_content"),
  },
  {
    step: 5,
    title: t("student_home.steps.step5_title"),
    content: t("student_home.steps.step5_content"),
  },
];

//function
/** Returns localized benefits data. */
export const getStudentHomeBenefits = (
  t: StudentHomeTranslations,
): IBenefitCardProps[] => [
  {
    title: t("student_home.benefits.fast"),
    imgSrc: "/assets/images/benefit-img-01.png",
    color: "primary",
  },
  {
    title: t("student_home.benefits.simple"),
    imgSrc: "/assets/images/benefit-img-02.png",
    color: "secondary",
  },
  {
    title: t("student_home.benefits.effective"),
    imgSrc: "/assets/images/benefit-img-03.png",
    color: "accent",
  },
];

//function
/** Returns localized top specialists data. */
export const getStudentHomeTopSpecialists = (
  t: StudentHomeTranslations,
): IBestEmployeeCardProps[] => [
  {
    name: t("student_home.top_specialists.specialist1_name"),
    workingSince: "14.01.22",
    rating: "4.9/5",
    description: t("student_home.top_specialists.specialist1_description"),
    avatarId: 1,
  },
  {
    name: t("student_home.top_specialists.specialist2_name"),
    workingSince: "12.12.21",
    rating: "4.4/5.0",
    description: t("student_home.top_specialists.specialist2_description"),
    avatarId: 2,
  },
  {
    name: t("student_home.top_specialists.specialist3_name"),
    workingSince: "01.01.24",
    rating: "4.7/5",
    description: t("student_home.top_specialists.specialist3_description"),
    avatarId: 3,
  },
];

//function
/** Returns localized testimonials data. */
export const getStudentHomeTestimonials = (
  t: StudentHomeTranslations,
): ITestimonialCardProps[] => [
  {
    name: t("student_home.reviews.review1_name"),
    rating: "5/5",
    subject: t("student_home.reviews.review1_subject"),
    description: t("student_home.reviews.review1_description"),
    author: t("student_home.reviews.review1_author"),
    avatarId: 4,
  },
  {
    name: t("student_home.reviews.review2_name"),
    rating: "4.8/5",
    subject: t("student_home.reviews.review2_subject"),
    description: t("student_home.reviews.review2_description"),
    author: t("student_home.reviews.review2_author"),
    avatarId: 5,
  },
  {
    name: t("student_home.reviews.review3_name"),
    rating: "4.9/5",
    subject: t("student_home.reviews.review3_subject"),
    description: t("student_home.reviews.review3_description"),
    author: t("student_home.reviews.review3_author"),
    avatarId: 6,
  },
];
