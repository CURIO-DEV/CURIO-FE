import { apiPatch } from "@/apis/api";

export interface ToggleLikeResponse {
  success: boolean;
  message: string;
  data: "좋아요" | "좋아요 없음";
}

export const toggleArticleLike = (articleId: number) =>
  apiPatch<ToggleLikeResponse>(`/articles/${articleId}/like`);
