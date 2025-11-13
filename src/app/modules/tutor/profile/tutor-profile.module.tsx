"use client";

import { Suspense } from "react";
import { Section } from "@/app/shared/components/containers/section";
import { useSuspenseQuery } from "@tanstack/react-query";
import { tutorProfileQueryOptions } from "@/app/entities/api/tutor-profile";
import {
  AvatarSection,
  AvatarSectionSkeleton,
} from "./elements/avatar-section";
import {
  ProfileFormSection,
  ProfileFormSectionSkeleton,
} from "./elements/profile-form-section";
import { EducationSection } from "./elements/education-section";
import { ExperienceSection } from "./elements/experience-section";

//component
/**
 * Main profile content component that uses Suspense Query.
 */
const TutorProfileContent = () => {
  const { data: profile, isFetching } = useSuspenseQuery(
    tutorProfileQueryOptions(),
  );

  if (!profile || !profile.user) {
    return (
      <Section title="Мій профіль">
        <div className="text-center py-8">
          <p className="text-red-500">Помилка завантаження профілю</p>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Мій профіль" className="flex flex-col gap-[60px]">
      <div className="flex gap-[60px]">
        <AvatarSection
          avatarUrl={profile.user?.avatarUrl ?? null}
          isUpdating={isFetching}
        />
        <ProfileFormSection profile={profile} />
      </div>
      <div className="flex flex-col gap-6">
        <EducationSection education={profile.education} />
        <ExperienceSection experiences={profile.experiences} />
      </div>
    </Section>
  );
};

//component
/**
 * TutorProfileModule component with Suspense boundaries for streaming.
 * Uses progressive streaming to render sections as data becomes available.
 */
export const TutorProfileModule = () => {
  return (
    <Suspense
      fallback={
        <Section title="Мій профіль">
          <div className="flex gap-[60px]">
            <AvatarSectionSkeleton />
            <ProfileFormSectionSkeleton />
          </div>
        </Section>
      }>
      <TutorProfileContent />
    </Suspense>
  );
};
