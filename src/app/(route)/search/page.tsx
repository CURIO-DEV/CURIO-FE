"use client";

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
  const params = useSearchParams();
  const router = useRouter();

  const headerKeyword = params.get("keyword");
  const trendKeyword = params.get("trends");
  const keyword = headerKeyword ?? trendKeyword ?? "";

  const page = parseInt(params.get("page") ?? "1", 10);

  const { data, isLoading, error } = useSearchArticles(keyword, page);
  const items = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalElements = data?.totalElements ?? 0;
  const pageNumbers = getPageNumbers(page, totalPages);

  const handlePageChange = (p: number) => {
    if (p < 1 || p > totalPages) return;
    const key = headerKeyword !== null ? "keyword" : "trends";
    const q = encodeURIComponent(keyword);
    router.push(`/search?${key}=${q}&page=${p}`);
  };
  return (
    <div className="p-6 pb-18.5">
      <div className="body1 mb-4 h-10 w-full border-b border-gray-100 font-bold">
        <p>
          "{keyword}"에 대한 검색결과 {totalElements}건
        </p>
      </div>

      {isLoading && <div className="mb-4">로딩 중…</div>}
      {error && <div>error:{error.message}</div>}

      {isLoading && <div>로딩 중…</div>}
      {error && <div>error: {error.message}</div>}

      {!isLoading && items.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}

      {!isLoading && items.length > 0 && (
        <>
          <div className="mt-6 flex flex-col gap-4">
            {items.map((item) => (
              <ArticleCard
                key={item.newsId}
                article={{
                  id: item.newsId,
                  title: item.title,
                  summary: item.content,
                  imageUrl: item.imageUrl,
                }}
              />
            ))}
          </div>

          <Pagination>
            <PaginationContent className="mt-8 flex justify-center space-x-2">
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                />
              </PaginationItem>

              {pageNumbers.map((p, idx) => (
                <PaginationItem key={idx}>
                  {p === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => handlePageChange(p as number)}
                    >
                      {p}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  aria-disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
