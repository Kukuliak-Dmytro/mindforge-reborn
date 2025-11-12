import { FC } from "react";
import { Avatar } from "@/app/shared/assets/avatars";
import { cn } from "@/app/shared/utils/utils";

export interface ITestimonialCardProps {
  name: string;
  rating: string;
  subject: string;
  description: string;
  author: string;
  avatarId: 1 | 2 | 3 | 4 | 5 | 6;
}

export const TestimonialCard: FC<ITestimonialCardProps> = ({
  name,
  rating,
  subject,
  description,
  author,
  avatarId,
}) => {
  return (
    <div
      className={cn(
        `p-4 sm:p-6 bg-background shadow-medium rounded-medium flex flex-col
        gap-3 sm:gap-4 relative w-full`,
      )}>
      <div className={cn("flex gap-3")}>
        <div className={cn("avatar flex-shrink-0")}>
          <Avatar id={avatarId} size={64} />
        </div>
        <div className={cn("flex flex-col gap-2")}>
          <h5 className="text-base sm:text-lg">{name}</h5>
          <p className="text-sm sm:text-base">{rating}</p>
        </div>
      </div>

      <div className={cn("subject")}>
        <h5 className="text-base sm:text-lg">{subject}</h5>
      </div>

      <div className={cn("min-h-[150px] sm:min-h-[200px]")}>
        <p className="text-sm sm:text-base">{description}</p>
      </div>

      <div
        className={cn(
          `absolute right-0 bottom-4 sm:bottom-6 py-0 pl-2 pr-4 sm:pr-6
          bg-accent rounded-l-[6px]`,
        )}>
        <p className={cn("p2 text-xs sm:text-sm")}>{author}</p>
      </div>
    </div>
  );
};
