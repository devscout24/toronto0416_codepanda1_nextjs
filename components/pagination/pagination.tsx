import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export default function AppPagination({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  return (
    <section>
      <Pagination>
        <PaginationContent className="gap-5">
          <PaginationItem className="bg-primary-200 cursor-pointer rounded-lg">
            <PaginationPrevious />
          </PaginationItem>

          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}

          {[...Array(total).keys()].map((p) => (
            <PaginationItem
              key={p}
              className={cn(
                "cursor-pointer rounded-lg",
                p === page - 1 ? "bg-primary text-white" : "bg-white",
              )}
            >
              <PaginationLink>{p + 1}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className="bg-primary-200 cursor-pointer rounded-lg">
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
