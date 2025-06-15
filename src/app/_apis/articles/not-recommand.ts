import { apiGet, apiPatch } from "@/apis/api";

export interface NotRecommendStatus {
  articleId: number;
  status: boolean;
}
export const getNotRecommendStatus = (articleId: number) =>
  apiGet<NotRecommendStatus>(`/articles/${articleId}/notrecommend`);

export interface ToggleNotRecommendResponse {
  message: string;
  status: boolean;
}
export const toggleNotRecommend = (params: {
  articleId: number;
  status: boolean;
}) =>
  apiPatch<ToggleNotRecommendResponse, { status: boolean }>(
    `/articles/${params.articleId}/notrecommend`,
    { status: params.status },
  );
