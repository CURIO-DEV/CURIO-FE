"use client";
import { useState } from "react";
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

const articles = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  title: `뉴스 기사 ${i + 1}`,
  summary: `이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.이것은 뉴스 기사 ${i + 1}의 요약입니다.`,
  imageUrl: "/images/newThums.png",
  publishedAt: "2025-04-20",
}));

const ARTICLES_PER_PAGE = 10;

export default function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  const startIdx = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIdx = startIdx + ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  function getPageNumbers(current: number, total: number): (number | "...")[] {
    const delta = 1; // 현재 페이지 기준 앞뒤로 몇 개 보여줄지
    const range: (number | "...")[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1); // Always show the first page

    if (left > 2) {
      range.push("...");
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push("...");
    }

    if (total > 1) {
      range.push(total); // Always show the last page
    }

    return range;
  }

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
              href="#"
              className="hover:bg-primary-50 flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-300 disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {getPageNumbers(currentPage, totalPages).map((page, idx) => (
            <PaginationItem key={idx}>
              {page === "..." ? (
                <PaginationEllipsis className="flex h-8 w-8 items-center justify-center rounded border border-gray-100 text-gray-300" />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Number(page));
                  }}
                  className={`flex h-8 w-8 items-center justify-center rounded border text-sm ${
                    currentPage === page
                      ? "border-primary-600 text-primary-600 font-semibold"
                      : "hover:bg-primary-50 border-gray-300 text-gray-300"
                  }`}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              className="hover:bg-primary-50 flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-300 disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
