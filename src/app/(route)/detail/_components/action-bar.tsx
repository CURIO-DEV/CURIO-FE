"use client";

import { BookmarkIcon, HeartIcon, ShareIcon } from "assets";
import { useState } from "react";
import FolderModal from "./folder-modal";
import FolderUpsertModal from "app/(route)/my-page/_components/folder-upsert-modal";
import { useUserStore } from "@/stores/use-user-store";
import { toast } from "sonner";

export default function ActionBar({ newsId }: { newsId: number }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);

  const handleLiked = () => {
    setLiked(!liked);
  };

  const isLogin = useUserStore((s) => s.isLogin);
  const handleBookmarked = () => {
    if (!isLogin) {
      toast.warning("로그인 후 이용 가능합니다.");
      return;
    }

    if (!bookmarked) {
      setBookmarked(true);
      setIsFolderModalOpen(true);
    } else {
      setBookmarked(false);
      // TODO: 북마크 취소 토스트
    }
  };
  return (
    <>
      <div className="fixed top-1/2 flex w-17.5 -translate-y-1/2 flex-col gap-4.5 rounded-3xl bg-gray-50 px-4.25 py-8.25">
        <HeartIcon
          onClick={handleLiked}
          className={`${liked === true ? "text-primary-600" : "text-transparent"} cursor-pointer`}
        />
        <BookmarkIcon
          onClick={handleBookmarked}
          className={`${bookmarked === true ? "text-primary-600" : "text-transparent"} cursor-pointer`}
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
