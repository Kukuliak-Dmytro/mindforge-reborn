import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/app/shared/components/containers/section";
import { Button } from "@/app/shared/components/ui/button";
import {
  BenefitCard,
  SubjectSnippet,
  StepCard,
} from "@/app/shared/components/cards";
import {
  getTutorHomeCategorySnippets,
  getTutorHomeSteps,
  getTutorHomeBenefits,
  getTutorHomeStats,
} from "./tutor-home.constants";
import { cn } from "@/app/shared/utils/utils";

export const TutorHomeModule = async () => {
  const t = await getTranslations();

  const categorySnippets = getTutorHomeCategorySnippets(t);
  const steps = getTutorHomeSteps(t);
  const benefits = getTutorHomeBenefits(t);
  const stats = getTutorHomeStats(t);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
          <div className="w-full lg:w-auto lg:mt-[-60px] lg:mb-[-60px] flex justify-center lg:justify-start order-2 lg:order-1">
            <Image
              src="/assets/images/hero-img-tutor.png"
              alt="Tutor"
              width={600}
              height={500}
              className="h-auto w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]"
            />
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-auto order-1 lg:order-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center lg:text-left">
              {t("tutor_home.hero_title")}
            </h1>
            <div className="flex flex-col gap-2 mb-4">
              {categorySnippets.map((category) => (
                <SubjectSnippet
                  key={category.icon}
                  title={category.title}
                  icon={category.icon}
                  variant={category.variant}
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
              <Button
                variant="primary"
                className="w-full sm:w-auto flex-1 sm:flex-none"
                href="/auth/signup">
                {t("tutor_home.hero_register")}
              </Button>
              <Button
                variant="secondary"
                className="w-full sm:w-auto flex-1 sm:flex-none"
                href="/tutor/orders">
                {t("tutor_home.hero_orders_catalog")}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[60px] text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("tutor_home.how_it_works_title")}
          </h1>
          <div className="flex flex-col gap-4 sm:gap-6">
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
            {t("tutor_home.benefits_title")}
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
            href="/tutor/orders">
            {t("tutor_home.benefits_orders_catalog")}
          </Button>
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[60px] text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {t("tutor_home.stats_title")}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  `flex flex-col sm:flex-row p-4 sm:p-6 bg-background rounded-medium items-center justify-center sm:justify-start shadow-md
                  w-full sm:w-auto sm:mx-auto`,
                )}>
                <div className="relative flex-shrink-0">
                  {stat.icon ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  ) : (
                    <>
                      <h1 className="text-5xl sm:text-6xl md:text-[72px] text-gray-700">
                        {stat.value}
                      </h1>
                      <h1
                        className={cn(
                          "text-5xl sm:text-6xl md:text-[72px] absolute left-[2px] sm:left-[3px] top-[-2px] sm:top-[-3px]",
                        )}>
                        {stat.value}
                      </h1>
                    </>
                  )}
                </div>
                <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                  <h4 className="text-base sm:text-lg text-center sm:text-right">
                    {stat.label}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section>
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6
            pb-4 sm:pb-6 md:pb-8 border-b-2 border-secondary-text">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center md:text-left">
            {t("tutor_home.cta_text")}
          </h2>
          <Button
            variant="primary"
            size="large"
            href="/auth/signup"
            className="w-full md:w-auto">
            {t("tutor_home.cta_register")}
          </Button>
        </div>
      </Section>
    </div>
  );
};
