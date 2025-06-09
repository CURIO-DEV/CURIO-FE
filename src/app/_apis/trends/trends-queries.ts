import { queryOptions } from "@tanstack/react-query";
import {
  GetInterestKeywords,
  GetPopularArticles,
  GetTrendKeyword,
} from "./trends";

export const TRENDS_KEY = {
  TREND_KEYWORD: () => ["trend-keyword"],
  POPULAR_ARTICLES: () => ["popular-articles"],
  INTEREST_KEYWORDS: () => ["interest-keywords"],
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
  INTEREST_KEYWORDS: () =>
    queryOptions({
      queryKey: TRENDS_KEY.INTEREST_KEYWORDS(),
      queryFn: () => GetInterestKeywords(),
    }),
};
