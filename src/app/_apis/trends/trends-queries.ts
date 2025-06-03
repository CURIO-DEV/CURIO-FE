import { queryOptions, UseQueryOptions } from "@tanstack/react-query";
import { GetPopularArticles, GetTrendKeyword } from "./trends";

export const TRENDS_KEY = {
  TREND_KEYWORD: () => ["trend-keyword"],
  POPULAR_ARTICLES: () => ["popular-articles"],
} as const;

export const TRENDS_OPTION = {
  TREND_KEYWORD: () =>
    queryOptions({
      queryKey: TRENDS_KEY.TREND_KEYWORD(),
      queryFn: () => GetTrendKeyword(),
    }),
  POPULAR_ARTICLES: () =>
    queryOptions({
      queryKey: TRENDS_KEY.POPULAR_ARTICLES(),
      queryFn: () => GetPopularArticles(),
    }),
};
