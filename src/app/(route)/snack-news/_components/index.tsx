"use client";

import { ROUTES } from "@/constants/routes";
import { useGetCurioGo } from "@/hooks/use-curio-go";
import { IndexIcon } from "assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Index() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { data } = useGetCurioGo();

  const handleClick = () => {
    router.push(`${ROUTES.DETAIL}/${data?.[activeIndex]?.articleId}`);
  };

  return (
    <div className="relative top-18">
      {data?.map((_, index) => (
        <div
          key={index}
          className="absolute top-[-34.5px]"
          style={{
            left: `${-35.5 + 74 * index + 45}px`,
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
          {data && data[activeIndex] && (
            <>
              <Image
                className="mt-7.5 h-62.5 w-153 object-cover"
                src={data[activeIndex].imageUrl ?? "/images/image.png"}
                width={612}
                height={250}
                alt="curio-go-image"
              />
              <p className="subtitle2 mt-8.75 font-medium">
                {data[activeIndex]?.summaryMedium}
              </p>
            </>
          )}
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
