import { apiGet } from "@/apis/api";

export interface SearchResponse {
  content: {
    articleId: number;
    title: string;
    content: string;
    imageUrl: string;
  }[];
  totalPages: number;
  totalElements: number;
}

export async function searchNews(
  type: "news",
  query: string,
  pageIndex: number,
): Promise<SearchResponse> {
  const params = { type, query, page: pageIndex };
  return await apiGet<
    SearchResponse,
    { type: "news"; query: string; page: number }
  >("/search", params);
}
