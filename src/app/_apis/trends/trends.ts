import {
  GetInterestKeywordResponse,
  GetPopularArticlesResponse,
  GetTrendKeywordResponse,
} from "app/_types/trend";
import { apiGet } from "../api";
import { END_POINTS } from "@/constants/api";

export const GetTrendKeyword = () => {
  return apiGet<GetTrendKeywordResponse[]>(END_POINTS.GET_TREND_KEYWORD);
};

export const GetPopularArticles = () => {
  return apiGet<GetPopularArticlesResponse[]>(END_POINTS.GET_POPULAR_ARTICLES);
};

export const GetInterestKeywords = () => {
  return apiGet<GetInterestKeywordResponse[]>(END_POINTS.GET_INTEREST_KEYWORDS);
};

export const getRelatedArticles = (articleId: number) =>
  apiGet<GetPopularArticlesResponse[]>(`/articles/${articleId}/related`);
