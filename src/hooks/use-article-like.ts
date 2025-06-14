import { useQuery, useMutation } from "@tanstack/react-query";
import { getArticleLikeStatus, toggleArticleLike } from "@/apis/articles/like";

/* 현재 좋아요 여부 조회 */
export const useLikeStatus = (articleId: number, enabled: boolean) =>
  useQuery({
    queryKey: ["article", articleId, "like", "status"],
    queryFn: () => getArticleLikeStatus(articleId),
    enabled,
    select: (res) => res, // { articleId, status }
  });

/* 좋아요 토글 */
export const useToggleArticleLike = () =>
  useMutation({ mutationFn: toggleArticleLike });
