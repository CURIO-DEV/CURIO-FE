import { GetTrendKeywordResponse } from "app/_types/trend";
import { apiGet } from "../api";
import { END_POINTS } from "@/constants/api";

export const GetTrendKeyword = () => {
  return apiGet<GetTrendKeywordResponse[]>(END_POINTS.GET_TREND_KEYWORD);
};
