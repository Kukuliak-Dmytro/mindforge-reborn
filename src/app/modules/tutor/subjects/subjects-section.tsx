'use client'

import { useState } from 'react'
import { useTutorSubjects } from '@/hooks/use-tutor-profile'
import { Section } from '@/components/layout/section'
import { PrimaryButton, SecondaryButton, DangerButton } from '@/components/ui/button'
import { InputText } from '@/components/ui/input-text'
import { Separator } from '@/components/ui/separator'
import type { TutorSubject } from '@/types/tutor-types'
import { useFormState } from '@/lib/hooks/use-form-state'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'

interface SubjectsSectionProps {
  subjects: TutorSubject[]
  availableSubjects: Array<{ id: string; name: string }>
  availableCategories: Array<{ id: string; name: string; isRecurring: boolean }>
}

export function SubjectsSection({ subjects, availableSubjects, availableCategories }: SubjectsSectionProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const { addSubject, removeSubject, updateSubject, isUpdating, error } = useTutorSubjects()

  const initialFormState = {
    subjectId: '',
    categoryId: '',
    price: ''
  }

  const { formState, handleChange, resetForm, updateField, setFormState } = useFormState(initialFormState)

  const handleAdd = async () => {
    try {
      await addSubject({
        subjectId: formState.subjectId,
        categoryId: formState.categoryId,
        price: parseFloat(formState.price)
      })
      resetForm()
      setIsAdding(false)
    } catch (error) {
      console.error('Failed to add subject:', error)
    }
  }

  const handleRemove = async (subjectId: string, categoryId: string) => {
    try {
      await removeSubject(subjectId, categoryId)
    } catch (error) {
      console.error('Failed to remove subject:', error)
    }
  }

  const handleEdit = (entry: TutorSubject) => {
    setEditingId(entry.subjectId);
    setEditingCategoryId(entry.categoryId);
    setFormState({
      subjectId: entry.subjectId,
      categoryId: entry.categoryId,
      price: entry.price.toString()
    });
  };

  const handleUpdate = async (oldSubjectId: string, oldCategoryId: string) => {
    try {
      await updateSubject(
        oldSubjectId,
        oldCategoryId,
        {
          subjectId: formState.subjectId,
          categoryId: formState.categoryId,
          price: parseFloat(formState.price)
        }
      );
      setEditingId(null);
      setEditingCategoryId(null);
      resetForm();
    } catch (error) {
      console.error('Failed to update subject:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingCategoryId(null);
    resetForm();
  };

  const getSubjectName = (subjectId: string) => {
    return availableSubjects.find(s => s.id === subjectId)?.name || 'Unknown Subject'
  }

  const getCategoryName = (categoryId: string) => {
    return availableCategories.find(c => c.id === categoryId)?.name || 'Unknown Category'
  }

  // Helper to get if selected category is recurring
  const selectedCategory = availableCategories.find(c => c.id === formState.categoryId);
  const isSelectedRecurring = selectedCategory?.isRecurring;

  return (
    <>
      <div className="flex items-center justify-between mb-3 gap-4">
        <h2>Предмети та ціни</h2>
        <PrimaryButton
          className="flex items-center gap-2"
          onClick={() => setIsAdding(true)}
          aria-label="Додати предмет"
          type="button"
        >
          <FiPlus size={18} /> Додати
        </PrimaryButton>
      </div>
      <div className="flex flex-col gap-4">
        {subjects.map((entry) => {
          const category = availableCategories.find(c => c.id === entry.categoryId);
          const isRecurring = category?.isRecurring;
          return (
            <div key={entry.id} className={editingId === entry.subjectId && editingCategoryId === entry.categoryId
              ? "flex flex-col gap-4 p-6 bg-neutral-50 shadow-lg rounded-2xl border border-neutral-200 transition hover:shadow-xl w-full"
              : "flex items-center w-full gap-4 p-4 bg-neutral-50 shadow rounded-xl border border-neutral-200 transition hover:shadow-md"}>
              {editingId === entry.subjectId && editingCategoryId === entry.categoryId ? (
                <>
                  <div>
                    <label className="pl-4 block mb-1">Предмет</label>
                    <Select
                      value={formState.subjectId}
                      onValueChange={(value) => updateField('subjectId', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Виберіть предмет" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <label className="pl-4 block mb-1">Категорія</label>
                  <Select
                    value={formState.categoryId}
                    onValueChange={(value) => updateField('categoryId', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Виберіть категорію" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputText
                    value={formState.price}
                    id="price"
                    title={`Ціна${isSelectedRecurring ? 'грн / година' : ''}`}
                    placeholder="Введіть ціну"
                    type="text"
                    onChange={handleChange}
                    className="w-full"
                  />
                  <div className="flex justify-end gap-2">
                    <SecondaryButton onClick={handleCancelEdit}>Скасувати</SecondaryButton>
                    <PrimaryButton onClick={() => handleUpdate(entry.subjectId, entry.categoryId)} disabled={isUpdating}>
                      {isUpdating ? 'Збереження...' : 'Зберегти'}
                    </PrimaryButton>
                  </div>
                </>
              ) :
                <>
                  <div className="flex-1 flex flex-row items-center gap-4 min-w-0 justify-between">
                    <div className="flex flex-col min-w-0">
                      <span className="truncate text-lg font-medium">{getSubjectName(entry.subjectId)}</span>
                      <span className="truncate text-xs">{getCategoryName(entry.categoryId)}</span>
                    </div>
                    <span className="text-lg font-medium whitespace-nowrap">
                      {entry.price} грн
                      {isRecurring ? ' / година' : ''}
                    </span>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <SecondaryButton size="icon" onClick={() => handleEdit(entry)} aria-label="Редагувати">
                      <FiEdit2 size={18} />
                    </SecondaryButton>
                    <DangerButton size="icon" onClick={() => handleRemove(entry.subjectId, entry.categoryId)} aria-label="Видалити">
                      <FiTrash2 size={18} />
                    </DangerButton>
                  </div>
                </>
              }
            </div>
          )
        })}
      </div>
      {isAdding && (
        <div className="flex flex-col gap-4 p-6 bg-neutral-50 shadow-lg rounded-2xl border border-neutral-200 transition hover:shadow-xl">
          <div>
            <label className="pl-4 block mb-1">Предмет</label>
            <Select
              value={formState.subjectId}
              onValueChange={(value) => updateField('subjectId', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Виберіть предмет" />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="pl-4 block mb-1">Категорія</label>
            <Select
              value={formState.categoryId}
              onValueChange={(value) => updateField('categoryId', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Виберіть категорію" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <InputText
            value={formState.price}
            id="price"
            title={`Ціна${isSelectedRecurring ? ' грн / година' : ''}`}
            placeholder="Введіть ціну"
            type="text"
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-end gap-2">
            <SecondaryButton onClick={() => {
              resetForm()
              setIsAdding(false)
            }}>
              Скасувати
            </SecondaryButton>
            <PrimaryButton 
              onClick={handleAdd}
              disabled={isUpdating}
            >
              {isUpdating ? 'Збереження...' : 'Додати'}
            </PrimaryButton>
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
      <Separator />
    </>
  )
} 