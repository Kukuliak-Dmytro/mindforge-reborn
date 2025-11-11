"use client";

import { useState, ChangeEvent } from 'react';

/**
 * Custom hook to manage form state.
 *
 * @template T - The type of the form state object.
 * @param {T} initialState - The initial state of the form.
 * @returns An array containing the form state and a change handler function.
 *
 * @example
 * const [formState, handleChange] = useFormState({ name: '', email: '' });
 * 
 * // Automatic update of form state:
 * <input id="name" value={formState.name} onChange={handleChange} />
 * <input id="email" value={formState.email} onChange={handleChange} />
 * 
 * // Manual update of form state:
 * handleChange({ target: { value: 'new value', id: 'fieldId' } } as any);
 */
export function useFormState<T extends Record<string, any>>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, name, value } = event.target;
    const key = name || id; // Use name if provided, otherwise use id

    setFormState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  /**
   * Manually update a single field in the form state
   */
  const updateField = (fieldName: keyof T, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  };

  /**
   * Reset the form to its initial state
   */
  const resetForm = () => {
    setFormState(initialState);
  };

  return {
    formState,
    handleChange,
    updateField,
    resetForm,
    setFormState
  };
}






