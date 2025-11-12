import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/app/shared/components/containers/section";
import { Button } from "@/app/shared/components/ui/button";
import {
  BenefitCard,
  SubjectSnippet,
  StepCard,
} from "@/app/shared/components/cards";
import { BestEmployeeCard, TestimonialCard, SubjectCard } from "./elements";
import {
  getStudentHomeSubjects,
  getStudentHomeCategorySnippets,
  getStudentHomeSteps,
  getStudentHomeBenefits,
  getStudentHomeTopSpecialists,
  getStudentHomeTestimonials,
} from "./student-home.constants";

export const StudentHomeModule = async () => {
  const t = await getTranslations();

  const subjects = getStudentHomeSubjects(t);
  const categorySnippets = getStudentHomeCategorySnippets(t);
  const steps = getStudentHomeSteps(t);
  const benefits = getStudentHomeBenefits(t);
  const topSpecialists = getStudentHomeTopSpecialists(t);
  const testimonials = getStudentHomeTestimonials(t);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section>
        <div className="flex flex-col lg:flex-row items-start relative gap-6 lg:gap-0">
          <div className="flex flex-col gap-4 lg:max-w-[50%] w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-secondary">Mind</span>
              <span className="text-primary">Forge</span>
              <br />
              {t("student_home.hero_tagline")}
            </h1>

            <div className="flex flex-col gap-2 mb-4">
              {categorySnippets.map((category) => (
                <SubjectSnippet
                  key={category.icon}
                  title={category.title}
                  icon={category.icon}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                href="/catalog"
                className="w-full sm:w-auto flex-1 sm:flex-none">
                {t("student_home.hero_find_specialist")}
              </Button>
              <Button
                variant="secondary"
                href="/orders/create"
                className="w-full sm:w-auto flex-1 sm:flex-none">
                {t("student_home.hero_place_order")}
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:absolute lg:right-0 lg:-top-[60px] flex justify-center lg:justify-end">
            <Image
              src="/assets/images/hero-img-student.png"
              alt="Hero image"
              width={500}
              height={600}
              className="h-auto w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]"
            />
          </div>
        </div>
      </Section>

      {/* Subjects Section */}
      <Section>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("student_home.subjects_title")}
          </h1>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6
              w-full">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.code}
                title={subject.title}
                link={subject.link}
                code={subject.code}
              />
            ))}
          </div>

          <Button
            variant="primary"
            size="large"
            className="w-full sm:w-[300px]"
            href="/catalog">
            {t("student_home.subjects_go")}
          </Button>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("student_home.how_it_works_title")}
          </h1>

          <div className="flex flex-col gap-4 sm:gap-6 w-full">
            {steps.map((stepData) => (
              <StepCard key={stepData.step} {...stepData} />
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("student_home.benefits_title")}
          </h1>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 w-full">
            {benefits.map((benefit) => (
              <BenefitCard
                key={benefit.title}
                title={benefit.title}
                imgSrc={benefit.imgSrc}
                color={benefit.color}
              />
            ))}
          </div>

          <Button
            variant="primary"
            size="large"
            className="w-full sm:w-[400px] md:w-[500px]"
            href="/orders/create">
            {t("student_home.benefits_create_order")}
          </Button>
        </div>
      </Section>

      {/* Top Specialists Section */}
      <Section>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("student_home.top_specialists_title")}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
            {topSpecialists.map((specialist) => (
              <div
                key={specialist.name}
                className="flex-shrink-0 w-full sm:w-auto sm:flex-1 max-w-[300px] sm:max-w-none mx-auto sm:mx-0">
                <BestEmployeeCard
                  name={specialist.name}
                  workingSince={specialist.workingSince}
                  rating={specialist.rating}
                  description={specialist.description}
                  avatarId={specialist.avatarId}
                />
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            size="large"
            className="w-full sm:w-[400px] md:w-[500px]">
            {t("student_home.top_specialists_catalog")}
          </Button>
        </div>
      </Section>

      {/* Reviews Section */}
      <Section>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("student_home.reviews_title")}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex-shrink-0 w-full sm:w-auto sm:flex-1 max-w-[400px] sm:max-w-none mx-auto sm:mx-0">
                <TestimonialCard
                  name={testimonial.name}
                  rating={testimonial.rating}
                  subject={testimonial.subject}
                  description={testimonial.description}
                  author={testimonial.author}
                  avatarId={testimonial.avatarId}
                />
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            size="large"
            className="w-full sm:w-[300px] md:w-[350px]">
            {t("student_home.reviews_catalog")}
          </Button>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section>
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6
            border-b-2 border-secondary-text py-4 sm:py-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center md:text-left">
            {t("student_home.cta_text")}
          </h2>
          <Button
            variant="primary"
            size="large"
            href="/orders/create"
            className="w-full md:w-auto">
            {t("student_home.cta_create_order")}
          </Button>
        </div>
      </Section>
    </div>
  );
};
