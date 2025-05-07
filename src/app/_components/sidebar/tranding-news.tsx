import Image from "next/image";
import { dummyNews } from "@/mocks/dummyNews";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { BookmarkIcon, HeartIcon } from "assets";

/* 더미데이터 사용 */
/* TODO api 연결 후 수정하기*/

export default function TrandingNews() {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.DETAIL);
  };
  return (
    <div className="flex h-75.5 w-75 flex-col items-center gap-1.5 rounded-lg border border-gray-100 px-3.5 py-2">
      {/* 뉴스 목록 */}
      {dummyNews.map((news) => (
        <div
          key={news.id}
          className="flex w-68 cursor-pointer justify-center gap-3 rounded-md"
          onClick={() => handleClick()}
        >
          {/* TODO api 연결 후 수정 - 뉴스 썸네일*/}
          <Image
            src={news.thumbnail}
            alt="thumbnail"
            width={60}
            height={60}
            className="mt-1.75 rounded-lg"
          />
          <div className="mt-4.25 flex w-full flex-col">
            <p className="body1 w-48 truncate font-medium">{news.title}</p>
            <div className="caption1 pointer-events-none mt-0.75 flex items-center gap-0.75 font-medium text-gray-200">
              <HeartIcon
                width={15}
                height={15}
                style={{ stroke: "var(--gray-400)" }}
              />
              <span className="w-6">
                {news.likes > 99 ? "99+" : news.likes}
              </span>
              <BookmarkIcon
                className="h-4 w-4"
                style={{ stroke: "var(--gray-400)" }}
              />
              <span className="w-6">
                {news.clips > 99 ? "99+" : news.clips}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
