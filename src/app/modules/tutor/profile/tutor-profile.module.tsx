"use client";

import { Section } from "@/app/shared/components/containers/section";
import { useQuery } from "@tanstack/react-query";
import { tutorProfileQueryOptions } from "@/app/entities/api/tutor-profile";
import {
  AvatarSection,
  AvatarSectionSkeleton,
} from "./elements/avatar-section";
import {
  ProfileFormSection,
  ProfileFormSectionSkeleton,
} from "./elements/profile-form-section";

export const TutorProfileModule = () => {
  const {
    data: profile,
    isLoading,
    isFetching,
  } = useQuery(tutorProfileQueryOptions());

  if (isLoading) {
    return (
      <Section title="Мій профіль">
        <div className="flex gap-[60px]">
          <AvatarSectionSkeleton />
          <ProfileFormSectionSkeleton />
        </div>
      </Section>
    );
  }

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
      {/* <div className="flex gap-[60px]"> */}
      {/* <AvatarSectionSkeleton />
        <ProfileFormSectionSkeleton /> */}
      {/* </div> */}
      {/* <EducationSection education={profile.education} /> */}
      {/* <ExperienceSection experiences={profile.experiences} /> */}
    </Section>
  );
};
