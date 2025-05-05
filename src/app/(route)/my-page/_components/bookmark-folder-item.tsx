import { FolderIcon } from "assets";
import { KebabIcon } from "assets";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import { colorMap } from "@/constants/color";

interface FolderItemProps {
  name: string;
  collaborators: string[];
  color: string;
}

export default function BookmarkFolderItem({
  name,
  collaborators,
  color,
}: FolderItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log(colorMap[color]);

  return (
    <div className="hover:bg-primary-50 flex h-24 w-66.5 justify-center gap-3 rounded-lg p-3">
      <FolderIcon className={cn(colorMap[color], "h-18 w-18")} />

      <div className="flex w-39.5 flex-col justify-center gap-0.5">
        <div className="flex justify-between">
          <span className="body1 truncate font-semibold">{name}</span>
          <div className="relative" ref={menuRef}>
            <button onClick={() => setIsMenuOpen((prev) => !prev)}>
              <KebabIcon className="h-6 w-6" />
            </button>

            {isMenuOpen && (
              <div className="caption1 absolute -top-6 left-11 z-10 flex h-17.75 w-25.25 flex-col items-center rounded-lg border-[0.5px] border-gray-400 bg-white font-medium">
                <button className="h-full w-full rounded-t-lg hover:bg-gray-50">
                  수정하기
                </button>
                <hr className="w-17.25 border-gray-400" />
                <button className="h-full w-full rounded-b-lg hover:bg-gray-50">
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
        <span className="caption1 truncate">{collaborators.join(", ")}</span>
      </div>
    </div>
  );
}
