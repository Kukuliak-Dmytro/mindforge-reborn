import { cn } from "@/app/shared/utils/utils";

interface SectionProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <section className="flex flex-col items-center w-full">
      {title && <h3 className="text-primary-text text-left w-full">{title}</h3>}
      <div
        className={cn(
          "w-full max-w-[1240px] p-4 sm:p-6 md:p-8 lg:p-[60px]",
          "bg-foreground shadow-double rounded-large",
          title ? "mt-4" : "mt-4 sm:mt-8 md:mt-12 lg:mt-[60px]",
          className,
        )}>
        {children}
      </div>
    </section>
  );
}

export function SectionInvisible({ children, className }: SectionProps) {
  return (
    <section className="flex flex-col items-center">
      <div className={cn("w-[1240px] p-[60px] bg-transparent mt-0", className)}>
        {children}
      </div>
    </section>
  );
}
