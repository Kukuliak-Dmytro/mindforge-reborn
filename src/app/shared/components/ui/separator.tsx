"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/app/shared/utils/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        `mt-8 bg-border border-b-2 border-primary-text shrink-0
        data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full
        data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px`,
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
