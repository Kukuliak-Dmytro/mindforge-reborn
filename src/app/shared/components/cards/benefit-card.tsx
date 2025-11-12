import Image from "next/image";
import { FC } from "react";
import { cn } from "@/app/shared/utils/utils";

export interface IBenefitCardProps {
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
    primary: "bg-primary text-primary-text",
    secondary: "bg-secondary text-primary-text",
    accent: "bg-accent text-primary-text",
    default: "bg-background text-primary-text",
  };

  return (
    <div
      className={cn(
        "h-[400px] w-[240px] sm:h-[500px] sm:w-[280px] md:h-[600px] md:w-[300px] lg:h-[700px] lg:w-[316px]",
        "border-t-4 sm:border-t-6 md:border-t-8 border-secondary-text",
        "rounded-b-[240px] sm:rounded-b-[280px] md:rounded-b-[300px] lg:rounded-b-[316px]",
        "flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-hidden",
        COLOR_CLASSES[color],
      )}>
      <h2 className={cn("pt-3 sm:pt-4 md:pt-5 lg:pt-6 px-3 sm:px-4 text-base sm:text-lg md:text-xl lg:text-2xl")}>
        {title}
      </h2>
      <div className={cn("w-full h-auto")}>
        <Image
          src={imgSrc}
          alt={title}
          width={316}
          height={316}
          className={cn("w-full h-[240px] sm:h-[280px] md:h-[300px] lg:h-[316px] object-cover")}
        />
      </div>
    </div>
  );
};


