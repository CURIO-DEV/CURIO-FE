import { apiGet } from "../_apis/api";
import { SummaryType } from "types/summary-type";

export interface ArticleHeadlineResponse {
  title: string;
  content: string;
  imageUrl: string;
}

export const getArticleHeadline = async (articleId: string) => {
  return await apiGet<ArticleHeadlineResponse>(
    `/articles/${articleId}/headline`,
  );
};

export interface ArticleSummaryResponse {
  article_id: number;
  title: string;
  summary_type: SummaryType;
  summary: string;
}

export const getArticleSummary = async (
  articleId: string,
  type: "short" | "medium" | "long",
) => {
  return await apiGet<ArticleSummaryResponse, { type: string }>(
    `/articles/${articleId}/summary`,
    { type },
  );
};
