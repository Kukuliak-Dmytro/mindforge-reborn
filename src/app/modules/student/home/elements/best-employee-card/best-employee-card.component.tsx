import { FC } from "react";
import { Avatar } from "@/app/shared/assets/avatars";
import { cn } from "@/app/shared/utils/utils";

export interface IBestEmployeeCardProps {
  name: string;
  workingSince: string;
  rating: string;
  description: string;
  avatarId: 1 | 2 | 3 | 4 | 5 | 6;
}

export const BestEmployeeCard: FC<IBestEmployeeCardProps> = ({
  name,
  workingSince,
  rating,
  description,
  avatarId,
}) => {
  return (
    <div
      className={cn(
        `bg-background p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 text-center
        shadow-medium rounded-small w-full`,
      )}>
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center overflow-hidden rounded-full">
        <Avatar id={avatarId} size={128} />
      </div>
      <div className={cn("flex flex-col items-center gap-2")}>
        <h5 className="text-base sm:text-lg">{name}</h5>
        <p className={cn("p2 text-sm sm:text-base")}>На сайті з {workingSince}</p>
        <h6 className="text-sm sm:text-base">{rating}</h6>
      </div>
      <div>
        <p className="text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};
