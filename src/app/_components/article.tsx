"use client";

import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

interface Article {
  articleId: number;
  title: string;
  content: string;
  imageUrl?: string;
}

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${ROUTES.DETAIL}/${article.articleId}`);
  };

  return (
    <div className="flex h-25 w-225 cursor-pointer gap-3" onClick={handleClick}>
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-25 rounded-lg object-cover"
        />
      ) : (
        <div className="caption1 flex h-25 w-25 items-center justify-center rounded-l bg-gray-200 text-gray-500">
          No Image
        </div>
      )}
      <div className="flex w-full flex-col overflow-hidden px-1 py-1.25">
        <h2 className="subTitle truncate font-semibold">{article.title}</h2>
        <p className="text-muted-foreground mt-2.5 line-clamp-2 text-sm">
          {article.content}
        </p>
      </div>
    </div>
  );
}
