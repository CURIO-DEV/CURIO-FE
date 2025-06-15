"use client";

import { useEffect, useState } from "react";
import Button from "@/components/button";
import ArticleCard from "@/components/article";
import { BookmarkIcon } from "assets";
import { articles } from "@/mocks/article-array";
import {
  GetBookmarkSummary,
  RemoveBookmarkArticle,
} from "@/apis/bookmark/bookmark";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface BookmarkFolderContentProps {
  folder: {
    id: number;
    name: string;
    collaborators: string[];
    color: string;
  };
  articles: {
    articleId: number;
    title: string;
    content: string;
    imageUrl: string;
  }[];
  bookmarkedArticles: Set<string>;
  toggleBookmark: (id: string) => void;
  setInitialBookmarks: (ids: string[]) => void;
}

const defaultSummary =
  "오른쪽 요약하기 버튼을 통해 모아놓은 기사 요약을 확인해보세요.";

export default function BookmarkFolderContent({
  folder,
  articles,
  bookmarkedArticles,
  toggleBookmark,
  setInitialBookmarks,
}: BookmarkFolderContentProps) {
  const [summary, setSummary] = useState(defaultSummary);
  const [isSummarized, setIsSummarized] = useState(false);

  useEffect(() => {
    // 초기 북마크 ID 설정 (임시로 모든 articleId를 string으로 변환)
    const bookmarkedIdsForFolder = articles.map((a) => String(a.articleId));
    setInitialBookmarks(bookmarkedIdsForFolder);
    setSummary(defaultSummary);
    setIsSummarized(false);
  }, [folder.id, articles, setInitialBookmarks]);

  const handleSummarize = async () => {
    try {
      const res = await GetBookmarkSummary(folder.id);
      setSummary(res.summary);
      setIsSummarized(true);
    } catch (error) {
      console.error(error);
      setSummary("요약에 실패했습니다.");
      setIsSummarized(false);
    }
  };

  const queryClient = useQueryClient();

  const handleToggleBookmark = async (id: string, isBookmarked: boolean) => {
    toggleBookmark(id);
    if (isBookmarked) {
      try {
        const res = await RemoveBookmarkArticle(folder.id, Number(id));
        toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ["bookmark-articles", folder.id],
        });
      } catch (error) {
        toast.error("북마크 제거에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <p className="subtitle1 truncate font-semibold">{folder.name}</p>
        <Button onClick={handleSummarize} className="subtitle2 font-semibold">
          AI 요약
        </Button>
      </div>

      <section className="mt-3 h-35.75 overflow-y-auto rounded-lg border border-gray-200 px-6 py-5">
        <p
          className={`subtitle2 font-semibold ${
            isSummarized ? "text-black" : "text-gray-300"
          }`}
        >
          {summary}
        </p>
      </section>

      <div className="mt-10">
        {articles.map((article) => {
          const idStr = String(article.articleId);
          const isBookmarked = bookmarkedArticles.has(idStr);

          return (
            <div
              key={article.articleId}
              className="relative flex h-33 items-center border-t border-gray-100"
            >
              <button
                onClick={() => handleToggleBookmark(idStr, isBookmarked)}
                className="absolute -top-1.5 right-5"
              >
                <BookmarkIcon
                  className="h-6 w-6"
                  style={{
                    fill: isBookmarked ? "var(--color-gray-400)" : "white",
                    stroke: "var(--color-gray-400)",
                  }}
                />
              </button>
              <ArticleCard
                article={{
                  articleId: article.articleId,
                  title: article.title,
                  content: article.content,
                  imageUrl: article.imageUrl,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
