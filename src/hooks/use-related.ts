import { useQuery } from "@tanstack/react-query";
import { getRelatedArticles } from "@/apis/trends/trends";
import { GetPopularArticlesResponse } from "app/_types/trend";

type ExtraOpts = Partial<
  Parameters<typeof useQuery<GetPopularArticlesResponse[]>>[0]
>;

export function useRelatedArticles(
  articleId?: number,
  options: ExtraOpts = {},
) {
  return useQuery<GetPopularArticlesResponse[]>({
    queryKey: ["relatedArticles", articleId],
    queryFn: () => getRelatedArticles(articleId!),
    enabled: !!articleId,
    ...options,
  });
}
