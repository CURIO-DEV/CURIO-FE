import { useMutation } from "@tanstack/react-query";
import { toggleRecommend } from "@/apis/articles/recommand";
import { toggleNotRecommend } from "@/apis/articles/not-recommand";

export const useToggleRecommend = () =>
  useMutation({ mutationFn: toggleRecommend });

export const useToggleNotRecommend = () =>
  useMutation({ mutationFn: toggleNotRecommend });
