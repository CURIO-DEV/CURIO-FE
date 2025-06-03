import { useQuery } from "@tanstack/react-query";
import { getArticleHeadline } from "@/apis/article";

export function useArticleHeadline(articleId: number) {
  return useQuery({
    queryKey: ["articleHeadline", articleId],
    queryFn: () => getArticleHeadline(articleId),
    enabled: !!articleId,
  });
}
