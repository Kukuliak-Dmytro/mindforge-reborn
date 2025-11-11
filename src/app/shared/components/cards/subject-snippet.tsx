import { FC } from "react";
import { CategoryIcon } from "@/app/shared/assets/icons";
import { ICategoryIconCode } from "@/app/shared/interfaces";
import { cn } from "@/app/shared/utils/utils";

export interface ISubjectSnippetProps {
  title: string;
  icon: ICategoryIconCode;
  size?: number;
  variant?: "Default" | "Inverse";
}

export const SubjectSnippet: FC<ISubjectSnippetProps> = ({
  icon,
  size = 35,
  title,
  variant = "Default",
}) => {
  return (
    <div
      className={cn(
        "h-[35px] w-auto px-[10px] rounded-small shadow-small bg-background",
        "flex justify-between items-center",
        variant === "Inverse" ? "flex-row-reverse" : "flex-row",
      )}>
      <div>
        <CategoryIcon icon={icon} size={size} />
      </div>
      <div className={cn("py-[10px]")}>
        <p>{title}</p>
      </div>
    </div>
  );
};

