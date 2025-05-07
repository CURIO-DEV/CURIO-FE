import Button from "@/components/button";
import ArticleCard from "@/components/article";
import { BookmarkIcon } from "assets";
import { useEffect, useState } from "react";
import { articles } from "@/mocks/article-array";

interface BookmarkFolderContentProps {
  folder: {
    id: number;
    name: string;
    collaborators: string[];
    color: string;
  };
}

const defaultSummary =
  "오른쪽 요약하기 버튼을 통해 모아놓은 기사 요약을 확인해보세요.";

export default function BookmarkFolderContent({
  folder,
}: BookmarkFolderContentProps) {
  const [summary, setSummary] = useState(defaultSummary);
  const [isSummarized, setIsSummarized] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    setSummary(defaultSummary);
    setIsSummarized(false);
    setBookmarkedArticles(new Set());
  }, [folder.id]);

  const handleSummarize = () => {
    const result = "요약된 기사 내용이 여기에 표시됩니다...";
    setSummary(result);
    setIsSummarized(true);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <span className="subtitle1 truncate font-semibold">{folder.name}</span>
        <Button onClick={handleSummarize} className="subtitle2 font-semibold">
          AI 요약
        </Button>
      </div>
      <section className="mt-3 h-35.75 overflow-y-auto rounded-lg border border-gray-200 px-6 py-5">
        <p
          className={`subtitle2 font-semibold ${isSummarized ? "text-black" : "text-gray-300"}`}
        >
          {summary}
        </p>
      </section>
      <div className="mt-10">
        {articles.map((article) => {
          const isBookmarked = bookmarkedArticles.has(article.id);
          return (
            <div
              key={article.id}
              className="relative flex h-33 items-center border-t border-gray-100"
            >
              <button
                onClick={() => toggleBookmark(article.id)}
                className="absolute -top-1.5 right-5"
              >
                <BookmarkIcon
                  className="h-6 w-6"
                  style={{
                    fill: isBookmarked ? "white" : "var(--color-gray-400)",
                    stroke: "var(--color-gray-400)",
                  }}
                />
              </button>
              <ArticleCard article={article} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
