import Image from "next/image";
import { Section } from "@/app/shared/components/containers/section";
import { Button } from "@/app/shared/components/ui/button";
import {
  BenefitCard,
  SubjectSnippet,
  StepCard,
} from "@/app/shared/components/cards";
import {
  TUTOR_HOME_CATEGORY_SNIPPETS,
  TUTOR_HOME_STEPS,
  TUTOR_HOME_BENEFITS,
  TUTOR_HOME_STATS,
} from "./tutor-home.constants";
import { cn } from "@/app/shared/utils/utils";

export const TutorHomeModule = () => {
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
            <h1 className="text-center lg:text-left">Почни заробляти зараз</h1>
            <div className="flex flex-col gap-2 mb-4">
              {TUTOR_HOME_CATEGORY_SNIPPETS.map((category) => (
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
                className="!w-full sm:w-auto"
                href="/auth/signup">
                Зареєструватися
              </Button>
              <Button
                variant="secondary"
                className="!w-full sm:w-auto"
                href="/tutor/orders">
                Каталог замовлень
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <div className="flex flex-col gap-[60px] text-center">
          <h1>Як це працює:</h1>
          <div className="flex flex-col gap-6">
            {TUTOR_HOME_STEPS.map((stepData) => (
              <StepCard key={stepData.step} {...stepData} />
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>З нашим сервісом знаходити клієнтів</h1>

          <div className="flex flex-wrap justify-center gap-8">
            {TUTOR_HOME_BENEFITS.map((benefit) => (
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
            Каталог замовлень
          </Button>
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="grid gap-[60px] text-center">
          <h1>Доєднуйся до команди MindForge</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TUTOR_HOME_STATS.map((stat, index) => (
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
                      <h1 className="!text-[72px] text-gray-700">
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
          <h2>Допоможи людям кувати знання!</h2>
          <Button variant="primary" size="large" href="/auth/signup">
            Реєстрація
          </Button>
        </div>
      </Section>
    </div>
  );
};
