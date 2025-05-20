"use client";

import { BookmarkIcon, HeartIcon, ShareIcon } from "assets";
import { useState } from "react";
import FolderModal from "./folder-modal";
import FolderUpsertModal from "app/(route)/my-page/_components/folder-upsert-modal";

export default function ActionBar() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);

  const handleLiked = () => {
    setLiked(!liked);
  };
  const handleBookmarked = () => {
    if (bookmarked === false) {
      setBookmarked(true);
      setIsFolderModalOpen(!isFolderModalOpen);
    } else {
      setBookmarked(false);
      //TODO : 토스트 이벤트 -북마크 취소
    }
  };
  return (
    <>
      <div className="fixed top-1/2 flex w-17.5 -translate-y-1/2 flex-col gap-4.5 rounded-3xl bg-gray-50 px-4.25 py-8.25">
        <HeartIcon
          onClick={handleLiked}
          className={`${liked === true ? "text-primary-600" : "text-transparent"}`}
        />
        <BookmarkIcon
          onClick={handleBookmarked}
          className={`${bookmarked === true ? "text-primary-600" : "text-transparent"}`}
        />
        <ShareIcon />
      </div>
      {isFolderModalOpen && (
        <FolderModal
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
