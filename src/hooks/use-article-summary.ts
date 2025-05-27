import { useQuery } from "@tanstack/react-query";
import { getArticleSummary, ArticleSummaryResponse } from "@/apis/article";

export function useArticleSummary(
  articleId: string,
  type: "short" | "medium" | "long",
) {
  return useQuery<ArticleSummaryResponse>({
    queryKey: ["articleSummary", articleId, type],
    queryFn: () => getArticleSummary(articleId, type),
    enabled: !!articleId,
  });
}
