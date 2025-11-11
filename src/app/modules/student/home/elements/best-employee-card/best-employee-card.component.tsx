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
        `bg-background p-6 flex flex-col items-center gap-4 text-center
        shadow-medium rounded-small`,
      )}>
      <Avatar id={avatarId} size={128} />
      <div className={cn("flex flex-col items-center gap-2")}>
        <h5>{name}</h5>
        <p className={cn("p2")}>На сайті з {workingSince}</p>
        <h6>{rating}</h6>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
};
