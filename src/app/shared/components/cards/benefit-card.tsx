import Image from "next/image";
import { FC } from "react";
import { cn } from "@/app/shared/utils/utils";

interface IBenefitCardProps {
  title: string;
  imgSrc: string;
  color?: "primary" | "secondary" | "accent" | "default";
}

export const BenefitCard: FC<IBenefitCardProps> = ({
  title,
  imgSrc,
  color = "default",
}) => {
  const COLOR_CLASSES = {
    primary: "bg-primary text-rich-black",
    secondary: "bg-secondary text-rich-black",
    accent: "bg-accent text-rich-black",
    default: "bg-white-bg text-rich-black",
  };

  return (
    <div
      className={cn(
        "h-[700px] w-[316px] border-t-8 border-dark-gray rounded-b-[316px]",
        "flex flex-col gap-6 overflow-hidden",
        COLOR_CLASSES[color],
      )}>
      <h2 className={cn("pt-6 px-4")}>{title}</h2>
      <div className={cn("w-full h-auto")}>
        <Image
          src={imgSrc}
          alt={title}
          width={316}
          height={316}
          className={cn("w-full h-[316px] object-cover")}
        />
      </div>
    </div>
  );
};
