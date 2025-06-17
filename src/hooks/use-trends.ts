import { TRENDS_OPTION } from "@/apis/trends/trends-queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetTrendKeyword = () => {
  return useSuspenseQuery({
    ...TRENDS_OPTION.TREND_KEYWORD(),
  });
};

export const useGetPopularArtiles = () => {
  return useSuspenseQuery({
    ...TRENDS_OPTION.POPULAR_ARTICLES(),
  });
};

export const useGetIntertestKeywords = () => {
  return useSuspenseQuery({
    ...TRENDS_OPTION.INTEREST_KEYWORDS(),
  });
};
