import { FC } from "react";
import { cn } from "@/app/shared/utils/utils";
import { StepIcon } from "@/app/shared/assets/icons";

export interface IStepCardProps {
  step: number;
  title: string;
  content: string;
}

export const StepCard: FC<IStepCardProps> = ({ step, title, content }) => {
  return (
    <div
      className={cn(
        `p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 bg-background
        rounded-medium shadow-double text-left relative`,
      )}>
      <div className="flex-shrink-0">
        <StepIcon step={step} />
      </div>
      <div className={cn("flex flex-col gap-2 flex-1")}>
        <h4 className="text-lg sm:text-xl">{title}</h4>
        <p className="text-sm sm:text-base">{content}</p>
      </div>
      <div
        className={cn(
          `absolute right-[34px] top-0 h-[52px] w-[34px] pt-[5px] bg-accent flex
          items-start justify-center rounded-t-md hidden sm:flex`,
        )}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 50% 75%, 0 100%, 0 0)",
        }}>
        <h4 className={cn("text-primary-text")}>{step}</h4>
      </div>
    </div>
  );
};
