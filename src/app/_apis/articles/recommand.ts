import { apiGet, apiPatch } from "@/apis/api";

export interface RecommendStatus {
  articleId: number;
  status: boolean; // true: 추천중, false: 추천 아님
}
export const getRecommendStatus = (articleId: number) =>
  apiGet<RecommendStatus>(`/articles/${articleId}/recommend`);

export interface ToggleRecommendResponse {
  message: string;
  status: boolean;
}
export const toggleRecommend = (params: {
  articleId: number;
  status: boolean;
}) =>
  apiPatch<ToggleRecommendResponse, { status: boolean }>(
    `/articles/${params.articleId}/recommend`,
    { status: params.status },
  );
