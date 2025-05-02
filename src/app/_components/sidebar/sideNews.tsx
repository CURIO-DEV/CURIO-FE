import { BookmarkIcon, FavoriteIcon } from "assets";
import Image from "next/image";

/* 더미데이터 */
/* TODO api 연결 후 수정하기*/
const newsList = [
  {
    id: 1,
    title: "윤 대통령, 해외 순방 마치고 귀국",
    thumbnail: "/images/newThums.png",
    likes: 124,
    clips: 33,
  },
  {
    id: 2,
    title: "여야, 국회 대치 장기화...해법은?",
    thumbnail: "/images/newThums.png",
    likes: 88,
    clips: 56,
  },
  {
    id: 3,
    title: "서울·수도권 미세먼지 ‘나쁨’ 예보",
    thumbnail: "/images/newThums.png",
    likes: 203,
    clips: 94,
  },
  {
    id: 4,
    title: "기시다, 한일정상회담 언급",
    thumbnail: "/images/newThums.png",
    likes: 95,
    clips: 83,
  },
];

export default function SideNews() {
  const handleClick = (title: string) => {
    /* TODO 기사 상세세페이지 제작 완료 후 연결하기*/
    alert(`'${title}' 뉴스 상세 페이지로 이동할 예정입니다.`);
  };

  return (
    <div className="mt-6 flex h-75.5 w-75 flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-100 px-3.5 py-2">
      {/* 뉴스 목록 */}
      {newsList.map((news) => (
        <div
          key={news.id}
          className="flex h-16.75 w-68 cursor-pointer items-start justify-center gap-3 rounded-md px-1.5 transition hover:bg-gray-50"
          onClick={() => handleClick(news.title)}
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
            <p className="body1 w-48 truncate font-medium">{news.title}</p>
            <div className="mt-0.75 flex items-center gap-2">
              <div className="caption1 pointer-events-none flex items-center gap-0.75 font-medium text-gray-200">
                <FavoriteIcon />
                <span className="w-6">
                  {news.likes > 99 ? "99+" : news.likes}
                </span>
                <BookmarkIcon />
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
