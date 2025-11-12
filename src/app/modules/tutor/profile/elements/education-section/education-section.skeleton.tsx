import { cn } from "@/app/shared/utils/utils";

//component
/**
 * Skeleton loader for EducationSection component.
 */
export const EducationSectionSkeleton = () => {
  //return
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-3">
        <div className={cn("h-6 w-24 bg-gray-200 rounded animate-pulse")} />
        <div className={cn("h-10 w-10 rounded-full bg-gray-200 animate-pulse")} />
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "p-4 border border-gray-200 rounded-medium bg-white-bg",
            )}>
            <div className="flex flex-col gap-2">
              <div className={cn("h-5 w-48 bg-gray-200 rounded animate-pulse")} />
              <div className={cn("h-4 w-32 bg-gray-200 rounded animate-pulse")} />
              <div className={cn("h-4 w-24 bg-gray-200 rounded animate-pulse")} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

