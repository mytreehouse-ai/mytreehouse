import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface gridProps {
  cols?: number;
}

const Grid: React.FC<PropsWithChildren & gridProps> = ({
  children,
  cols = 4,
}) => {
  return (
    <div
      className={cn(
        "mt-6 grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-8",
        cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "",
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
