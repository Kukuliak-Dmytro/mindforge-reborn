"use client";

import { InputText } from "@/app/shared/components/ui/input-text";
import { InputDate } from "@/app/shared/components/ui/input-date";
import { Button } from "@/app/shared/components/ui/button";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { ITutorExperience } from "@/app/entities/models";
import type { ITutorExperienceFormData } from "../../tutor-profile.schema";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

//interface
/**
 * Props for ExperienceCard component.
 */
interface IExperienceCardProps {
  entry: ITutorExperience;
  isEditing: boolean;
  isDeleting: boolean;
  isPending: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  register: UseFormRegister<ITutorExperienceFormData>;
  errors: FieldErrors<ITutorExperienceFormData>;
  sharedFieldStyles: string;
}

//component
/**
 * ExperienceCard component for displaying and editing a single experience entry.
 */
export const ExperienceCard = ({
  entry,
  isEditing,
  isDeleting,
  isPending,
  onEdit,
  onRemove,
  onSubmit,
  onCancel,
  register,
  errors,
  sharedFieldStyles,
}: IExperienceCardProps) => {
  const baseClasses = "relative bg-foreground border border-border transition";
  const editingClasses =
    "flex flex-col gap-4 p-6 shadow-medium rounded-large hover:shadow-double w-full";
  const viewClasses =
    "flex items-center w-full gap-4 p-4 shadow-small rounded-medium hover:shadow-medium";
  const animationClasses = isDeleting
    ? "pointer-events-none animate-fade-out"
    : "animate-fade-in";

  //return
  return (
    <div
      className={`${baseClasses} ${isEditing ? editingClasses : viewClasses} ${animationClasses}`}>
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/90 rounded-medium z-10 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-primary">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm font-medium text-primary-text">
              Видалення...
            </span>
          </div>
        </div>
      )}
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <InputText
              {...register("institution")}
              id="institution"
              title="Місце роботи"
              placeholder="Назва компанії або організації"
              className={sharedFieldStyles}
              error={errors.institution?.message}
            />
            <InputText
              {...register("title")}
              id="title"
              title="Посада"
              placeholder="Ваша посада"
              className={sharedFieldStyles}
              error={errors.title?.message}
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
              <Button type="button" variant="secondary" onClick={onCancel}>
                Скасувати
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isPending || Object.keys(errors).length > 0}>
                {isPending ? "Збереження..." : "Зберегти"}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="flex-1 flex flex-row items-center gap-4 min-w-0 justify-between">
            <div className="flex flex-col min-w-0">
              <span className="truncate text-lg font-medium text-primary-text">
                {entry.institution}
              </span>
              <span className="truncate text-xs text-secondary-text">
                {entry.title}
              </span>
            </div>
            <span className="text-lg font-medium whitespace-nowrap text-primary-text">
              {new Date(entry.startDate).toLocaleDateString()} -{" "}
              {entry.endDate
                ? new Date(entry.endDate).toLocaleDateString()
                : "Present"}
            </span>
          </div>
          <div className="flex gap-2 ml-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={onEdit}
              aria-label="Редагувати"
              disabled={isPending}>
              <FiEdit2 size={18} />
            </Button>
            <Button
              variant="danger"
              size="icon"
              onClick={onRemove}
              aria-label="Видалити"
              disabled={isPending || isDeleting}>
              {isDeleting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <FiTrash2 size={18} />
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

