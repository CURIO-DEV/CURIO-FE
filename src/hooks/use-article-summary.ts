import { useQuery } from "@tanstack/react-query";
import { getArticleSummary, ArticleSummaryResponse } from "@/apis/article";
import { SummaryType } from "types/summary-type";

export function useArticleSummary(articleId: string, type: SummaryType) {
  return useQuery<ArticleSummaryResponse>({
    queryKey: ["articleSummary", articleId, type],
    queryFn: () => getArticleSummary(articleId, type),
    enabled: !!articleId,
  });
}
