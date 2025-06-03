import { TRENDS_OPTION } from "@/apis/trends/trends-queries";
import { useQuery } from "@tanstack/react-query";

export const useGetTrendKeyword = () => {
  return useQuery(TRENDS_OPTION.TREND_KEYWORD());
};

export const useGetPopularArtiles = () => {
  return useQuery(TRENDS_OPTION.POPULAR_ARTICLES());
};
