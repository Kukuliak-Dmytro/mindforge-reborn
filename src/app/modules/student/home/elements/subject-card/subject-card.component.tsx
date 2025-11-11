import { FC } from "react";
import { Button } from "@/app/shared/components/ui/button";
import { SubjectIcon } from "@/app/shared/assets/icons";
import { ISubjectIconCode } from "@/app/shared/interfaces";
import { cn } from "@/app/shared/utils/utils";

export interface ISubjectCardProps {
  title: string;
  link: string;
  /** Type of subject card - determines the query parameter that will be used */
  type?: "subject" | "category";
  /** Code identifier for the subject (e.g., "mathematics" for Математика) */
  code: ISubjectIconCode;
}

export const SubjectCard: FC<ISubjectCardProps> = ({
  title,
  link,
  type = "subject",
  code,
}) => {
  // Add query parameter based on type and code
  const href = link.includes("?")
    ? `${link}&${type}=${encodeURIComponent(code)}`
    : `${link}?${type}=${encodeURIComponent(code)}`;

  return (
    <div
      className={cn(
        `flex flex-col items-center p-8 gap-4 bg-background rounded-small
        shadow-double border-t-[5px] border-accent`,
      )}>
      <SubjectIcon icon={code} size={100} />
      <h4 className={cn("text-[30px]")}>{title}</h4>
      <Button variant="secondary" href={href}>
        Перейти
      </Button>
    </div>
  );
};
