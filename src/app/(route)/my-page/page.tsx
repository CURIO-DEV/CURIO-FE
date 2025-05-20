"use client";

import { useCallback, useState } from "react";
import MyProfileCard from "./_components/my-profile-card";
import BookmarkFolderList from "./_components/bookmark-folder-list";
import BookmarkFolderContent from "./_components/bookmark-folder-content";
import { mockFolders } from "@/mocks/book-mark-folders";

export default function MyPage() {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(
    new Set(),
  );

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

  const setInitialBookmarks = useCallback((ids: string[]) => {
    setBookmarkedArticles(new Set(ids));
  }, []);

  const folders = mockFolders;
  const selectedFolder = folders.find((f) => f.id === selectedFolderId);

  return (
    <div className="mt-10 flex w-full gap-12">
      <div className="flex w-74 flex-col gap-8">
        <MyProfileCard />
        <BookmarkFolderList
          folders={folders}
          selectedFolderId={selectedFolderId}
          onFolderClick={setSelectedFolderId}
        />
      </div>

      {selectedFolder ? (
        <BookmarkFolderContent
          folder={selectedFolder}
          bookmarkedArticles={bookmarkedArticles}
          toggleBookmark={toggleBookmark}
          setInitialBookmarks={setInitialBookmarks}
        />
      ) : (
        <div className="bg-primary-50 flex min-h-full flex-1 justify-center">
          <h1 className="logo-l font-carter mt-91 font-bold text-gray-100">
            Curio
          </h1>
        </div>
      )}
    </div>
  );
}
