"use client";
import { useState, useMemo } from "react";
import ArticleCard from "@/components/article";
import { articles } from "@/mocks/article-array";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/styles/components/ui/pagination";

const ARTICLES_PER_PAGE = 10;

function getPageNumbers(
  current: number,
  total: number,
  delta = 1,
): (number | "...")[] {
  const range: (number | "...")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}

export default function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(
    () => Math.ceil(articles.length / ARTICLES_PER_PAGE),
    [],
  );
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const startIdx = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(
    startIdx,
    startIdx + ARTICLES_PER_PAGE,
  );

  return (
    <div className="pb-18.5">
      <div className="body1 mt-10 h-10 w-225 border-b border-gray-100 font-bold">
        <p>검색어에 대한 검색결과 {articles.length}건</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {currentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <Pagination>
        <PaginationContent className="mt-8 flex justify-center space-x-2">
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="hover:bg-primary-50"
            />
          </PaginationItem>

          {pageNumbers.map((p, idx) => (
            <PaginationItem key={idx}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === currentPage}
                  onClick={() => setCurrentPage(p as number)}
                  className="hover:bg-primary-50 cursor-pointer"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              aria-disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className="hover:bg-primary-50"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
