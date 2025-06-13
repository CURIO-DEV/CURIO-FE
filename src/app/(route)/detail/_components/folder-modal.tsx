"use client";

import { FolderIcon } from "assets";
import { cn } from "@/utils/cn";
import { colorMap, ColorKey } from "@/constants/color";
import Modal from "@/components/modal";
import Button from "@/components/button";
import { useGetBookmarkFolders } from "@/hooks/use-bookmark";
import { useState } from "react";
import { toast } from "sonner";
import { AddBookmarkArticle } from "@/apis/bookmark/bookmark";

interface FolderModalProps {
  onClick: () => void;
  onCreateNewFolder: () => void;
  newsId: number;
}

export default function FolderModal({
  onClick,
  onCreateNewFolder,
  newsId,
}: FolderModalProps) {
  const { data: folders = [] } = useGetBookmarkFolders();
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const handleNew = () => {
    onCreateNewFolder();
  };

  const handleSave = async () => {
    if (selectedFolderId === null) {
      toast.warning("폴더를 선택해주세요.");
      return;
    }

    try {
      const response = await AddBookmarkArticle(selectedFolderId, newsId);
      toast.success(response.message);
      onClick();
    } catch (error) {
      const message = (error as any)?.response?.data?.message;
      toast.error(message ?? "오류가 발생했습니다.");
    }
  };

  return (
    <Modal title="폴더 선택하기" onClick={onClick}>
      <div className="mt-15 grid max-h-55.5 grid-cols-4 gap-x-6 gap-y-2.25 overflow-y-auto">
        {folders.length === 0 ? (
          <div className="caption1 col-span-4 text-center text-gray-400">
            폴더가 없습니다. 폴더를 생성해주세요.
          </div>
        ) : (
          folders.map((folder) => (
            <div
              key={folder.bookmarkId}
              className={cn(
                "hover:bg-primary-50 cursor-pointer rounded-md p-2",
                selectedFolderId === folder.bookmarkId && "bg-primary-100",
              )}
              onClick={() => setSelectedFolderId(folder.bookmarkId)}
            >
              <FolderIcon
                className={cn(
                  colorMap[folder.color as ColorKey].text,
                  "mx-auto h-18 w-18",
                )}
              />
              <p className="caption1 line-clamp-2 h-9 w-16.5 text-center font-medium">
                {folder.name}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="body1 mt-15 flex justify-center gap-4 font-semibold">
        <Button
          className="text-primary-600 bg-primary-50 hover:bg-primary-100"
          onClick={handleNew}
        >
          새 폴더
        </Button>
        <Button onClick={handleSave}>저장하기</Button>
      </div>
    </Modal>
  );
}
