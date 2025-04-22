import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { dummyNews } from "@/mocks/dummyNews";
import { useState } from "react";

/* 더미데이터 */
/* TODO api 연결 후 수정하기*/

export default function SideNews() {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.DETAIL);
  };

  return (
    <div className="mt-6 flex h-75.5 w-75 flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-100 px-3.5 py-2">
      {/* 뉴스 목록 */}
      {dummyNews.map((news) => (
        <div
          key={news.id}
          className="flex h-16.75 w-68 cursor-pointer items-start justify-center gap-3 rounded-md px-1.5 transition hover:bg-gray-50"
          onClick={() => handleClick()}
        >
          {/* TODO api 연결 후 수정 - 뉴스 썸네일*/}
          <Image
            src={news.thumbnail}
            alt="thumbnail"
            width={60}
            height={60}
            className="mt-1.75 h-15 w-15 rounded-lg"
          />
          <div className="mt-4.25 flex w-full flex-col">
            <p className="body1 w-48 truncate font-medium">{news.id}</p>
            <div className="mt-0.75 flex items-center gap-2">
              <div className="caption1 pointer-events-none flex items-center gap-0.75 font-medium text-gray-200">
                {/* TODO svgr로 바꾸기*/}
                <Image
                  src="/assets/favorite.svg"
                  alt="heart"
                  width={15}
                  height={15}
                />
                <span className="w-6">
                  {news.likes > 99 ? "99+" : news.likes}
                </span>
                {/* TODO svgr로 바꾸기*/}
                <Image
                  src="/assets/bookMark.svg"
                  alt="bookmark"
                  width={15}
                  height={15}
                />
                <span className="w-6">
                  {news.clips > 99 ? "99+" : news.clips}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
