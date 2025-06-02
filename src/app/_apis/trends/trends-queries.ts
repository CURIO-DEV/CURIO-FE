import { queryOptions, UseQueryOptions } from "@tanstack/react-query";
import { GetTrendKeyword } from "./trends";

export const TRENDS_KEY = {
  TREND_KEYWORD: () => ["trend-keyword"],
} as const;

export const TRENDS_OPTION = {
  TREND_KEYWORD: () =>
    queryOptions({
      queryKey: TRENDS_KEY.TREND_KEYWORD(),
      queryFn: () => GetTrendKeyword(),
    }),
};
