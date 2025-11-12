"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/app/shared/components/ui/button";
import { InputText } from "@/app/shared/components/ui/input-text";
import { Textarea } from "@/app/shared/components/ui/textarea";
import { Separator } from "@/app/shared/components/ui/separator";
import { useUpdateTutorProfile } from "@/app/entities/api/tutor-profile";
import {
  createTutorProfileSchema,
  type ITutorProfileFormData,
} from "../../tutor-profile.schema";

//interface
/**
 * Props for ProfileFormSection component.
 */
interface IProfileFormSectionProps {
  profile: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      bio: string | null;
      phone: string | null;
    };
  };
}

//component
/**
 * ProfileFormSection component for displaying and editing tutor profile form.
 */
export const ProfileFormSection = ({ profile }: IProfileFormSectionProps) => {
  const t = useTranslations();
  const [isEditing, setIsEditing] = useState(false);
  const [initialFormValues, setInitialFormValues] =
    useState<ITutorProfileFormData | null>(null);
  const updateProfile = useUpdateTutorProfile();

  const formValues = useMemo<ITutorProfileFormData>(
    () => ({
      firstName: profile.user.firstName || "",
      lastName: profile.user.lastName || "",
      email: profile.user.email || "",
      bio: profile.user.bio || "",
      phone: profile.user.phone || "",
    }),
    [
      profile.user.firstName,
      profile.user.lastName,
      profile.user.email,
      profile.user.bio,
      profile.user.phone,
    ],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITutorProfileFormData>({
    resolver: zodResolver(createTutorProfileSchema(t)),
    defaultValues: formValues,
    mode: "onChange",
  });

  const onSubmit = (data: ITutorProfileFormData) => {
    // Compare with initial values to avoid unnecessary API calls
    const initial = initialFormValues || formValues;
    const hasChanges =
      data.firstName !== initial.firstName ||
      data.lastName !== initial.lastName ||
      data.email !== initial.email ||
      (data.bio || "") !== (initial.bio || "") ||
      (data.phone || "") !== (initial.phone || "");

    if (!hasChanges) {
      setIsEditing(false);
      setInitialFormValues(null);
      return;
    }

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
          setInitialFormValues(null);
        },
      },
    );
  };

  const handleCancel = () => {
    reset(formValues);
    setIsEditing(false);
    setInitialFormValues(null);
  };

  const handleEdit = () => {
    // Store initial values when entering edit mode
    setInitialFormValues(formValues);
    reset(formValues);
    setIsEditing(true);
  };

  const sharedFieldStyles = "w-full bg-white-bg shadow-small rounded-medium";

  //return
  return (
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
                  disabled={
                    updateProfile.isPending || Object.keys(errors).length > 0
                  }>
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
  );
};
