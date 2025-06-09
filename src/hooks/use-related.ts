import { useQuery } from "@tanstack/react-query";
import { getRelatedArticles, RelatedArticleResponse } from "@/apis/related";

type ExtraOpts = Partial<
  Parameters<typeof useQuery<RelatedArticleResponse[]>>[0]
>;

export function useRelatedArticles(
  articleId?: number,
  options: ExtraOpts = {},
) {
  return useQuery<RelatedArticleResponse[]>({
    queryKey: ["relatedArticles", articleId],
    queryFn: () => getRelatedArticles(articleId!),
    enabled: !!articleId,
    ...options,
  });
}
