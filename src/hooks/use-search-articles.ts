import { useState, useEffect } from "react";
import { searchNews, SearchResponse } from "@/apis/search";

export interface NewsItem {
  newsId: number;
  title: string;
  content: string;
  imageUrl: string;
}

export interface UseSearchResult {
  results: NewsItem[];
  totalPages: number;
  totalElements: number;
  isLoading: boolean;
  error: string | null;
}

export function useSearchArticles(
  keyword: string,
  page: number,
): UseSearchResult {
  const [results, setResults] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      setTotalPages(1);
      setTotalElements(0);
      setError(null);
      setIsLoading(false);
      return;
    }

    const pageIndex = page - 1;

    setIsLoading(true);
    setError(null);

    searchNews("news", keyword, pageIndex)
      .then((data: SearchResponse) => {
        setResults(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      })
      .catch((err) => {
        console.error("[useSearchArticles] error →", err);
        setError(err.message || "알 수 없는 오류가 발생했습니다.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [keyword, page]);

  return {
    results,
    totalPages,
    totalElements,
    isLoading,
    error,
  };
}
