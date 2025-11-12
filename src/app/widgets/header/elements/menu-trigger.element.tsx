import { forwardRef } from "react";
import { cn } from "@/app/shared/utils/utils";

interface IMenuTriggerProps {
  isOpen: boolean;
}

export const MenuTrigger = forwardRef<
  HTMLButtonElement,
  IMenuTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ isOpen, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "h-10 w-10 p-[12px_8px] rounded-medium bg-primary",
        "shadow-small flex flex-col justify-between items-center",
        "cursor-pointer transition-all focus:outline-none",
        className,
      )}
      aria-label="Toggle menu"
      {...props}>
      <span
        className={cn(
          "block w-6 h-[3px] bg-primary-text rounded-[3px]",
          "transition-transform duration-300 origin-center",
          isOpen && "rotate-45 translate-y-[6.5px]",
        )}></span>
      <span
        className={cn(
          "block w-6 h-[3px] bg-primary-text rounded-[3px]",
          "transition-opacity duration-300",
          isOpen && "opacity-0",
        )}></span>
      <span
        className={cn(
          "block w-6 h-[3px] bg-primary-text rounded-[3px]",
          "transition-transform duration-300 origin-center",
          isOpen && "-rotate-45 -translate-y-[7px]",
        )}></span>
    </button>
  );
});

MenuTrigger.displayName = "MenuTrigger";

