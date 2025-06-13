import { apiPatch } from "@/apis/api";

export interface ToggleNotRecommendResponse {
  success: boolean;
  message: string;
  data: "비추천" | "비추천 없음";
}

export const toggleNotRecommend = (articleId: number) =>
  apiPatch<ToggleNotRecommendResponse>(`/articles/${articleId}/notrecommend`);
