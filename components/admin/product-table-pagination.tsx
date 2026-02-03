'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export default function ProductTablePagination({
  currentPage,
  totalPages,
  pageSize,
}: {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
}) {
  const pageSizeParam = pageSize && pageSize > 0 ? `&pageSize=${pageSize}` : "";

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(currentPage === 1 ? "hidden" : "")}
            href={currentPage > 1 ? `/admin?page=${currentPage - 1}${pageSizeParam}` : "#"}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-2 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={cn(currentPage === totalPages ? "hidden" : "")}
            href={currentPage < totalPages ? `/admin?page=${currentPage + 1}${pageSizeParam}` : "#"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
