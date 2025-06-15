import { useQuery } from "@tanstack/react-query";
import {
  getArticleSummary,
  ArticleSummaryResponse,
} from "@/apis/articles/article";
import { SummaryType } from "types/summary-type";

export function useArticleSummary(articleId: number, type: SummaryType) {
  return useQuery<ArticleSummaryResponse>({
    queryKey: ["articleSummary", articleId, type],
    queryFn: () => getArticleSummary(articleId, type),
    enabled: !!articleId,
  });
}
