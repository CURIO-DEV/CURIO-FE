"use client";

import { mockFolders } from "@/mocks/book-mark-folders";
import { FolderIcon } from "assets";
import { cn } from "@/utils/cn";
import { colorMap, ColorKey } from "@/constants/color";
import Modal from "@/components/modal";
import Button from "@/components/button";

interface FolderModalProps {
  onClick: () => void;
  onCreateNewFolder: () => void;
}

export default function FolderModal({
  onClick,
  onCreateNewFolder,
}: FolderModalProps) {
  const handleNew = () => {
    onCreateNewFolder();
  };

  const handleSave = () => {
    // TODO: 저장 토스트
    onClick();
  };

  return (
    <Modal title="폴더 선택하기" onClick={onClick}>
      <div className="mt-15 grid max-h-55.5 grid-cols-4 gap-x-6 gap-y-2.25 overflow-y-auto">
        {mockFolders.map((folder) => (
          <div key={folder.id} className="hover:bg-primary-50 rounded-md">
            <FolderIcon
              className={cn(
                colorMap[folder.color as ColorKey].text,
                "h-18 w-18",
              )}
            />
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
