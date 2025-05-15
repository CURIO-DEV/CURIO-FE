"use client";

import { IndexIcon } from "assets";
import Image from "next/image";
import { useState } from "react";

export default function Index() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleClick = () => {
    //TODO: 기사 연결
  };

  return (
    <div className="relative top-18">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="absolute top-[-34.5px]"
          style={{
            left: `${-35.5 + 74 * index + 42}px`,
            zIndex: activeIndex === index ? 100 : 10 - index,
          }}
          onClick={() => setActiveIndex(index)}
        >
          <IndexIcon
            className={`${
              activeIndex === index ? "text-primary-50" : "text-white"
            }`}
          />
          <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-gray-600">
            {index + 1}
          </span>
        </div>
      ))}
      <div className="relative z-10 flex h-168.75 flex-col rounded-lg border border-gray-300">
        <div className="bg-primary-50 h-7.5 rounded-t-lg" />
        <div className="flex flex-col items-center px-10">
          <Image
            className="mt-7.5 h-62.5 w-153 object-cover"
            src="/images/image.png"
            width={612}
            height={250}
            alt="image"
          />
          <p className="subtitle2 mt-8.75 font-medium">
            도널드 트럼프 미국 대통령이 2일(현지시간) 모든 국가에 상호관세를
            부과하겠다면서 통상 전쟁을 전 세계로 확대했다. 특히
            자유무역협정(FTA)을 맺고 있는 한국에 대해서도 26%(백악관이 공개한
            행정명령 부속서 기준)의 관세를 부과하기로 하면서 한국 경제에
            먹구름이 드리웠다.
          </p>
          <p
            className="text-surface-indigo absolute bottom-8.5 text-center underline"
            onClick={handleClick}
          >
            기사 보러가기
          </p>
        </div>
      </div>
    </div>
  );
}
