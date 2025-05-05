"use client";

import MyProfileCard from "./_components/my-profile-card";
import BookmarkFolderItem from "./_components/bookmark-folder-item";
import { mockFolders } from "@/mocks/book-mark-folders";

export default function MyPage() {
  const folders = mockFolders;
  return (
    <div className="mt-10 flex w-full gap-12">
      <div className="flex w-74 flex-col gap-8">
        <MyProfileCard />
        <div className="flex min-h-47.25 flex-col items-center rounded-lg border border-gray-200 px-3.75">
          <div className="subTitle2 h-15 w-66.5 border-b border-gray-200 pt-5 pl-1.75">
            북마크
          </div>
          {folders.length === 0 ? (
            <p className="body1 mt-10.25 font-medium text-gray-300">
              폴더가 없습니다
            </p>
          ) : (
            <div className="my-4 flex flex-col gap-3">
              {folders.map((folder) => (
                <BookmarkFolderItem key={folder.id} {...folder} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-primary-50 flex h-screen flex-1 items-center justify-center">
        <h1 className="logo-l font-carter font-bold text-gray-100">Curio</h1>
      </div>
    </div>
  );
}
