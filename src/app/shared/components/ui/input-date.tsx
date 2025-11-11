"use client";

import * as React from "react";
import { cn } from "@/app/shared/utils/utils";

export interface InputDateProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  id: string;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
}

const InputDate = React.forwardRef<HTMLInputElement, InputDateProps>(
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
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className={"pl-4 "}>
          {title}
        </label>
        <input
          type="date"
          id={id}
          ref={ref}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          readOnly={readOnly}
          className={cn(
            "h-[50px] rounded-medium px-4 text-base",
            readOnly
              ? "cursor-default outline-none border-none"
              : `border border-primary-border shadow-small focus:outline-none
                focus:ring-2 focus:ring-accent`,
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

InputDate.displayName = "InputDate";

export { InputDate };
