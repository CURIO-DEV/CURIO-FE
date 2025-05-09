"use client";

import { mockFolders } from "../../../_mocks/book-mark-folders";
import { useBookmarkStore } from "../../../_stores/use-bookmark-store";
import { FolderIcon } from "assets";
import { cn } from "@/utils/cn";
import { colorMap } from "@/constants/color";
import Modal from "@/components/modal";
import Button from "@/components/button";

export default function FolderModal() {
  const { isFolderModalOpen, closeFolderModal } = useBookmarkStore();
  const handleNew = () => {};
  const handleSave = () => {
    //TODO : 토스트 이벤트 - 저장되었습니다.
    closeFolderModal();
  };

  if (!isFolderModalOpen) return null;

  return (
    <Modal title="폴더 선택하기" onClick={closeFolderModal}>
      <div className="mt-15 grid max-h-55.5 grid-cols-4 gap-x-6 gap-y-2.25 overflow-y-auto">
        {mockFolders.map((folder) => (
          <div key={folder.id} className="hover:bg-primary-50 rounded-md">
            <FolderIcon className={cn(colorMap[folder.color], "h-18 w-18")} />
            <p className="caption1 line-clamp-2 h-9 w-16.5 text-center font-medium">
              {folder.name}
            </p>
          </div>
        ))}
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
