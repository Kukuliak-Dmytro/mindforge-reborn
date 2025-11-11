import Image from "next/image";
import { Section } from "@/app/shared/components/containers/section";
import { Button } from "@/app/shared/components/ui/button";
import {
  BenefitCard,
  SubjectSnippet,
  StepCard,
} from "@/app/shared/components/cards";
import { BestEmployeeCard, TestimonialCard, SubjectCard } from "./elements";
import {
  STUDENT_HOME_SUBJECTS,
  STUDENT_HOME_CATEGORY_SNIPPETS,
  STUDENT_HOME_STEPS,
  STUDENT_HOME_BENEFITS,
  STUDENT_HOME_TOP_SPECIALISTS,
  STUDENT_HOME_TESTIMONIALS,
} from "./student-home.constants";

export const StudentHomeModule = () => {
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
              Кузня твого розуму
            </h1>

            <div className="flex flex-col gap-2 mb-4">
              {STUDENT_HOME_CATEGORY_SNIPPETS.map((category) => (
                <SubjectSnippet
                  key={category.icon}
                  title={category.title}
                  icon={category.icon}
                />
              ))}
            </div>

            <div className="flex gap-4 justify-between">
              <Button variant="primary" href="/catalog">
                Знайти фахівця
              </Button>
              <Button variant="secondary" href="/orders/create">
                Розмістити замовлення
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
          <h1>Доступні предмети на сайті:</h1>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
              w-full">
            {STUDENT_HOME_SUBJECTS.map((subject) => (
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
            Перейти
          </Button>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>Як це працює:</h1>

          <div className="flex flex-col gap-6 w-full">
            {STUDENT_HOME_STEPS.map((stepData) => (
              <StepCard key={stepData.step} {...stepData} />
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>MindForge - це...</h1>

          <div className="flex flex-wrap justify-center gap-8">
            {STUDENT_HOME_BENEFITS.map((benefit) => (
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
            Створити замовлення
          </Button>
        </div>
      </Section>

      {/* Top Specialists Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>Наші ТОП-фахівці</h1>

          <div className="flex justify-center gap-6">
            {STUDENT_HOME_TOP_SPECIALISTS.map((specialist) => (
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
            Каталог фахівців
          </Button>
        </div>
      </Section>

      {/* Reviews Section */}
      <Section>
        <div className="flex flex-col gap-12 items-center text-center">
          <h1>Відгуки про наших фахівців</h1>

          <div className="flex justify-center gap-6">
            {STUDENT_HOME_TESTIMONIALS.map((testimonial) => (
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
            Каталог фахівців
          </Button>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section>
        <div
          className="flex flex-col md:flex-row justify-between items-center
            border-b-2 border-secondary-text py-6">
          <h2>Куй знання, змінюй майбутнє</h2>
          <Button variant="primary" size="large" href="/orders/create">
            Створити замовлення
          </Button>
        </div>
      </Section>
    </div>
  );
};
