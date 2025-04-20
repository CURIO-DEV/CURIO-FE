import { useState } from "react";
import Image from "next/image";

/* 더미데이터 */
/* TODO api나 prop활용 수정하기*/
const trends = [
  "윤석열",
  "윤,'불소추 특권'",
  "경북 경주 주택에 불...재산피해",
  "조기 대선 준비 본격화",
  "독일 金 1200t이 왜 뉴욕에?",
  "경제 대혼란에 미국인",
  "파면불복 집회 '헌금''자유통일당'",
  "홍준표, 조기 대선 출마 시사",
];

export default function TrendRanking() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (keyword: string) => {
    /* TODO 검색페이지 제작 완료 후 연결하기*/
    alert(keyword + "\n검색페이지 구현 전입니다");
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  /* TODO: API 연결 후 대체 */
  const dummyTimestamp = "2024.04.20 17:32";

  return (
    <div className="mt-6 flex w-75 flex-col border-y border-gray-200">
      <div className="flex items-center justify-between px-5 py-2.5">
        <div
          className="group body1 flex w-58 items-center gap-3 font-medium text-black"
          onClick={() => handleClick(trends[0])}
        >
          <span>1</span>
          <span className="cursor-pointer group-hover:underline">
            {trends[0]}
          </span>
        </div>
        {/* TODO svgr로 바꾸기*/}
        <Image
          onClick={toggleDropdown}
          className="cursor-pointer"
          src={isOpen ? "/assets/arrowUp.svg" : "/assets/arrowDown.svg"}
          alt="toggle"
          width={24}
          height={24}
        />
      </div>

      <div
        className={`overflow-hidden px-5 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {trends.slice(1).map((trend, index) => (
          <div
            key={trend}
            className="mb-3 flex items-center justify-between"
            onClick={() => handleClick(trend)}
          >
            <div className="group body1 flex w-58 cursor-pointer items-center gap-3 font-medium text-black">
              <span>{index + 2}</span>
              <span className="group-hover:underline">{trend}</span>
            </div>
          </div>
        ))}
        <div className="mb-2.5 flex h-4.5 justify-end">
          <span className="caption1 font-medium text-gray-300">
            {dummyTimestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
