import { cn } from "@/app/shared/utils/utils";

interface SectionProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <section className="flex flex-col">
      {title && <h3 className="text-primary-text">{title}</h3>}
      <div
        className={cn(
          "w-[1240px] p-[60px] bg-foreground shadow-double rounded-large",
          title ? "mt-4" : "mt-[60px]",
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
