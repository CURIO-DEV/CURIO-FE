"use client";

import { BookmarkIcon, HeartIcon, ShareIcon } from "assets";
import { useState } from "react";
import { useBookmarkStore } from "../../../_stores/use-bookmark-store";

export default function ActionBar() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { openFolderModal } = useBookmarkStore();

  const handleLiked = () => {
    setLiked(!liked);
  };
  const handleBookmarked = () => {
    setBookmarked(!bookmarked);
  };
  return (
    <div className="fixed top-1/2 flex w-17.5 -translate-y-1/2 flex-col gap-4.5 rounded-3xl bg-gray-50 px-4.25 py-8.25">
      <HeartIcon
        onClick={handleLiked}
        className={`${liked === true ? "text-primary-600" : "text-transparent"}`}
      />
      <BookmarkIcon
        onClick={() => {
          handleBookmarked();
          {
            //TODO - API 연결 시 - 북마크 취소 토스트
            bookmarked ? null : openFolderModal();
          }
        }}
        className={`${bookmarked === true ? "text-primary-600" : "text-transparent"}`}
      />
      <ShareIcon />
    </div>
  );
}
