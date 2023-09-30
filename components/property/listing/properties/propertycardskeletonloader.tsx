import { Skeleton } from "@/components/ui/skeleton";

const PropertyCardSkeletonLoader: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-5 pt-40">
      <div className="grid h-full w-full grid-cols-4 gap-x-4">
        {[1, 2, 3, 4].map((skl) => (
          <div key={skl} className="space-y-4">
            <Skeleton className="h-64 w-full rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-10/12 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyCardSkeletonLoader;
