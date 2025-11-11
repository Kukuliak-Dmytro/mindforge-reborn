import { FC, ReactNode } from "react";
import { cn } from "@/app/shared/utils/utils";

interface IBestEmployeeCardProps {
  children: ReactNode;
  name: string;
  workingSince: string;
  rating: string;
  description: string;
}

export const BestEmployeeCard: FC<IBestEmployeeCardProps> = ({
  children,
  name,
  workingSince,
  rating,
  description,
}) => {
  return (
    <div
      className={cn(
        `bg-white-bg p-6 flex flex-col items-center gap-4 text-center
        shadow-medium rounded-small`,
      )}>
      {children}
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
