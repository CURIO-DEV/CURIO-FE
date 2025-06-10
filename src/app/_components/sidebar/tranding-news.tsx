import Image from "next/image";
import { dummyNews } from "@/mocks/dummyNews";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { BookmarkIcon, HeartIcon } from "assets";
import { useGetPopularArtiles } from "@/hooks/use-trends";
import { useRelatedArticles } from "@/hooks/use-related";

export interface TrandingNewsProps {
  isDetailPage?: boolean;
}
export default function TrendingNews({
  isDetailPage = false,
}: TrandingNewsProps) {
  const router = useRouter();

  const pathname = usePathname();
  const rawId = pathname.replace(/^\/detail\//, "").split("/")[0];
  const articleId =
    rawId && /^\d+$/.test(rawId) ? parseInt(rawId, 10) : undefined;

  const { data: related } = useRelatedArticles(articleId, {
    enabled: isDetailPage && articleId !== undefined,
  });

  const { data: popular } = useGetPopularArtiles();

  const list = isDetailPage ? (related ?? []) : (popular ?? []);

  const handleClick = (articleId: number) => {
    router.push(`${ROUTES.DETAIL}/${articleId}`);
  };

  return (
    <div className="flex h-75.5 w-75 flex-col items-center gap-1.5 rounded-lg border border-gray-100 px-3.5 py-2">
      {list?.map((news) => (
        <div
          key={news.articleId}
          className="flex w-68 cursor-pointer justify-center gap-3 rounded-md"
          onClick={() => handleClick(news.articleId)}
        >
          <Image
            src={news.imageUrl}
            alt="thumbnail"
            width={60}
            height={60}
            className="mt-1.75 rounded-lg"
          />
          <div className="mt-4.25 flex w-full flex-col">
            <p className="body1 w-48 truncate font-medium">{news.title}</p>
            <div className="caption1 pointer-events-none mt-0.75 flex items-center gap-0.75 font-medium text-gray-200">
              <HeartIcon
                width={15}
                height={15}
                style={{ stroke: "var(--gray-400)" }}
              />
              <span className="w-6">
                {news.likeCount > 99 ? "99+" : news.likeCount}
              </span>
              <BookmarkIcon
                className="h-4 w-4"
                style={{ stroke: "var(--gray-400)" }}
              />
              <span className="w-6">
                {news.saveCount > 99 ? "99+" : news.saveCount}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
