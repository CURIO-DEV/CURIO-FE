"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ArticleCard from "@/components/article";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/styles/components/ui/pagination";
import { useSearchArticles } from "@/hooks/use-search-articles";

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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const headerKeyword = searchParams.get("keyword");
  const trendKeyword = searchParams.get("trends");
  const keywordParam = headerKeyword ?? trendKeyword ?? "";

  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);

  const [keyword, setKeyword] = useState<string>(keywordParam);
  const [currentPage, setCurrentPage] = useState<number>(pageParam);

  useEffect(() => {
    setKeyword(keywordParam);
    setCurrentPage(pageParam);
  }, [keywordParam, pageParam]);

  const {
    results: allResults,
    isLoading,
    error,
  } = useSearchArticles(keyword, 1);

  const ARTICLES_PER_PAGE = 10;
  const totalElements = allResults.length;
  const totalPages = Math.ceil(totalElements / ARTICLES_PER_PAGE);

  const pageResults = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return allResults.slice(start, start + ARTICLES_PER_PAGE);
  }, [allResults, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const baseParam = headerKeyword !== null ? "query" : "q";
    const baseValue = keywordParam;
    router.push(
      `/search?${baseParam}=${encodeURIComponent(baseValue)}&page=${page}`,
    );
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="p-6 pb-18.5">
      <div className="body1 mb-4 h-10 w-full border-b border-gray-100 font-bold">
        <p>
          "{keywordParam}"에 대한 검색결과 {totalElements}건
        </p>
      </div>

      {isLoading && <div className="mb-4">로딩 중…</div>}
      {error && <div>error: {error}</div>}

      {!isLoading && !error && pageResults.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {pageResults.map((item) => (
            <ArticleCard
              key={item.newsId}
              article={{
                id: Number(item.newsId),
                title: item.title,
                summary: item.content,
                imageUrl: item.imageUrl,
              }}
            />
          ))}
        </div>
      )}

      {!isLoading && !error && keyword && pageResults.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}

      {!isLoading && !error && pageResults.length > 0 && (
        <Pagination>
          <PaginationContent className="mt-8 flex justify-center space-x-2">
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={currentPage === 1}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
                    onClick={() => handlePageChange(p as number)}
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
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className="hover:bg-primary-50"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
