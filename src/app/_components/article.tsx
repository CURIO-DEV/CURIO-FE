interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  publishedAt: string;
}

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  const handleClick = () => {
    /* TODO 상세페이지 연결 */
  };
  return (
    <div className="flex h-25 w-225 cursor-pointer gap-3" onClick={handleClick}>
      {/* 썸네일 */}
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-25 w-25 rounded-l object-cover"
        />
      ) : (
        <div className="caption1 flex h-25 w-25 items-center justify-center rounded-l bg-gray-200 text-gray-500">
          No Image
        </div>
      )}

      {/* 텍스트 영역 */}
      <div className="flex w-full flex-col overflow-hidden px-1 py-1.25">
        <h2 className="subTitle truncate font-semibold">{article.title}</h2>
        <p className="text-muted-foreground mt-2.5 line-clamp-2 text-sm">
          {article.summary}
        </p>
      </div>
    </div>
  );
}
