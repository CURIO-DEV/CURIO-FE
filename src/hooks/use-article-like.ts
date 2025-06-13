import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleArticleLike } from "@/apis/articles/like";

export const useToggleArticleLike = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: toggleArticleLike,
    // 필요한 경우 invalidateQueries(["article", articleId]) 등 캐시 갱신
    onSuccess: (_, articleId) => {
      qc.invalidateQueries({ queryKey: ["article", articleId, "headline"] });
    },
  });
};
