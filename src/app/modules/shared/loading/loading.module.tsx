import { cn } from "@/app/shared/utils/utils";

//interface
/**
 * Props for Loading component.
 */
interface ILoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullScreen?: boolean;
}

//component
/**
 * Unified loading component with spinner.
 * Can be used as a page loading state or inline loading indicator.
 */
export const Loading = ({
  size = "md",
  className,
  fullScreen = false,
}: ILoadingProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-b",
    md: "h-8 w-8 border-b-2",
    lg: "h-12 w-12 border-b-4",
  };

  const spinner = (
    <div
      className={cn(
        "animate-spin rounded-full border-primary",
        sizeClasses[size],
        className,
      )}
      role="status"
      aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-8">{spinner}</div>;
};
