"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/shared/utils/utils";
import Link from "next/link";
import React from "react";

const buttonVariants = cva(
  "flex items-center justify-center text-center font-semibold whitespace-nowrap shadow-small cursor-pointer transition-all hover:scale-105 active:scale-95 rounded-medium h-10 min-w-10",
  {
    variants: {
      variant: {
        primary: "bg-primary text-rich-black",
        secondary: "bg-secondary text-rich-black",
        danger: "bg-danger text-rich-black",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "text-lg py-2.5 px-6",
        large: "text-2xl py-4 px-8 h-[60px] min-w-[250px] rounded-rounded",
        icon: "w-10 p-0 m-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  href?: string;
  width?: number;
  height?: number;
}

export function Button({
  className,
  variant,
  size,
  children,
  href,
  width,
  height,
  ...props
}: ButtonProps) {
  const styles = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        style={{
          ...(width ? { width: `${width}px` } : {}),
          ...(height ? { height: `${height}px` } : {}),
        }}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles}
      style={{
        ...(width ? { width: `${width}px` } : {}),
        ...(height ? { height: `${height}px` } : {}),
      }}
      {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
