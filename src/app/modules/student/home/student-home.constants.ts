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

//constant
/** Available subjects on student home page. SubjectCard adds query params automatically. */
export const STUDENT_HOME_SUBJECTS: ISubjectCardProps[] = [
  {
    title: "Математика",
    code: "mathematics",
    link: CATALOG_BASE_LINK,
  },
  {
    title: "Українська мова",
    code: "ukrainian",
    link: CATALOG_BASE_LINK,
  },
  {
    title: "Англійська мова",
    code: "english",
    link: CATALOG_BASE_LINK,
  },
  {
    title: "Біологія",
    code: "biology",
    link: CATALOG_BASE_LINK,
  },
  {
    title: "Географія",
    code: "geography",
    link: CATALOG_BASE_LINK,
  },
  {
    title: "Фізика",
    code: "physics",
    link: CATALOG_BASE_LINK,
  },
  {
    title: "Хімія",
    code: "chemistry",
    link: CATALOG_BASE_LINK,
  },
  {
    title: "Історія",
    code: "history",
    link: CATALOG_BASE_LINK,
  },
  {
    title: "Інформатика",
    code: "informatics",
    link: CATALOG_BASE_LINK,
  },
];

//constant
/** Category snippets for home page hero section. */
export const STUDENT_HOME_CATEGORY_SNIPPETS: ISubjectSnippetProps[] = [
  {
    title: "Репетиторство",
    icon: "tutoring",
  },
  {
    title: "Домашні роботи",
    icon: "homework",
  },
  {
    title: "Контрольні роботи",
    icon: "exam",
  },
  {
    title: "Комплексні теми",
    icon: "complex",
  },
  {
    title: "Дипломні роботи",
    icon: "diploma",
  },
];

//constant
/** Steps for "How It Works" section. */
export const STUDENT_HOME_STEPS: IStepCardProps[] = [
  {
    step: 1,
    title: "Створюй замовлення",
    content:
      "Реєструйся, заповнюй мінімальні дані про себе. Далі - все, що стосується замовлення",
  },
  {
    step: 2,
    title: "Обирай фахівця",
    content:
      "Необхідного фахівця можна вибрати з каталогу, або ж дочекатися, поки не напишуть і запропонують виконання замовлення",
  },
  {
    step: 3,
    title: "Домовляйся про терміни та ціну",
    content:
      "Важливо узгодити терміни виконання та ціну замовлення на самому початку, аби потім не виникало складних ситуацій",
  },
  {
    step: 4,
    title: "Чекай на виконання",
    content: "Прояви терпіння!",
  },
  {
    step: 5,
    title: "Повтори все ще раз",
    content:
      "Дякуюємо, що ви скористалися нашим сервісом! Будемо чекати наступного разу!",
  },
];

//constant
/** Benefits displayed on home page. */
export const STUDENT_HOME_BENEFITS: IBenefitCardProps[] = [
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

//constant
/** Top specialists displayed on home page. */
export const STUDENT_HOME_TOP_SPECIALISTS: IBestEmployeeCardProps[] = [
  {
    name: "Смирнова Марія",
    workingSince: "14.01.22",
    rating: "4.9/5",
    description:
      "Я підходжу до кожного студента з урахуванням його рівня знань та навчальних потреб, створюючи персоналізовані програми, щоб допомогти досягти найкращих результатів.",
    avatarId: 1,
  },
  {
    name: "Іваненко Олександр",
    workingSince: "12.12.21",
    rating: "4.4/5.0",
    description:
      "Маю глибокі знання та практичний досвід у своїй сфері, що дозволяє мені не лише викладати теорію, а й передавати студентам цінні практичні навички",
    avatarId: 2,
  },
  {
    name: "Коваль Вероніка",
    workingSince: "01.01.24",
    rating: "4.7/5",
    description:
      "Я професійно допомагаю студентам на всіх етапах написання дипломних робіт: від вибору теми та планування до написання та оформлення роботи відповідно до вимог ВНЗ.",
    avatarId: 3,
  },
];

//constant
/** Testimonials displayed on home page. */
export const STUDENT_HOME_TESTIMONIALS: ITestimonialCardProps[] = [
  {
    name: "Куцик Оксана",
    rating: "5/5",
    subject: "Математика",
    description:
      "Відмінний викладач, дуже допоміг!Дуже задоволений роботою з Оксаною! Уроки були зрозумілими, а матеріал поданий цікаво та структуровано.",
    author: "Таня",
    avatarId: 4,
  },
  {
    name: "Подолов Артем",
    rating: "4.8/5",
    subject: "Фізика",
    description:
      "Фахівець професійно та відповідально підходить до занять. Артем допоміг мені розібратися зі складними темами та підготуватися до іспитів.",
    author: "Микола",
    avatarId: 5,
  },
  {
    name: "Хартій Ангеліна",
    rating: "4.9/5",
    subject: "Хімія",
    description:
      "Дипломна робота пані Ангеліни перевершила всі мої очікування! Незважаючи на те, що текст дуж епосто розуміти, він вийшов надзвичайно професійним! Рекомендую!",
    author: "Анастатія",
    avatarId: 6,
  },
];
