"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ArticleCard from "./article";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/styles/components/ui/pagination";

const articles = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  title: `뉴스 기사 ${i + 1}`,
  summary: `이것은 뉴스 기사 ${i + 1}의 요약입니다.`,
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

  const renderPaginationItems = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages.map((page, idx) => (
      <PaginationItem key={idx}>
        {page === "..." ? (
          <span className="body2 flex h-8 w-8 items-center justify-center font-bold text-gray-400">
            …
          </span>
        ) : (
          <button
            onClick={() => handlePageChange(Number(page))}
            className={`body2 flex h-8 w-8 items-center justify-center rounded-md border font-bold ${
              page === currentPage
                ? "bg-primary-100 text-primary-600"
                : "text-gray-600"
            }`}
          >
            {page}
          </button>
        )}
      </PaginationItem>
    ));
  };

  return (
    <div>
      <div className="body1 mt-10 h-10 w-225 border-b border-gray-100 font-bold">
        <p>검색어에 대한 검색결과 {articles.length}건</p>
      </div>
      <div className="mt-6 space-y-4">
        {currentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}

        <Pagination>
          <PaginationContent className="justify-center gap-2">
            {/* Prev */}
            <PaginationItem>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="hover:bg-primary-100 flex h-8 w-8 items-center justify-center rounded-md border text-gray-600 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
            </PaginationItem>

            {/* Page Numbers */}
            {renderPaginationItems()}

            {/* Next */}
            <PaginationItem>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="hover:bg-primary-100 flex h-8 w-8 items-center justify-center rounded-md border text-gray-600 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
