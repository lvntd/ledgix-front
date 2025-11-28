import React from "react";
import { Skeleton } from "@/components/atoms/skeleton";
import { cn } from "@/lib/utils";

export const OfferingCardSkeleton = () => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-1 flex-col justify-between gap-8 rounded-xl border p-6",
        "bg-popover text-popover-foreground"
      )}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="flex items-end gap-2">
          <Skeleton className="h-10 w-[95px]" />
          <Skeleton className="h-[22px] w-[52px]" />
        </div>
        <Skeleton className="h-6 w-28" />
      </div>
      <Skeleton className="h-9"></Skeleton>
    </div>
  );
};
