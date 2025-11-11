"use client";

import { useState } from "react";
import { useFormState } from "@/app/shared/hooks/use-form-state";
import { InputText } from "@/app/shared/components/ui/input-text";
import { PrimaryButton } from "@/app/shared/components/ui/button";

interface ExampleFormData extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function FormExample() {
  const { formState, handleChange, resetForm } = useFormState<ExampleFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", formState);
  };

  const handleReset = () => {
    resetForm();
    setSubmitted(false);
  };

  return (
    <div className="bg-white-bg rounded-medium shadow-small p-6">
      <h4 className="text-primary mb-4">Form Example with useFormState</h4>

      {submitted ? (
        <div className="space-y-4">
          <div className="p-4 bg-accent/10 rounded-medium">
            <h5 className="font-semibold mb-2">Submitted Data:</h5>
            <pre className="text-sm overflow-auto p-2 bg-white-fg rounded-small">
              {JSON.stringify(formState, null, 2)}
            </pre>
          </div>
          <PrimaryButton onClick={handleReset}>Reset Form</PrimaryButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputText
            id="firstName"
            title="First Name"
            placeholder="Enter your first name"
            value={formState.firstName}
            onChange={handleChange}
          />

          <InputText
            id="lastName"
            title="Last Name"
            placeholder="Enter your last name"
            value={formState.lastName}
            onChange={handleChange}
          />

          <InputText
            id="email"
            title="Email"
            type="email"
            placeholder="Enter your email"
            value={formState.email}
            onChange={handleChange}
          />

          <InputText
            id="phone"
            title="Phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formState.phone}
            onChange={handleChange}
          />

          <div className="flex gap-4 pt-2">
            <PrimaryButton type="submit">Submit</PrimaryButton>
            <PrimaryButton type="button" onClick={handleReset}>
              Reset
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
}
