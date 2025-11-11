import { FC, ReactNode } from "react";
import { cn } from "@/app/shared/utils/utils";

interface ITestimonialCardProps {
  name: string;
  rating: string;
  subject: string;
  description: string;
  author: string;
  children: ReactNode;
}

export const TestimonialCard: FC<ITestimonialCardProps> = ({
  name,
  rating,
  subject,
  description,
  author,
  children,
}) => {
  return (
    <div
      className={cn(
        `p-6 bg-background shadow-medium rounded-medium flex flex-col gap-4
        relative`,
      )}>
      <div className={cn("flex gap-3")}>
        <div className={cn("avatar")}>{children}</div>
        <div className={cn("flex flex-col gap-2")}>
          <h5>{name}</h5>
          <p>{rating}</p>
        </div>
      </div>

      <div className={cn("subject")}>
        <h5>{subject}</h5>
      </div>

      <div className={cn("min-h-[200px]")}>
        <p>{description}</p>
      </div>

      <div
        className={cn(
          "absolute right-0 bottom-6 py-0 pl-2 pr-6 bg-accent rounded-l-[6px]",
        )}>
        <p className={cn("p2")}>{author}</p>
      </div>
    </div>
  );
};
