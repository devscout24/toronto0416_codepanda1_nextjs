import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { allFilters } from "@/consts/filters";
import { TFilterDefinition } from "@/types/filters.type";

function RenderFilterSectionSkeleton({
  filter,
}: {
  filter: TFilterDefinition;
}) {
  switch (filter.type) {
    case "checkbox": {
      const optionCount = filter.options?.length ?? 3;
      const labelWidths = ["w-28", "w-24", "w-32", "w-20", "w-24", "w-28"];

      return (
        <>
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: optionCount }).map((_, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <Skeleton className="h-5 w-5 rounded-[4px]" />
                <Skeleton className={`h-5 ${labelWidths[index % labelWidths.length]}`} />
              </div>
            ))}
          </div>

          <Separator className="my-3.5" />
        </>
      );
    }

    case "range": {
      return (
        <>
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-2 w-full rounded-full" />
            <div className="text-muted-foreground mt-1.5 flex items-center justify-between text-sm">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          <Separator className="my-3.5" />
        </>
      );
    }

    case "rating": {
      const ratingCount = filter.max ?? 5;

      return (
        <>
          <div className="flex gap-1.5">
            {Array.from({ length: ratingCount }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-6 rounded-full" />
            ))}
          </div>

          <Separator className="my-3.5" />
        </>
      );
    }

    case "toggle": {
      return (
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-6 w-11 rounded-full" />
          <Skeleton className="h-5 w-36" />
        </div>
      );
    }

    default:
      return null;
  }
}

export default function FiltersSkeleton() {
  return (
    <section className="rounded-2xl bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-5 w-5 rounded-md" />
      </div>

      <Separator className="mt-2.5 mb-5" />

      {allFilters.map((filter, index) => (
        <div key={`${filter.title}-${index}`}>
          <Skeleton className="mb-2.5 h-5 w-32" />
          <RenderFilterSectionSkeleton filter={filter} />
        </div>
      ))}
    </section>
  );
}
