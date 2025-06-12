"use client";

import { useCallback, useState } from "react";
import MyProfileCard from "./_components/my-profile-card";
import BookmarkFolderList from "./_components/bookmark-folder-list";
import BookmarkFolderContent from "./_components/bookmark-folder-content";
import {
  useGetBookmarkArticles,
  useGetBookmarkFolders,
} from "@/hooks/use-bookmark";
import { DeleteBookmarkFolder } from "@/apis/bookmark/bookmark";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { BOOKMARK_KEY } from "@/apis/bookmark/bookmark-queries";
import FolderUpsertModal from "./_components/folder-upsert-modal";

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

  const { data: folders = [] } = useGetBookmarkFolders();

  const mappedFolders = folders.map((f) => ({
    id: f.bookmarkId,
    name: f.name,
    color: f.color,
    collaborators: f.members,
  }));

  const selectedFolder = mappedFolders.find((f) => f.id === selectedFolderId);
  const { data: articles = [] } = useGetBookmarkArticles(selectedFolderId);

  const queryClient = useQueryClient();

  const handleFolderDelete = async (id: number) => {
    try {
      const message = await DeleteBookmarkFolder(id);
      toast.success(message ?? "삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: BOOKMARK_KEY.FOLDER_LIST() });

      // 선택된 폴더 삭제된 경우 초기화
      if (selectedFolderId === id) setSelectedFolderId(null);
    } catch (error: any) {
      const fallbackMsg =
        error?.response?.data?.message ?? "삭제 중 오류가 발생했습니다.";
      toast.error(fallbackMsg);
      console.error(error);
    }
  };

  // 폴더 수정 모달 상태
  const [editFolder, setEditFolder] = useState<{
    id: number;
    name: string;
    color: string;
    collaborators: string[];
  } | null>(null);

  return (
    <div className="mt-10 flex w-full gap-12">
      <div className="flex w-74 flex-col gap-8">
        <MyProfileCard />
        <BookmarkFolderList
          folders={mappedFolders}
          selectedFolderId={selectedFolderId}
          onFolderClick={setSelectedFolderId}
          onFolderDelete={handleFolderDelete}
          onFolderEdit={(folder) => setEditFolder(folder)}
        />
      </div>

      {selectedFolder ? (
        <BookmarkFolderContent
          folder={selectedFolder}
          articles={articles}
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

      {editFolder && (
        <FolderUpsertModal
          mode="edit"
          bookmarkId={editFolder.id}
          defaultName={editFolder.name}
          defaultColor={editFolder.color}
          defaultMembers={editFolder.collaborators}
          onClick={() => setEditFolder(null)}
        />
      )}
    </div>
  );
}
