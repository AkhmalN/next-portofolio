import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "bg-gray-300 dark:bg-gray-700 rounded animate-pulse my-1",
        className
      )}
      {...props}
    />
  );
};

export { Skeleton };
