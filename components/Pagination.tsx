
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Projects pagination" className="mt-8">
      <div className="flex items-center justify-center gap-4">
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-md border px-4 py-2 opacity-50">
            Previous
          </span>
        )}

        <span>
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-md border px-4 py-2 opacity-50">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
