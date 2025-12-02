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
import React from "react";
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

  // Get current page from query or fallback to prop/default
  const currentPage = Number(searchParams.get("page")) || page || 1;

  // Update query params when page changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle next/previous buttons
  const handleNext = () => {
    if (currentPage < total) handlePageChange(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  return (
    <section>
      <Pagination>
        <PaginationContent className="gap-5">
          {/* Previous Button */}
          <PaginationItem
            className={cn(
              "bg-primary-200 cursor-pointer rounded-lg",
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            )}
            onClick={handlePrev}
          >
            <PaginationPrevious />
          </PaginationItem>

          {/* Page Numbers */}
          {[...Array(total).keys()].map((p) => {
            const pageNum = p + 1;
            return (
              <PaginationItem
                key={pageNum}
                className={cn(
                  "cursor-pointer rounded-lg",
                  currentPage === pageNum
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-primary-50"
                )}
                onClick={() => handlePageChange(pageNum)}
              >
                <PaginationLink>{pageNum}</PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Ellipsis */}
          {total > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem
            className={cn(
              "bg-primary-200 cursor-pointer rounded-lg",
              currentPage === total && "opacity-50 cursor-not-allowed"
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
