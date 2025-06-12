import { GetCurioGoResponse } from "app/_types/curio-go";
import { apiGet } from "../api";
import { END_POINTS } from "@/constants/api";

export const GetCurioGo = () => {
  return apiGet<GetCurioGoResponse[]>(END_POINTS.GET_CURIO_GO);
};
