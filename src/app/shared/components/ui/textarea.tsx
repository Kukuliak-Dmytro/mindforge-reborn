"use client";

import * as React from "react";
import { cn } from "@/app/shared/utils/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  id: string;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      title,
      id,
      placeholder,
      value,
      defaultValue,
      className,
      onChange,
      readOnly,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col w-full gap-1">
        {title && (
          <label htmlFor={id} className="pl-4">
            {title}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          readOnly={readOnly}
          className={cn(
            "min-h-16 w-full rounded-medium px-4 py-2 text-base resize-none",
            readOnly
              ? "bg-transparent cursor-default outline-none border-none"
              : `border shadow-small focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-primary-border focus:ring-accent"
                }`,
            className,
          )}
          {...props}
        />
        {error && (
          <p className="pl-4 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
