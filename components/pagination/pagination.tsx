"use client";

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
import { useRouter, useSearchParams } from "next/navigation";

export default function AppPagination({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || page || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleNext = () => {
    if (currentPage < total) handlePageChange(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  // Build the page number array with ellipsis markers
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];

    const showLeftEllipsis = currentPage > 4;
    const showRightEllipsis = currentPage < total - 3;

    pages.push(1);

    if (showLeftEllipsis) {
      pages.push("ellipsis");
    }

    // Middle window around current page
    const start = showLeftEllipsis ? Math.max(2, currentPage - 1) : 2;
    const end = showRightEllipsis
      ? Math.min(total - 1, currentPage + 1)
      : total - 1;

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (showRightEllipsis) {
      pages.push("ellipsis");
    }

    pages.push(total);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <section>
      <Pagination>
        <PaginationContent className="gap-1 md:gap-3">
          {/* Previous Button */}
          <PaginationItem
            className={cn(
              "bg-primary-200 cursor-pointer rounded-lg",
              currentPage === 1 && "cursor-not-allowed opacity-50",
            )}
            onClick={handlePrev}
          >
            <PaginationPrevious />
          </PaginationItem>

          {/* Page Numbers with smart ellipsis */}
          {pageNumbers.map((p, index) =>
            p === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem
                key={p}
                className={cn(
                  "cursor-pointer rounded-lg",
                  currentPage === p
                    ? "bg-primary text-white"
                    : "hover:bg-primary-50 bg-white",
                )}
                onClick={() => handlePageChange(p)}
              >
                <PaginationLink>{p}</PaginationLink>
              </PaginationItem>
            ),
          )}

          {/* Next Button */}
          <PaginationItem
            className={cn(
              "bg-primary-200 cursor-pointer rounded-lg",
              currentPage === total && "cursor-not-allowed opacity-50",
            )}
            onClick={handleNext}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}