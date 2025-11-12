"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Section } from "@/app/shared/components/containers/section";
import { Button } from "@/app/shared/components/ui/button";
import { InputText } from "@/app/shared/components/ui/input-text";
import { Textarea } from "@/app/shared/components/ui/textarea";
import { Separator } from "@/app/shared/components/ui/separator";
import { Loading } from "@/app/modules/shared/loading";
import { useQuery } from "@tanstack/react-query";
import { tutorProfileQueryOptions } from "@/app/entities/api/tutor-profile";
import { AvatarSection } from "./components/avatar-section";
import { useUpdateTutorProfile } from "@/app/entities/api/tutor-profile";
import {
  createTutorProfileSchema,
  type ITutorProfileFormData,
} from "./tutor-profile.schema";

export const TutorProfileModule = () => {
  const t = useTranslations();
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: profile,
    isLoading,
    isFetching,
  } = useQuery(tutorProfileQueryOptions());
  const updateProfile = useUpdateTutorProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<ITutorProfileFormData>({
    resolver: zodResolver(createTutorProfileSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      phone: "",
    },
  });

  // Reset form when profile loads or when exiting edit mode
  useEffect(() => {
    if (profile?.user && !isEditing) {
      reset({
        firstName: profile.user.firstName,
        lastName: profile.user.lastName,
        email: profile.user.email,
        bio: profile.user.bio!,
        phone: profile.user.phone!,
      });
    }
  }, [profile, isEditing, reset]);

  const onSubmit = (data: ITutorProfileFormData) => {
    if (!profile) return;

    updateProfile.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        bio: data.bio,
        phone: data.phone,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error) => {
          console.error("Error updating profile:", error);
        },
      },
    );
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const sharedFieldStyles = "w-full bg-white-bg shadow-small rounded-medium";

  if (isLoading) {
    return (
      <Section title="Мій профіль">
        <Loading />
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
    <Section title="Мій профіль">
      <div className="flex gap-[60px]">
        <AvatarSection
          avatarUrl={profile.user?.avatarUrl ?? null}
          isUpdating={isFetching || updateProfile.isPending}
        />
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <InputText
                  {...register("firstName")}
                  id="firstName"
                  title="Ім'я"
                  placeholder="Ваше ім'я"
                  className={sharedFieldStyles}
                  readOnly={!isEditing}
                  error={errors.firstName?.message}
                />
                <InputText
                  {...register("lastName")}
                  id="lastName"
                  title="Прізвище"
                  placeholder="Ваше прізвище"
                  className={sharedFieldStyles}
                  readOnly={!isEditing}
                  error={errors.lastName?.message}
                />
                <InputText
                  {...register("phone")}
                  id="phone"
                  title="Телефон"
                  placeholder="Ваш телефон"
                  type="tel"
                  className={sharedFieldStyles}
                  readOnly={!isEditing}
                  error={errors.phone?.message}
                />
                <InputText
                  {...register("email")}
                  id="email"
                  title="Email"
                  placeholder="Ваш Email"
                  type="email"
                  className={sharedFieldStyles}
                  readOnly={!isEditing}
                  error={errors.email?.message}
                />
              </div>
              <Textarea
                {...register("bio")}
                id="bio"
                title="Біографія"
                placeholder="Розкажіть про себе"
                className={`min-h-[200px] ${sharedFieldStyles} p-4`}
                readOnly={!isEditing}
                error={errors.bio?.message}
              />
              <div className="flex w-full justify-end gap-4">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCancel}>
                      Скасувати
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={updateProfile.isPending || !isDirty}>
                      {updateProfile.isPending ? "Збереження..." : "Зберегти"}
                    </Button>
                  </>
                ) : (
                  <Button type="button" variant="primary" onClick={handleEdit}>
                    Редагувати
                  </Button>
                )}
              </div>
            </div>
          </form>
          <Separator />
        </div>
      </div>
      {/* <EducationSection education={profile.education} /> */}
      {/* <ExperienceSection experiences={profile.experiences} /> */}
    </Section>
  );
};
