import { useQuery, useMutation } from "@tanstack/react-query";
import { getRecommendStatus, toggleRecommend } from "@/apis/articles/recommand";

import {
  getNotRecommendStatus,
  toggleNotRecommend,
} from "@/apis/articles/not-recommand";

export const useRecommendStatus = (id: number, enabled: boolean) =>
  useQuery({
    queryKey: ["article", id, "recommend", "status"],
    queryFn: () => getRecommendStatus(id),
    enabled,
    select: (res) => res, // res.status
  });

export const useNotRecommendStatus = (id: number, enabled: boolean) =>
  useQuery({
    queryKey: ["article", id, "notrecommend", "status"],
    queryFn: () => getNotRecommendStatus(id),
    enabled,
    select: (res) => res,
  });

export const useToggleRecommend = () =>
  useMutation({
    mutationFn: toggleRecommend,
  });

export const useToggleNotRecommend = () =>
  useMutation({
    mutationFn: toggleNotRecommend,
  });
