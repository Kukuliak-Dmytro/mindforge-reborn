"use client";

import * as React from "react";
import { useRef } from "react";
import { cn } from "@/app/shared/utils/utils";

export interface CheckboxProps {
  title: string;
  id?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { title, id, className, defaultChecked = false, onChange, ...props },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const checkboxRef = ref || internalRef;

    const handleClick = () => {
      if (checkboxRef && "current" in checkboxRef && checkboxRef.current) {
        const newChecked = !checkboxRef.current.checked;
        checkboxRef.current.checked = newChecked;
        onChange?.(newChecked);
      }
    };

    return (
      <div
        className={cn(
          `p-2 flex flex-row-reverse gap-4 items-center justify-between
          bg-white-bg rounded-medium shadow-small cursor-pointer`,
          className,
        )}
        onClick={handleClick}
        {...props}>
        <label htmlFor={id} className="flex-1 cursor-pointer">
          <p>{title}</p>
        </label>

        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="peer sr-only"
            defaultChecked={defaultChecked}
            ref={checkboxRef}
          />
          <div
            className={cn(
              `w-5 h-5 transition-colors rounded-md border
              border-primary-border`,
              "bg-white-bg peer-checked:bg-accent",
            )}
          />
          <svg
            className={cn(
              "absolute top-0.5 left-0.5 w-4 h-4 transform pointer-events-none",
              "opacity-0 peer-checked:opacity-100 transition-opacity",
            )}
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.8978 6.17992L9.10309 13.4219C8.90602 13.605 8.59941 13.5994 8.4092 13.4092L4.58333 9.58325"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
