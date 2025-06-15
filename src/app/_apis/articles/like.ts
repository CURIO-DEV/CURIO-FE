import { apiGet, apiPatch } from "@/apis/api";

export interface LikeStatus {
  articleId: number;
  status: boolean; // true: 좋아요 상태
}
export const getArticleLikeStatus = (articleId: number) =>
  apiGet<LikeStatus>(`/articles/${articleId}/like`);

export interface ToggleLikeResponse {
  message: string;
  status: boolean; // 토글 후 최종 상태
}
export const toggleArticleLike = (params: {
  articleId: number;
  status: boolean;
}) =>
  apiPatch<ToggleLikeResponse, { status: boolean }>(
    `/articles/${params.articleId}/like`,
    { status: params.status },
  );
