import { useQuery } from "@tanstack/react-query";
import { searchNews, SearchResponse } from "@/apis/search";

export interface NewsItem {
  newsId: number;
  title: string;
  content: string;
  imageUrl: string;
}

export function useSearchArticles(keyword: string, page: number) {
  return useQuery<SearchResponse, Error>({
    queryKey: ["search", keyword, page],
    queryFn: () => searchNews("news", keyword, page - 1),
    enabled: Boolean(keyword.trim()),
  });
}
