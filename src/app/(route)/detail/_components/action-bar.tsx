"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BookmarkIcon, HeartIcon, ShareIcon } from "assets";

import FolderModal from "./folder-modal";
import FolderUpsertModal from "app/(route)/my-page/_components/folder-upsert-modal";

import { useUserStore } from "@/stores/use-user-store";
import { useLikeStatus, useToggleArticleLike } from "@/hooks/use-article-like";

interface ActionBarProps {
  newsId: number;
}

export default function ActionBar({ newsId }: ActionBarProps) {
  const isLogin = useUserStore((s) => s.isLogin);

  const { data: likeStatus } = useLikeStatus(newsId, !!isLogin);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(!!likeStatus?.status);
  }, [likeStatus, newsId]);

  const [bookmarked, setBookmarked] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);

  const toggleLike = useToggleArticleLike();

  const guard = () => {
    if (!isLogin) {
      toast.warning("로그인 후 이용 가능합니다.");
      return false;
    }
    return true;
  };

  const handleLiked = () => {
    if (!guard()) return;
    const next = !liked;
    toggleLike.mutate(
      { articleId: newsId, status: next },
      {
        onSuccess: (res) => {
          setLiked(res.status);
          toast.success(res.message);
        },
        onError: () => toast.error("잠시 후 다시 시도해 주세요."),
      },
    );
  };

  const handleBookmarked = () => {
    if (!guard()) return;
    if (!bookmarked) {
      setBookmarked(true);
      setIsFolderModalOpen(true);
    } else {
      setBookmarked(false);
    }
  };

  return (
    <>
      <div className="fixed top-1/2 flex w-17.5 -translate-y-1/2 flex-col gap-4.5 rounded-3xl bg-gray-50 px-4.25 py-8.25">
        <HeartIcon
          onClick={handleLiked}
          className={`cursor-pointer ${
            liked ? "text-primary-600" : "text-transparent"
          }`}
        />
        <BookmarkIcon
          onClick={handleBookmarked}
          className={`cursor-pointer ${
            bookmarked ? "text-primary-600" : "text-transparent"
          }`}
        />
        <ShareIcon />
      </div>

      {isFolderModalOpen && (
        <FolderModal
          newsId={newsId}
          onClick={() => setIsFolderModalOpen(false)}
          onCreateNewFolder={() => {
            setIsFolderModalOpen(false);
            setIsUpsertModalOpen(true);
          }}
        />
      )}

      {isUpsertModalOpen && (
        <FolderUpsertModal
          onClick={() => {
            setIsUpsertModalOpen(false);
            setIsFolderModalOpen(true);
          }}
          mode="create"
        />
      )}
    </>
  );
}
