import { useQuery, useMutation } from "@tanstack/react-query";
import { getArticleLikeStatus, toggleArticleLike } from "@/apis/articles/like";

export const useLikeStatus = (articleId: number, enabled: boolean) =>
  useQuery({
    queryKey: ["article", articleId, "like", "status"],
    queryFn: () => getArticleLikeStatus(articleId),
    enabled,
    select: (res) => res,
  });

export const useToggleArticleLike = () =>
  useMutation({ mutationFn: toggleArticleLike });
