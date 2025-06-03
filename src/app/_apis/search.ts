import { apiGet } from "@/apis/api";

export interface SearchResponse {
  content: {
    newsId: number;
    title: string;
    content: string;
    imageUrl: string;
  }[];
  totalPages: number;
  totalElements: number;
}

export async function searchNews(
  type: string,
  query: string,
  pageIndex: number,
): Promise<SearchResponse> {
  const params = { type, query, page: pageIndex };
  return await apiGet<
    SearchResponse,
    { type: string; query: string; page: number }
  >("/search", params);
}
