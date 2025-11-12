import { useState } from "react";
import { useTutorExperience } from "@/hooks/use-tutor-profile";
import { Button } from "@/app/shared/components/ui/button";
import { InputText } from "@/app/shared/components/ui/input-text";
import { InputDate } from "@/app/shared/components/ui/input-date";
import { Separator } from "@/app/shared/components/ui/separator";
import type { TutorExperience } from "@/types/tutor-types";
import { useFormState } from "@/lib/hooks/use-form-state";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface ExperienceSectionProps {
  experiences: TutorExperience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const {
    addExperience,
    removeExperience,
    updateExperience,
    isUpdating,
    error,
  } = useTutorExperience();

  const initialFormState = {
    institution: "",
    title: "",
    startDate: "",
    endDate: "",
  };

  const { formState, handleChange, resetForm, setFormState } =
    useFormState(initialFormState);

  const handleAdd = async () => {
    try {
      await addExperience({
        institution: formState.institution,
        title: formState.title,
        startDate: new Date(formState.startDate).toISOString(),
        endDate: formState.endDate
          ? new Date(formState.endDate).toISOString()
          : null,
      });
      resetForm();
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add experience:", error);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeExperience(id);
    } catch (error) {
      console.error("Failed to remove experience:", error);
    }
  };

  const handleEdit = (entry: TutorExperience) => {
    setEditingId(entry.id);
    setFormState({
      institution: entry.institution,
      title: entry.title,
      startDate: entry.startDate ? entry.startDate.slice(0, 10) : "",
      endDate: entry.endDate ? entry.endDate.slice(0, 10) : "",
    });
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateExperience(id, {
        institution: formState.institution,
        title: formState.title,
        startDate: new Date(formState.startDate).toISOString(),
        endDate: formState.endDate
          ? new Date(formState.endDate).toISOString()
          : null,
      });
      setEditingId(null);
      resetForm();
    } catch (error) {
      console.error("Failed to update experience:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2>Досвід роботи</h2>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20
              transition"
            onClick={() => setIsAdding(true)}
            aria-label="Додати досвід"
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
      <div className="flex flex-col gap-4">
        {experiences.map((entry) => (
          <div
            key={entry.id}
            className={
              editingId === entry.id
                ? `flex flex-col gap-4 p-6 bg-neutral-50 shadow-lg rounded-2xl
                  border border-neutral-200 transition hover:shadow-xl w-full`
                : `flex items-center w-full gap-4 p-4 bg-neutral-50 shadow
                  rounded-xl border border-neutral-200 transition
                  hover:shadow-md`
            }>
            {editingId === entry.id ? (
              <>
                <InputText
                  value={formState.institution}
                  id="institution"
                  title="Місце роботи"
                  placeholder="Назва компанії або організації"
                  onChange={handleChange}
                  className="w-full"
                />
                <InputText
                  value={formState.title}
                  id="title"
                  title="Посада"
                  placeholder="Ваша посада"
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputDate
                    value={formState.startDate}
                    id="startDate"
                    title="Дата початку"
                    placeholder="Виберіть дату"
                    onChange={handleChange}
                    className="w-full"
                  />
                  <InputDate
                    value={formState.endDate}
                    id="endDate"
                    title="Дата закінчення"
                    placeholder="Виберіть дату"
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={handleCancelEdit}>
                    Скасувати
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleUpdate(entry.id)}
                    disabled={isUpdating}>
                    {isUpdating ? "Збереження..." : "Зберегти"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex-1 flex flex-row items-center gap-4 min-w-0
                    justify-between">
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-lg font-medium">
                      {entry.institution}
                    </span>
                    <span className="truncate text-xs">{entry.title}</span>
                  </div>
                  <span className="text-lg font-medium whitespace-nowrap">
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
                    onClick={() => handleEdit(entry)}
                    aria-label="Редагувати">
                    <FiEdit2 size={18} />
                  </Button>
                  <Button
                    variant="danger"
                    size="icon"
                    onClick={() => handleRemove(entry.id)}
                    aria-label="Видалити">
                    <FiTrash2 size={18} />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        {isAdding && (
          <div
            className="flex flex-col gap-4 p-6 bg-neutral-50 shadow-lg
              rounded-2xl border border-neutral-200 transition hover:shadow-xl">
            <InputText
              value={formState.institution}
              id="institution"
              title="Місце роботи"
              placeholder="Назва компанії або організації"
              onChange={handleChange}
              className="w-full"
            />
            <InputText
              value={formState.title}
              id="title"
              title="Посада"
              placeholder="Ваша посада"
              onChange={handleChange}
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputDate
                value={formState.startDate}
                id="startDate"
                title="Дата початку"
                placeholder="Виберіть дату"
                onChange={handleChange}
                className="w-full"
              />
              <InputDate
                value={formState.endDate}
                id="endDate"
                title="Дата закінчення"
                placeholder="Виберіть дату"
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  resetForm();
                  setIsAdding(false);
                }}>
                Скасувати
              </Button>
              <Button
                variant="primary"
                onClick={handleAdd}
                disabled={isUpdating}>
                {isUpdating ? "Збереження..." : "Додати"}
              </Button>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm">
            {error.message}
            {error.errors?.map((err, index) => (
              <div key={index}>{err.message}</div>
            ))}
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
