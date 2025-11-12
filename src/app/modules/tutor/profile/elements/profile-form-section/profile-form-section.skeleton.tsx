import { cn } from "@/app/shared/utils/utils";

//component
/**
 * Skeleton loader for ProfileFormSection component.
 */
export const ProfileFormSectionSkeleton = () => {
  //return
  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <div
              className={cn("h-6 w-16 bg-gray-200 rounded animate-pulse ml-4")}
            />
            <div
              className={cn(
                "h-[50px] w-full bg-gray-200 rounded-medium animate-pulse",
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={cn("h-6 w-20 bg-gray-200 rounded animate-pulse ml-4")}
            />
            <div
              className={cn(
                "h-[50px] w-full bg-gray-200 rounded-medium animate-pulse",
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={cn("h-6 w-24 bg-gray-200 rounded animate-pulse ml-4")}
            />
            <div
              className={cn(
                "h-[50px] w-full bg-gray-200 rounded-medium animate-pulse",
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={cn("h-6 w-16 bg-gray-200 rounded animate-pulse ml-4")}
            />
            <div
              className={cn(
                "h-[50px] w-full bg-gray-200 rounded-medium animate-pulse",
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={cn("h-6 w-24 bg-gray-200 rounded animate-pulse ml-4")}
          />
          <div
            className={cn(
              `min-h-[200px] w-full bg-gray-200 rounded-medium animate-pulse
              p-4`,
            )}
          />
        </div>
        <div className="flex w-full justify-end gap-4">
          <div
            className={cn(
              "w-[130px] h-10 bg-gray-200 rounded-medium animate-pulse",
            )}
          />
        </div>
      </div>
    </div>
  );
};
