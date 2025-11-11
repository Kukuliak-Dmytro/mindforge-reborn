import { FC, ReactNode } from "react";
import { cn } from "@/app/shared/utils/utils";

export interface IStepCardProps {
  step: number;
  title: string;
  content: string;
  children?: ReactNode;
}

export const StepCard: FC<IStepCardProps> = ({
  step,
  title,
  content,
  children,
}) => {
  return (
    <div
      className={cn(
        `p-4 flex gap-4 bg-background rounded-medium shadow-double text-left
        relative`,
      )}>
      {children}
      <div className={cn("flex flex-col gap-2")}>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      <div
        className={cn(
          `absolute right-[34px] top-0 h-[52px] w-[34px] pt-[5px] bg-accent flex
          items-start justify-center rounded-t-md`,
        )}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 50% 75%, 0 100%, 0 0)",
        }}>
        <h4 className={cn("text-primary-text")}>{step}</h4>
      </div>
    </div>
  );
};
