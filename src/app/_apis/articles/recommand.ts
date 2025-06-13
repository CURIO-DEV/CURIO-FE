import { apiPatch } from "@/apis/api";

export interface ToggleRecommendResponse {
  success: boolean;
  message: string;
  data: "추천" | "추천 없음";
}

export const toggleRecommend = (articleId: number) =>
  apiPatch<ToggleRecommendResponse>(`/articles/${articleId}/recommend`);
