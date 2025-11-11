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
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:mt-[-60px] lg:mb-[-60px]">
            <Image
              src="/assets/images/hero-img-tutor.png"
              alt="Tutor"
              width={600}
              height={500}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-center lg:text-left">
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
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button
                variant="primary"
                className="w-full! sm:w-auto"
                href="/auth/signup">
                {t("tutor_home.hero_register")}
              </Button>
              <Button
                variant="secondary"
                className="w-full! sm:w-auto"
                href="/tutor/orders">
                {t("tutor_home.hero_orders_catalog")}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <div className="flex flex-col gap-[60px] text-center">
          <h1>{t("tutor_home.how_it_works_title")}</h1>
          <div className="flex flex-col gap-6">
            {steps.map((stepData) => (
              <StepCard key={stepData.step} {...stepData} />
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>{t("tutor_home.benefits_title")}</h1>

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
            className="w-full max-w-[500px]"
            href="/tutor/orders">
            {t("tutor_home.benefits_orders_catalog")}
          </Button>
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="grid gap-[60px] text-center">
          <h1>{t("tutor_home.stats_title")}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  `flex p-6 bg-background rounded-medium items-center shadow-md
                  mx-auto w-auto`,
                )}>
                <div className="relative">
                  {stat.icon ? (
                    stat.icon
                  ) : (
                    <>
                      <h1 className="text-[72px]! text-gray-700">
                        {stat.value}
                      </h1>
                      <h1
                        className={cn(
                          "text-[72px]! absolute left-[3px] top-[-3px]",
                        )}>
                        {stat.value}
                      </h1>
                    </>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-right">{stat.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section>
        <div
          className="flex items-center justify-between pb-8 border-b-2
            border-secondary-text">
          <h2>{t("tutor_home.cta_text")}</h2>
          <Button variant="primary" size="large" href="/auth/signup">
            {t("tutor_home.cta_register")}
          </Button>
        </div>
      </Section>
    </div>
  );
};
