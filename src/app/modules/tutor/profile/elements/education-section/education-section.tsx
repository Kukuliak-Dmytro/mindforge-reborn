"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { InputText } from "@/app/shared/components/ui/input-text";
import { InputDate } from "@/app/shared/components/ui/input-date";
import { Separator } from "@/app/shared/components/ui/separator";
import { Button } from "@/app/shared/components/ui/button";
import { useUpdateTutorProfile } from "@/app/entities/api/tutor-profile";
import type { ITutorEducation } from "@/app/entities/models";
import {
  createTutorEducationSchema,
  type ITutorEducationFormData,
} from "../../tutor-profile.schema";
import { EducationCard } from "./education-card";

//interface
/**
 * Props for EducationSection component.
 */
interface IEducationSectionProps {
  education: ITutorEducation[];
}

//component
/**
 * EducationSection component for displaying and managing tutor education entries.
 */
export const EducationSection = ({ education }: IEducationSectionProps) => {
  const t = useTranslations();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [initialFormValues, setInitialFormValues] =
    useState<ITutorEducationFormData | null>(null);
  const updateProfile = useUpdateTutorProfile();

  const defaultFormValues: ITutorEducationFormData = useMemo(
    () => ({
      institution: "",
      fieldOfStudy: "",
      degree: "",
      startDate: "",
      endDate: "",
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITutorEducationFormData>({
    resolver: zodResolver(createTutorEducationSchema(t)),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const handleAdd = (data: ITutorEducationFormData) => {
    updateProfile.mutate(
      {
        education: {
          add: [
            {
              institution: data.institution,
              fieldOfStudy: data.fieldOfStudy,
              degree: data.degree,
              startDate: new Date(data.startDate).toISOString(),
              endDate: data.endDate
                ? new Date(data.endDate).toISOString()
                : undefined,
            },
          ],
        },
      },
      {
        onSuccess: () => {
          reset(defaultFormValues);
          setIsAdding(false);
        },
      },
    );
  };

  const handleRemove = (id: string) => {
    setDeletingId(id);
    updateProfile.mutate(
      {
        education: {
          remove: [id],
        },
      },
      {
        onSuccess: () => {
          // Keep the deleting state until animation completes (300ms)
          // The item will be removed from the list by React Query cache update
          setTimeout(() => {
            setDeletingId(null);
          }, 350);
        },
        onError: () => {
          setDeletingId(null);
        },
      },
    );
  };

  const handleEdit = (entry: ITutorEducation) => {
    const formValues: ITutorEducationFormData = {
      institution: entry.institution,
      fieldOfStudy: entry.fieldOfStudy,
      degree: entry.degree,
      startDate: entry.startDate ? entry.startDate.slice(0, 10) : "",
      endDate: entry.endDate ? entry.endDate.slice(0, 10) : "",
    };
    setInitialFormValues(formValues);
    reset(formValues);
    setEditingId(entry.id);
  };

  const handleUpdate = (id: string, data: ITutorEducationFormData) => {
    // Compare with initial values to avoid unnecessary API calls
    const initial = initialFormValues || defaultFormValues;
    const hasChanges =
      data.institution !== initial.institution ||
      data.fieldOfStudy !== initial.fieldOfStudy ||
      data.degree !== initial.degree ||
      data.startDate !== initial.startDate ||
      (data.endDate || "") !== (initial.endDate || "");

    if (!hasChanges) {
      setEditingId(null);
      setInitialFormValues(null);
      reset(defaultFormValues);
      return;
    }

    // Update is handled as remove + add since API doesn't support direct updates
    updateProfile.mutate(
      {
        education: {
          remove: [id],
          add: [
            {
              institution: data.institution,
              fieldOfStudy: data.fieldOfStudy,
              degree: data.degree,
              startDate: new Date(data.startDate).toISOString(),
              endDate: data.endDate
                ? new Date(data.endDate).toISOString()
                : undefined,
            },
          ],
        },
      },
      {
        onSuccess: () => {
          setEditingId(null);
          setInitialFormValues(null);
          reset(defaultFormValues);
        },
      },
    );
  };

  const handleCancel = () => {
    setEditingId(null);
    setInitialFormValues(null);
    reset(defaultFormValues);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    reset(defaultFormValues);
  };

  const isPending = updateProfile.isPending;
  const sharedFieldStyles = "w-full bg-white-bg shadow-small rounded-medium";

  //return
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2>Освіта</h2>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20
              transition"
            onClick={() => setIsAdding(true)}
            aria-label="Додати освіту"
            type="button">
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className="flex flex-col gap-4 transition-all duration-300 ease-in-out">
        {education.map((entry) => (
          <EducationCard
            key={entry.id}
            entry={entry}
            isEditing={editingId === entry.id}
            isDeleting={deletingId === entry.id}
            isPending={isPending}
            onEdit={() => handleEdit(entry)}
            onRemove={() => handleRemove(entry.id)}
            onSubmit={handleSubmit((data) => handleUpdate(entry.id, data))}
            onCancel={handleCancel}
            register={register}
            errors={errors}
            sharedFieldStyles={sharedFieldStyles}
          />
        ))}
        {isAdding && (
          <div
            className="flex flex-col gap-4 p-6 bg-foreground shadow-medium
              rounded-large border border-border transition hover:shadow-double
              animate-fade-in">
            <form onSubmit={handleSubmit(handleAdd)}>
              <div className="flex flex-col gap-4">
                <InputText
                  {...register("institution")}
                  id="institution"
                  title="Навчальний заклад"
                  placeholder="Назва навчального закладу"
                  className={sharedFieldStyles}
                  error={errors.institution?.message}
                />
                <InputText
                  {...register("fieldOfStudy")}
                  id="fieldOfStudy"
                  title="Спеціальність"
                  placeholder="Ваша спеціальність"
                  className={sharedFieldStyles}
                  error={errors.fieldOfStudy?.message}
                />
                <InputText
                  {...register("degree")}
                  id="degree"
                  title="Ступінь"
                  placeholder="Ваш ступінь"
                  className={sharedFieldStyles}
                  error={errors.degree?.message}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputDate
                    {...register("startDate")}
                    id="startDate"
                    title="Дата початку"
                    placeholder="Виберіть дату"
                    className={sharedFieldStyles}
                  />
                  <InputDate
                    {...register("endDate")}
                    id="endDate"
                    title="Дата закінчення"
                    placeholder="Виберіть дату"
                    className={sharedFieldStyles}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancelAdd}>
                    Скасувати
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending || Object.keys(errors).length > 0}>
                    {isPending ? "Збереження..." : "Додати"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <Separator />
    </>
  );
};
