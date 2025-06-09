import { apiGet } from "@/apis/api";

export interface RelatedArticleResponse {
  articleId: number;
  title: string;
  imageUrl: string;
  likeCount: number;
  saveCount: number;
}

export const getRelatedArticles = (articleId: number) =>
  apiGet<RelatedArticleResponse[]>(`/articles/${articleId}/related`);
