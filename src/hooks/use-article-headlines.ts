import { useQuery } from "@tanstack/react-query";
import { getArticleHeadline } from "@/apis/article"; // 실제 API 요청 함수

export function useArticleHeadline(articleId: string) {
  return useQuery({
    queryKey: ["articleHeadline", articleId],
    queryFn: () => getArticleHeadline(articleId),
    enabled: !!articleId,
  });
}
