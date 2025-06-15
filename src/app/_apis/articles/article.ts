import { apiGet } from "@/apis/api";
import { SummaryType } from "types/summary-type";

export interface ArticleHeadlineResponse {
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const getArticleHeadline = async (articleId: number) => {
  return await apiGet<ArticleHeadlineResponse>(
    `/articles/${articleId}/headline`,
  );
};

export interface ArticleSummaryResponse {
  articleId: number;
  title: string;
  summary_type: SummaryType;
  summary: string;
}

export const getArticleSummary = async (
  articleId: number,
  type: "short" | "medium" | "long",
) => {
  return await apiGet<ArticleSummaryResponse, { type: string }>(
    `/articles/${articleId}/summary`,
    { type },
  );
};
