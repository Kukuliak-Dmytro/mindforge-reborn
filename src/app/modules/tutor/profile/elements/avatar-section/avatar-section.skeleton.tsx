import { cn } from "@/app/shared/utils/utils";

//component
/**
 * Skeleton loader for AvatarSection component.
 */
export const AvatarSectionSkeleton = () => {
  //return
  return (
    <div className="flex flex-col items-center w-[200px] gap-4">
      <div className="relative">
        <div
          className={cn(
            "w-[140px] h-[140px] rounded-full bg-gray-200 animate-pulse",
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            "w-full min-w-[130px] h-10 rounded-medium bg-gray-200 animate-pulse",
          )}
        />
      </div>
    </div>
  );
};
