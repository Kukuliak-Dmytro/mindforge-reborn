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
        <div className="flex flex-col lg:flex-row items-start relative">
          <div className="flex flex-col gap-4 lg:max-w-[50%]">
            <h1>
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

            <div className="flex gap-4 justify-between">
              <Button variant="primary" href="/catalog">
                {t("student_home.hero_find_specialist")}
              </Button>
              <Button variant="secondary" href="/orders/create">
                {t("student_home.hero_place_order")}
              </Button>
            </div>
          </div>

          <div className="hidden lg:block lg:absolute lg:right-0 lg:-top-[60px]">
            <Image
              src="/assets/images/hero-img-student.png"
              alt="Hero image"
              width={500}
              height={600}
              className="h-auto"
            />
          </div>
        </div>
      </Section>

      {/* Subjects Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>{t("student_home.subjects_title")}</h1>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
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
            className="w-[300px]"
            href="/catalog">
            {t("student_home.subjects_go")}
          </Button>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>{t("student_home.how_it_works_title")}</h1>

          <div className="flex flex-col gap-6 w-full">
            {steps.map((stepData) => (
              <StepCard key={stepData.step} {...stepData} />
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>{t("student_home.benefits_title")}</h1>

          <div className="flex flex-wrap justify-center gap-8">
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
            className="w-[500px]"
            href="/orders/create">
            {t("student_home.benefits_create_order")}
          </Button>
        </div>
      </Section>

      {/* Top Specialists Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>{t("student_home.top_specialists_title")}</h1>

          <div className="flex justify-center gap-6">
            {topSpecialists.map((specialist) => (
              <BestEmployeeCard
                key={specialist.name}
                name={specialist.name}
                workingSince={specialist.workingSince}
                rating={specialist.rating}
                description={specialist.description}
                avatarId={specialist.avatarId}
              />
            ))}
          </div>

          <Button variant="primary" size="large" className="w-[500px]">
            {t("student_home.top_specialists_catalog")}
          </Button>
        </div>
      </Section>

      {/* Reviews Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>{t("student_home.reviews_title")}</h1>

          <div className="flex justify-center gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                name={testimonial.name}
                rating={testimonial.rating}
                subject={testimonial.subject}
                description={testimonial.description}
                author={testimonial.author}
                avatarId={testimonial.avatarId}
              />
            ))}
          </div>

          <Button variant="primary" size="large" className="w-[350px]">
            {t("student_home.reviews_catalog")}
          </Button>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section>
        <div
          className="flex flex-col md:flex-row justify-between items-center
            border-b-2 border-secondary-text py-6">
          <h2>{t("student_home.cta_text")}</h2>
          <Button variant="primary" size="large" href="/orders/create">
            {t("student_home.cta_create_order")}
          </Button>
        </div>
      </Section>
    </div>
  );
};
