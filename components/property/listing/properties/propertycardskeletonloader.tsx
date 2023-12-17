import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PropertyCardSkeletonLoader {
  className?: string;
}

const PropertyCardSkeletonLoader: React.FC<PropertyCardSkeletonLoader> = ({
  className,
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center px-5 pt-40">
      <div
        className={cn(
          "grid h-full w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4 ",
        )}
      >
        {[1, 2, 3, 4].map((skl) => (
          <div key={skl} className="space-y-4">
            <Skeleton className="h-64 w-full rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-10/12 rounded-md" />
            <Skeleton className="h-5 w-1/2 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyCardSkeletonLoader;
